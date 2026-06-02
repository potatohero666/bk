class DBInjector {
  constructor(dbData) {
    this.dbData = dbData;
  }
  element(element) {
    element.prepend(`\n<script>window.__CMS_DATA__ = ${JSON.stringify(this.dbData)};</script>\n`, { html: true });
  }
}

export async function onRequest(context) {
  const { request, next, env } = context;
  
  const response = await next();
  const contentType = response.headers.get('content-type') || '';
  
  if (contentType.includes('text/html')) {
    let dbData = null;
    if (env.AESTHETE_DB) {
      try {
        const stored = await env.AESTHETE_DB.get('db_state');
        dbData = stored ? JSON.parse(stored) : null;
      } catch (e) {
        console.error("Failed to read from AESTHETE_DB KV namespace:", e);
      }
    }
    
    if (!dbData) {
      // Fallback default seed data
      dbData = {
        profile: {
          name: "Aesthete",
          bio: "Amidst the silence of the gallery, I find the echoes of distant worlds. Curator of light, shadow, and the spaces between words.",
          avatar: "https://lh3.googleusercontent.com/aida/ADBb0ugNErUfyEWDvSJHYEhHX61AaSnrzwNj0ker8nxV8AVCLFjSTf1mnCB-j4AcsRw8KzepabZrkQVk0xTI0EX30TQ4wBbsoX-KeHN77rDw8_-CqO6cNeWzfR3rK-h_4mbwCtl39S_cxX5TG_JfdKE5oZrL2ZsdyZLohbIVVTvwOBFbbTWSKzKJJrJLp9otkby3HCqiI8Gz33V_uyBeZj-IhiwCbOr1K4waprgjlWVpK1LGkZOPC9FK__pe5w",
          password: "admin"
        },
        essays: [],
        artworks: [],
        deleted_essays: [],
        deleted_artworks: [],
        messages: [],
        deleted_messages: []
      };
    }
    
    return new HTMLRewriter()
      .on('head', new DBInjector(dbData))
      .transform(response);
  }
  
  return response;
}
