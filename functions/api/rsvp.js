export async function onRequest(context) {
  const { request, env } = context;
  const { pathname } = new URL(request.url);
  
  // Handle POST /api/rsvp
  if (request.method === 'POST' && pathname === '/api/rsvp') {
    return handlePostRsvp(request, env);
  }
  
  // Handle GET /api/rsvp (optional: for admin view)
  if (request.method === 'GET' && pathname === '/api/rsvp') {
    return handleGetRsvps(request, env);
  }
  
  return new Response('Not found', { status: 404 });
}

async function handlePostRsvp(request, env) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.foodintolerance) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Extract bus data
    const busLocation = data.bus?.location || null;
    const busSchedule = data.bus?.schedule || null;
    
    // Insert into D1
    const result = await env.DB.prepare(
      `INSERT INTO guests (full_name, food_intolerance, bus_location, bus_schedule)
       VALUES (?, ?, ?, ?)`
    ).bind(
      data.name,
      data.foodintolerance,
      busLocation,
      busSchedule
    ).run();
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        id: result.meta.last_row_id,
        message: 'RSVP confirmed successfully!' 
      }),
      { 
        status: 201, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        } 
      }
    );
    
  } catch (error) {
    console.error('Database error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function handleGetRsvps(request, env) {
  try {
    const { results } = await env.DB.prepare(
      'SELECT * FROM guests ORDER BY created_at DESC'
    ).all();
    
    return new Response(
      JSON.stringify(results),
      { 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error: ' + error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
