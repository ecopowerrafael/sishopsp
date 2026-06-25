import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { getBreadcrumbSchema } from './schemaGenerators';
import { StructuredData } from './MetaTags';

export interface BreadcrumbCrumb {
  name: string;
  path: string;
}

interface BreadcrumbProps {
  crumbs?: BreadcrumbCrumb[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ crumbs = [] }) => {
  // Always start with Home
  const allCrumbs: BreadcrumbCrumb[] = [
    { name: 'Início', path: '/' },
    ...crumbs,
  ];

  // Map to format required for schema generator
  const schemaItems = allCrumbs.map((crumb) => ({
    name: crumb.name,
    item: crumb.path,
  }));

  const breadcrumbSchema = getBreadcrumbSchema(schemaItems);

  return (
    <>
      {/* Inject Breadcrumb structured data in head */}
      <StructuredData data={breadcrumbSchema} id="breadcrumb-schema" />

      {/* Visual Breadcrumbs */}
      <nav 
        aria-label="Breadcrumb" 
        className="flex items-center gap-2 py-3 px-4 rounded-lg bg-slate-50/80 border border-slate-100 backdrop-blur-sm text-xs text-slate-500 w-fit mb-6"
      >
        <ol className="flex items-center gap-2 m-0 p-0 list-none">
          {allCrumbs.map((crumb, index) => {
            const isLast = index === allCrumbs.length - 1;

            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" aria-hidden="true" />
                )}
                
                {isLast ? (
                  <span 
                    aria-current="page" 
                    className="font-semibold text-slate-800 tracking-tight"
                  >
                    {crumb.name}
                  </span>
                ) : (
                  <a
                    href={crumb.path}
                    onClick={(e) => {
                      // Support client-side navigation or hash scroll if applicable
                      if (crumb.path.startsWith('#')) {
                        e.preventDefault();
                        const el = document.querySelector(crumb.path);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex items-center gap-1 hover:text-teal-600 transition-colors duration-150 py-0.5"
                  >
                    {index === 0 && (
                      <Home className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                    )}
                    <span>{crumb.name}</span>
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
