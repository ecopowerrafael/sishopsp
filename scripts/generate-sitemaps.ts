import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEO_PAGES_LIST } from '../src/seo/seoPagesData';

// Emulate __dirname since we are in ES Module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SITEMAP_SEO_PATH = path.join(PUBLIC_DIR, 'sitemap-seo.xml');
const SITEMAP_INDEX_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');

async function generateSitemaps() {
  console.log('Starting Sitemap Generator...');
  const today = new Date().toISOString().split('T')[0];

  try {
    // 1. Generate sitemap-seo.xml
    console.log(`Generating sitemap-seo.xml with ${SEO_PAGES_LIST.length} commercial SEO landing pages...`);
    
    let seoXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    seoXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const page of SEO_PAGES_LIST) {
      seoXml += '  <url>\n';
      seoXml += `    <loc>https://portal.sishosp.com.br/${page.slug}</loc>\n`;
      seoXml += `    <lastmod>${today}</lastmod>\n`;
      seoXml += '    <changefreq>weekly</changefreq>\n';
      seoXml += '    <priority>0.7</priority>\n';
      seoXml += '  </url>\n';
    }

    seoXml += '</urlset>\n';

    fs.writeFileSync(SITEMAP_SEO_PATH, seoXml, 'utf-8');
    console.log('sitemap-seo.xml written successfully!');

    // 2. Update sitemap.xml to include sitemap-seo.xml
    console.log('Updating sitemap.xml to index the new sitemap-seo.xml...');
    
    const sitemaps = [
      { name: 'sitemap-pages.xml', lastmod: today },
      { name: 'sitemap-products.xml', lastmod: today },
      { name: 'sitemap-seo.xml', lastmod: today },
      { name: 'sitemap-images.xml', lastmod: today },
      { name: 'sitemap-videos.xml', lastmod: today },
    ];

    let indexXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    indexXml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const sm of sitemaps) {
      indexXml += '  <sitemap>\n';
      indexXml += `    <loc>https://portal.sishosp.com.br/${sm.name}</loc>\n`;
      indexXml += `    <lastmod>${sm.lastmod}</lastmod>\n`;
      indexXml += '  </sitemap>\n';
    }

    indexXml += '</sitemapindex>\n';

    fs.writeFileSync(SITEMAP_INDEX_PATH, indexXml, 'utf-8');
    console.log('sitemap.xml updated successfully!');

    console.log('All sitemaps successfully generated and linked!');
  } catch (error) {
    console.error('Error generating sitemaps:', error);
    process.exit(1);
  }
}

generateSitemaps();
