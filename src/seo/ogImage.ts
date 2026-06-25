import { seoConfig } from './seo.config';

/**
 * Generates a beautiful dynamic SVG OpenGraph Image with brand styling and page title
 * and returns it as a Data URL.
 */
export function getDynamicOgImage(pageTitle: string): string {
  const brandName = seoConfig.siteName;
  const subtitle = seoConfig.defaultTitle.split(' - ')[1] || 'Gestão Inteligente de Reabilitação';
  
  // Clean up title to prevent encoding issues
  const escapedTitle = pageTitle
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

  const escapedSubtitle = subtitle
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

  // SVG dimensions: standard 1200x630 for Facebook/OpenGraph
  const width = 1200;
  const height = 630;

  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Background Gradient -->
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a" />
          <stop offset="50%" stop-color="#1e293b" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
        
        <!-- Brand accent color glow -->
        <radialGradient id="glow" cx="10%" cy="10%" r="50%">
          <stop offset="0%" stop-color="#0d9488" stop-opacity="0.15" />
          <stop offset="100%" stop-color="#0d9488" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="glowRed" cx="90%" cy="90%" r="60%">
          <stop offset="0%" stop-color="#dc2626" stop-opacity="0.15" />
          <stop offset="100%" stop-color="#dc2626" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Outer Background -->
      <rect width="100%" height="100%" fill="url(#bgGrad)" />
      
      <!-- Colored radial glows -->
      <rect width="100%" height="100%" fill="url(#glow)" />
      <rect width="100%" height="100%" fill="url(#glowRed)" />

      <!-- Minimal Grid Pattern Accent -->
      <g opacity="0.05" stroke="#ffffff" stroke-width="1">
        <path d="M 0,100 L 1200,100 M 0,200 L 1200,200 M 0,300 L 1200,300 M 0,400 L 1200,400 M 0,500 L 1200,500" />
        <path d="M 200,0 L 200,630 M 400,0 L 400,630 M 600,0 L 600,630 M 800,0 L 800,630 M 1000,0 L 1000,630" />
      </g>

      <!-- Left border highlight -->
      <rect x="0" y="0" width="12" height="630" fill="#dc2626" />
      <rect x="12" y="0" width="8" height="630" fill="#0d9488" opacity="0.8" />

      <!-- Decorative abstract circles -->
      <circle cx="1050" cy="150" r="80" stroke="#dc2626" stroke-width="2" fill="none" opacity="0.1" />
      <circle cx="1050" cy="150" r="40" stroke="#0d9488" stroke-width="1" fill="none" opacity="0.1" />

      <!-- Brand Identity (Header) -->
      <g transform="translate(80, 100)">
        <!-- Green badge indicator -->
        <rect x="0" y="0" width="180" height="34" rx="17" fill="#0d9488" fill-opacity="0.2" stroke="#0d9488" stroke-width="1.5" stroke-opacity="0.4" />
        <text x="90" y="22" font-family="'Inter', sans-serif" font-weight="bold" font-size="12" fill="#2dd4bf" text-anchor="middle" letter-spacing="2">PORTAL OFICIAL</text>
        
        <!-- Brand name and logo simulation -->
        <text x="0" y="85" font-family="'Inter', sans-serif" font-weight="900" font-size="44" fill="#ffffff" letter-spacing="-1">
          Sis<tspan fill="#dc2626">HOSP</tspan>
        </text>
      </g>

      <!-- Main Page Title in the center-left -->
      <g transform="translate(80, 300)">
        <!-- Multi-line title helper (max 2 lines in 1200px format) -->
        <text font-family="'Inter', sans-serif" font-weight="bold" font-size="52" fill="#f8fafc" line-height="1.2">
          ${escapedTitle.length > 40 ? `<tspan x="0" dy="0">${escapedTitle.slice(0, 35)}...</tspan>` : `<tspan x="0" dy="0">${escapedTitle}</tspan>`}
        </text>
        
        <!-- Divider line -->
        <line x1="0" y1="50" x2="300" y2="50" stroke="#dc2626" stroke-width="4" stroke-linecap="round" />
        
        <!-- Description / Subtitle -->
        <text x="0" y="100" font-family="'Inter', sans-serif" font-weight="normal" font-size="24" fill="#94a3b8">
          ${escapedSubtitle}
        </text>
      </g>

      <!-- Footer Info -->
      <g transform="translate(80, 540)">
        <text font-family="'JetBrains Mono', monospace" font-size="16" fill="#0d9488" letter-spacing="1">
          portal.sishosp.com.br
        </text>
        <text x="1040" y="0" font-family="'Inter', sans-serif" font-size="14" fill="#64748b" text-anchor="end">
          © ${new Date().getFullYear()} SisHOSP. Todos os direitos reservados.
        </text>
      </g>
    </svg>
  `;

  // Base64 encode the SVG string to use safely as an img src or og:image tag
  const utf8Bytes = new TextEncoder().encode(svg);
  const base64 = btoa(String.fromCharCode(...utf8Bytes));
  return `data:image/svg+xml;base64,${base64}`;
}
