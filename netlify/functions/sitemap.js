// Dynamická sitemap – produkty sa načítajú priamo zo Supabase.
// Každý nový produkt (is_active = true) sa v sitemap objaví sám,
// vypredaný/skrytý (is_active = false) z nej sám zmizne.
//
// Aktivácia: do public/_redirects (NAD riadok "/* /index.html 200") pridaj:
//   /sitemap.xml  /.netlify/functions/sitemap  200!
// Ak používaš netlify.toml, ekvivalent (nad SPA pravidlom):
//   [[redirects]]
//     from = "/sitemap.xml"
//     to = "/.netlify/functions/sitemap"
//     status = 200
//     force = true
// Starý statický public/sitemap.xml potom môžeš zmazať.

const { createClient } = require('@supabase/supabase-js');

const SITE = 'https://fixanto.sk';

const STATIC_PAGES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/eshop', changefreq: 'daily', priority: '0.9' },
  { path: '/vykup-apple', changefreq: 'monthly', priority: '0.8' },
  { path: '/tipy', changefreq: 'monthly', priority: '0.7' },
  { path: '/ochrana-osobnych-udajov', changefreq: 'yearly', priority: '0.3' },
  { path: '/vseobecne-obchodne-podmienky', changefreq: 'yearly', priority: '0.3' },
  { path: '/reklamacny-poriadok', changefreq: 'yearly', priority: '0.3' },
];

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const day = (iso) => (iso ? String(iso).slice(0, 10) : null);

exports.handler = async () => {
  let products = [];

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );

    const { data, error } = await supabase
      .from('products')
      .select('slug, name, capacity, color, main_image, updated_at')
      .eq('is_active', true)
      .order('updated_at', { ascending: false });

    if (error) console.error('Sitemap products error:', error);
    else products = data || [];
  } catch (err) {
    // Ak DB zlyhá, vrátime aspoň statické stránky
    console.error('Sitemap error:', err);
  }

  const eshopLastmod = day(products[0]?.updated_at);

  const staticUrls = STATIC_PAGES.map((p) => {
    const lastmod = p.path === '/eshop' && eshopLastmod
      ? `\n    <lastmod>${eshopLastmod}</lastmod>`
      : '';
    return `  <url>
    <loc>${SITE}${p.path}</loc>${lastmod}
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`;
  });

  const productUrls = products.map((p) => {
    const lastmod = day(p.updated_at);
    const image = p.main_image
      ? `
    <image:image>
      <image:loc>${esc(p.main_image)}</image:loc>
      <image:title>${esc(`${p.name} ${p.capacity} ${p.color}`)}</image:title>
    </image:image>`
      : '';
    return `  <url>
    <loc>${SITE}/eshop/${esc(p.slug)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${image}
  </url>`;
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[...staticUrls, ...productUrls].join('\n')}
</urlset>
`;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
    body,
  };
};