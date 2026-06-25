import { seoConfig } from './seo.config';

/**
 * Organization Schema (JSON-LD)
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${seoConfig.baseUrl}/#organization`,
    'name': seoConfig.companyName,
    'alternateName': seoConfig.siteName,
    'url': seoConfig.baseUrl,
    'logo': seoConfig.logoUrl,
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': seoConfig.contact.phone,
        'contactType': 'sales',
        'areaServed': 'BR',
        'availableLanguage': 'Portuguese'
      }
    ],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': seoConfig.contact.address.streetAddress,
      'addressLocality': seoConfig.contact.address.addressLocality,
      'addressRegion': seoConfig.contact.address.addressRegion,
      'postalCode': seoConfig.contact.address.postalCode,
      'addressCountry': seoConfig.contact.address.addressCountry
    },
    'sameAs': Object.values(seoConfig.social).filter(Boolean)
  };
}

/**
 * WebSite Schema (JSON-LD)
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${seoConfig.baseUrl}/#website`,
    'name': seoConfig.siteName,
    'url': seoConfig.baseUrl,
    'description': seoConfig.defaultDescription,
    'publisher': {
      '@id': `${seoConfig.baseUrl}/#organization`
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${seoConfig.baseUrl}/?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * WebPage Schema (JSON-LD)
 */
export function getWebPageSchema(title: string, description: string, path: string) {
  const url = `${seoConfig.baseUrl}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    'url': url,
    'name': title,
    'description': description,
    'isPartOf': {
      '@id': `${seoConfig.baseUrl}/#website`
    },
    'about': {
      '@id': `${seoConfig.baseUrl}/#organization`
    },
    'inLanguage': 'pt-BR'
  };
}

/**
 * BreadcrumbList Schema (JSON-LD)
 */
export interface BreadcrumbItem {
  name: string;
  item: string; // URL path or full URL
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => {
      const isAbsolute = item.item.startsWith('http://') || item.item.startsWith('https://');
      const absoluteUrl = isAbsolute ? item.item : `${seoConfig.baseUrl}${item.item}`;
      return {
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': absoluteUrl
      };
    })
  };
}

/**
 * Product Schema (specifically for SisHOSP Software)
 */
export function getProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${seoConfig.baseUrl}/#product`,
    'name': 'SisHOSP',
    'image': seoConfig.logoUrl,
    'description': 'O SisHOSP é a solução definitiva em software de saúde para clínicas multiprofissionais de reabilitação, centros de Autismo (método ABA), APAEs e convênios. Centraliza agendas, prontuários, faturamento SUS (BPA-I, APAC) e reduz faltas.',
    'brand': {
      '@type': 'Brand',
      'name': 'SisHOSP'
    },
    'offers': {
      '@type': 'AggregateOffer',
      'url': seoConfig.baseUrl,
      'priceCurrency': 'BRL',
      'lowPrice': 'Solicitar Orçamento',
      'offerCount': '1',
      'seller': {
        '@id': `${seoConfig.baseUrl}/#organization`
      }
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'bestRating': '5',
      'worstRating': '1',
      'ratingCount': '850',
      'reviewCount': '124'
    }
  };
}

/**
 * FAQPage Schema (JSON-LD)
 */
export interface FAQSchemaItem {
  question: string;
  answer: string;
}

export function getFAQSchema(items: FAQSchemaItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': items.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };
}

/**
 * Article Schema (JSON-LD)
 */
export interface ArticleSchemaData {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}

export function getArticleSchema(data: ArticleSchemaData, path: string) {
  const url = `${seoConfig.baseUrl}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    'isPartOf': {
      '@id': `${url}#webpage`
    },
    'headline': data.headline,
    'description': data.description,
    'image': data.image,
    'datePublished': data.datePublished,
    'dateModified': data.dateModified || data.datePublished,
    'author': {
      '@type': 'Person',
      'name': data.authorName
    },
    'publisher': {
      '@id': `${seoConfig.baseUrl}/#organization`
    },
    'mainEntityOfPage': url
  };
}
