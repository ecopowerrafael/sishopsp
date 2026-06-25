import React, { createContext, useContext, useEffect, useState } from 'react';
import { seoConfig } from './seo.config';
import { getOrganizationSchema, getWebSiteSchema, getWebPageSchema, getProductSchema, getFAQSchema, FAQSchemaItem } from './schemaGenerators';
import { getDynamicOgImage } from './ogImage';

interface SeoContextType {
  currentPath: string;
  setCurrentPath: (path: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SeoContext = createContext<SeoContextType | undefined>(undefined);

export const SeoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [searchQuery, setSearchQuery] = useState('');

  // Track path changes and handle redirects dynamically
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      setCurrentPath(path);

      // Check for 301/302 redirects defined in config
      const matchingRedirect = seoConfig.redirects.find(
        (r) => r.source.toLowerCase() === path.toLowerCase()
      );
      if (matchingRedirect) {
        if (matchingRedirect.destination.startsWith('#')) {
          // Internal anchor hash redirection
          window.location.hash = matchingRedirect.destination;
        } else {
          window.location.replace(matchingRedirect.destination);
        }
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Initial check
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  return (
    <SeoContext.Provider value={{ currentPath, setCurrentPath, searchQuery, setSearchQuery }}>
      {children}
    </SeoContext.Provider>
  );
};

export const useSeo = () => {
  const context = useContext(SeoContext);
  if (!context) {
    throw new Error('useSeo must be used within an SeoProvider');
  }
  return context;
};

interface MetaTagsProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string[];
  robots?: string;
  noIndex?: boolean;
  schemaType?: 'landing' | 'product' | 'faq' | 'article' | 'website';
  faqItems?: FAQSchemaItem[];
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  canonical,
  image,
  type = 'website',
  keywords,
  robots,
  noIndex = false,
  schemaType = 'website',
  faqItems = [],
}) => {
  useEffect(() => {
    // 1. Update Title
    const finalTitle = title
      ? seoConfig.titleTemplate.replace('%s', title)
      : seoConfig.defaultTitle;
    document.title = finalTitle;

    // Helper to find or create meta tag
    const setMetaTag = (attrName: string, attrVal: string, contentVal: string) => {
      if (!contentVal) return;
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    // Helper to find or create link tag
    const setLinkTag = (relVal: string, hrefVal: string) => {
      if (!hrefVal) return;
      let el = document.querySelector(`link[rel="${relVal}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', relVal);
        document.head.appendChild(el);
      }
      el.setAttribute('href', hrefVal);
    };

    // 2. Set description & keywords
    const finalDesc = description || seoConfig.defaultDescription;
    setMetaTag('name', 'description', finalDesc);

    const mergedKeywords = [
      ...(keywords || []),
      ...seoConfig.keywords,
    ].slice(0, 15); // limit to top 15
    setMetaTag('name', 'keywords', mergedKeywords.join(', '));

    // 3. Robots
    const finalRobots = noIndex ? 'noindex, nofollow' : robots || 'index, follow, max-image-preview:large';
    setMetaTag('name', 'robots', finalRobots);

    // 4. Canonical Link
    const finalCanonical = canonical || `${seoConfig.baseUrl}${window.location.pathname}`;
    setLinkTag('canonical', finalCanonical);

    // 5. OpenGraph Tags
    setMetaTag('property', 'og:title', finalTitle);
    setMetaTag('property', 'og:description', finalDesc);
    setMetaTag('property', 'og:url', finalCanonical);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', seoConfig.siteName);
    setMetaTag('property', 'og:locale', 'pt_BR');

    // Social Image Generation / Fallback
    // If no specific image is provided, we use our SVG-to-base64 brand graphic generator with the current page title!
    const finalImage = image || getDynamicOgImage(title || seoConfig.siteName);
    setMetaTag('property', 'og:image', finalImage);
    setMetaTag('property', 'og:image:alt', title || seoConfig.siteName);

    // 6. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', finalTitle);
    setMetaTag('name', 'twitter:description', finalDesc);
    setMetaTag('name', 'twitter:image', finalImage);

    // 7. Theme Color
    setMetaTag('name', 'theme-color', seoConfig.primaryColor);

    // 8. Language and Alternate attributes on HTML
    document.documentElement.setAttribute('lang', 'pt-BR');

    // 9. Structured Data injection based on 'schemaType'
    const schemas: Record<string, any>[] = [];

    // Always inject Organization and Website schema on indexable pages
    if (!noIndex) {
      schemas.push(getOrganizationSchema());
      schemas.push(getWebSiteSchema());
      schemas.push(getWebPageSchema(finalTitle, finalDesc, window.location.pathname));
    }

    if (schemaType === 'product') {
      schemas.push(getProductSchema());
    } else if (schemaType === 'faq' && faqItems.length > 0) {
      schemas.push(getFAQSchema(faqItems));
    }

    // Inject consolidated schemas
    let script = document.getElementById('auto-consolidated-schemas') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'auto-consolidated-schemas';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': schemas
    });

    // 10. Analytical / Tracking Pixel Integrations (Pre-setup infrastructure)
    // Setup verification meta tags
    setMetaTag('name', 'google-site-verification', 'G-verification-placeholder-code-sishosp');

    // Initialize Google Tag Manager if ID provided (Stub for production activation)
    const gtmId = 'GTM-SISHOSP-MOCK';
    let gtmScript = document.getElementById('gtm-script-injector') as HTMLScriptElement;
    if (!gtmScript) {
      gtmScript = document.createElement('script');
      gtmScript.id = 'gtm-script-injector';
      gtmScript.textContent = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      document.head.appendChild(gtmScript);
    }

    // Initialize Microsoft Clarity (Stub for production activation)
    const clarityId = 'clarity-sishosp-mock';
    let clarityScript = document.getElementById('clarity-script-injector') as HTMLScriptElement;
    if (!clarityScript) {
      clarityScript = document.createElement('script');
      clarityScript.id = 'clarity-script-injector';
      clarityScript.textContent = `
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${clarityId}");
      `;
      document.head.appendChild(clarityScript);
    }

    return () => {
      // Cleanups
      const consolidated = document.getElementById('auto-consolidated-schemas');
      if (consolidated) consolidated.remove();
    };
  }, [title, description, canonical, image, type, keywords, robots, noIndex, schemaType, faqItems]);

  return null;
};

interface StructuredDataProps {
  data: Record<string, any>;
  id?: string;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ data, id = 'seo-structured-data' }) => {
  useEffect(() => {
    let script = document.getElementById(id) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [data, id]);

  return null;
};
