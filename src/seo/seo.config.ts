/**
 * central SEO configuration for SisHOSP Portal
 */

export interface SeoConfig {
  siteName: string;
  companyName: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  baseUrl: string;
  logoUrl: string;
  primaryColor: string;
  keywords: string[];
  contact: {
    phone: string;
    email: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
  };
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
  };
  redirects: {
    source: string;
    destination: string;
    type: 301 | 302;
  }[];
  routes: {
    path: string;
    title: string;
    description: string;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number;
    category?: string;
  }[];
}

export const seoConfig: SeoConfig = {
  siteName: 'SisHOSP Portal',
  companyName: 'SisHOSP Tecnologia em Saúde',
  defaultTitle: 'SisHOSP Portal - Líder em Gestão de Reabilitação, Clínicas e APAEs',
  titleTemplate: '%s | SisHOSP Portal',
  defaultDescription: 'O SisHOSP é o software definitivo para gestão de clínicas multiprofissionais de reabilitação, centros de Autismo (método ABA), APAEs e convênios. Controle agendas, prontuários e simplifique o faturamento SUS.',
  baseUrl: 'https://portal.sishosp.com.br',
  logoUrl: 'https://sishosp.com.br/wp-content/uploads/2025/03/cropped-logo-sishosp.webp',
  primaryColor: '#dc2626', // Red theme as requested by the user
  keywords: [
    'SisHOSP',
    'gestão de reabilitação',
    'faturamento SUS',
    'BPA-I',
    'APAC',
    'método ABA',
    'clínica de autismo',
    'APAE',
    'prontuário eletrônico',
    'gestão de clínicas',
    'padrão TISS',
    'agenda de terapeutas'
  ],
  contact: {
    phone: '+55 (82) 3432-8400',
    email: 'contato@sishosp.com.br',
    address: {
      streetAddress: 'Av. Dr. Antônio Gouveia, 1007',
      addressLocality: 'Maceió',
      addressRegion: 'AL',
      postalCode: '57030-170',
      addressCountry: 'BR'
    }
  },
  social: {
    facebook: 'https://facebook.com/sishosp',
    instagram: 'https://instagram.com/sishosp',
    linkedin: 'https://linkedin.com/company/sishosp',
    youtube: 'https://youtube.com/sishosp',
    twitter: 'https://twitter.com/sishosp'
  },
  redirects: [
    { source: '/home', destination: '/', type: 301 },
    { source: '/sishosp', destination: '/', type: 301 },
    { source: '/sishosp-portal', destination: '/', type: 301 },
    { source: '/calculadora-roi', destination: '#calculadora', type: 302 },
    { source: '/simulador-faturamento', destination: '#simulador', type: 302 },
    { source: '/clientes-ativos', destination: '#clientes', type: 302 }
  ],
  routes: [
    {
      path: '/',
      title: 'SisHOSP Portal - Sistema de Gestão para Clínicas de Reabilitação',
      description: 'Plataforma líder para gestão de reabilitação, clínicas, APAEs e autismo ABA. Simplifique o faturamento SUS e reduza absenteísmo.',
      changefreq: 'daily',
      priority: 1.0
    },
    {
      path: '/funcionalidades',
      title: 'Funcionalidades Completas de Gestão Clínica',
      description: 'Conheça o prontuário especializado, agenda inteligente, confirmações automáticas por WhatsApp e relatórios integrados.',
      changefreq: 'weekly',
      priority: 0.8,
      category: 'features'
    },
    {
      path: '/faturamento-sus',
      title: 'Faturamento SUS e TISS Descomplicados',
      description: 'Gere arquivos BPA-I e APAC de forma 100% automatizada e livre de glosas. Adequado às portarias oficiais do Ministério da Saúde.',
      changefreq: 'weekly',
      priority: 0.9,
      category: 'features'
    },
    {
      path: '/calculadora',
      title: 'Simulador de ROI - Calcule sua Economia com o SisHOSP',
      description: 'Simulador interativo de economia de recursos, redução de glosas de faturamento e eliminação de faltas.',
      changefreq: 'monthly',
      priority: 0.8,
      category: 'tools'
    }
  ]
};
