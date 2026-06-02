class DBInjector {
  constructor(dbData) {
    this.dbData = dbData;
  }
  element(element) {
    element.prepend(`\n<script>window.__CMS_DATA__ = ${JSON.stringify(this.dbData)};</script>\n`, { html: true });
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Handle API Save Endpoint
    if (url.pathname === '/api/save' && request.method === 'POST') {
      try {
        const payload = await request.json();
        if (!payload || typeof payload !== 'object') {
          return new Response(JSON.stringify({ error: 'Invalid payload' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        if (env.AESTHETE_DB) {
          let currentDb = {};
          try {
            const stored = await env.AESTHETE_DB.get('db_state');
            currentDb = stored ? JSON.parse(stored) : {};
          } catch (e) {
            console.error("KV read error:", e);
          }

          const updatedDb = {
            profile: payload.profile || currentDb.profile,
            essays: Array.isArray(payload.essays) ? payload.essays : currentDb.essays || [],
            artworks: Array.isArray(payload.artworks) ? payload.artworks : currentDb.artworks || [],
            deleted_essays: Array.isArray(payload.deleted_essays) ? payload.deleted_essays : currentDb.deleted_essays || [],
            deleted_artworks: Array.isArray(payload.deleted_artworks) ? payload.deleted_artworks : currentDb.deleted_artworks || [],
            messages: Array.isArray(payload.messages) ? payload.messages : currentDb.messages || [],
            deleted_messages: Array.isArray(payload.deleted_messages) ? payload.deleted_messages : currentDb.deleted_messages || []
          };

          await env.AESTHETE_DB.put('db_state', JSON.stringify(updatedDb));
          return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          return new Response(JSON.stringify({ error: 'AESTHETE_DB KV namespace not bound' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } catch (err) {
        console.error("Error saving database payload:", err);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // 2. Serve Static Assets
    // In Workers + Assets, env.ASSETS.fetch is used to fetch the static files
    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get('content-type') || '';

    // If it's an HTML page, inject the database state using HTMLRewriter
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
};
