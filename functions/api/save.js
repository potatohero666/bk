export async function onRequestPost(context) {
  const { request, env } = context;
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
