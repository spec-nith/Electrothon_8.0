// Contact form is now handled by EmailJS client-side
// No backend processing needed

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Validate inputs
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // EmailJS handles email sending on the client-side
    // This endpoint is kept for future use or as a fallback
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form submission received. Please use the client-side EmailJS integration.' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process request', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
