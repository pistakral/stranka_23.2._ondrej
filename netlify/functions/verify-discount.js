const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { code } = body;

  if (!code || typeof code !== 'string' || code.length > 50) {
    return {
      statusCode: 200,
      body: JSON.stringify({ valid: false, message: 'Neplatný kód' }),
    };
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );

  const { data, error } = await supabase
    .from('discount_codes')
    .select('discount_percent, is_active, max_uses, current_uses, valid_until')
    .eq('code', code.trim().toUpperCase())
    .maybeSingle();

  if (error || !data) {
    return {
      statusCode: 200,
      body: JSON.stringify({ valid: false, message: 'Neplatný kód' }),
    };
  }

  if (!data.is_active) {
    return {
      statusCode: 200,
      body: JSON.stringify({ valid: false, message: 'Tento kód už nie je aktívny' }),
    };
  }

  if (data.max_uses !== null && data.current_uses >= data.max_uses) {
    return {
      statusCode: 200,
      body: JSON.stringify({ valid: false, message: 'Kód bol už použitý maximálny počet krát' }),
    };
  }

  if (data.valid_until && new Date(data.valid_until) < new Date()) {
    return {
      statusCode: 200,
      body: JSON.stringify({ valid: false, message: 'Platnosť kódu vypršala' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ valid: true, discount_percent: data.discount_percent }),
  };
};