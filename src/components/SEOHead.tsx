
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  structuredData?: object;
  theme?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Multi-Theme Developer Portfolio',
  description = 'A sophisticated developer portfolio showcasing full-stack mastery through six distinct themes',
  canonical,
  ogImage = '/placeholder.svg',
  ogType = 'website',
  structuredData,
  theme
}) => {
  const fullTitle = title.includes('Portfolio') ? title : `${title} | Multi-Theme Portfolio`;
  const currentUrl = canonical || window.location.href;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Developer Portfolio",
    "jobTitle": "Full Stack Developer",
    "url": currentUrl,
    "sameAs": [],
    "knowsAbout": ["React", "TypeScript", "Node.js", "UI/UX Design", "Full Stack Development"]
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Multi-Theme Developer Portfolio" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Theme-specific meta */}
      {theme && <meta name="theme-color" content={getThemeColor(theme)} />}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

const getThemeColor = (theme: string): string => {
  const themeColors = {
    minimalist: '#000000',
    'retro-arcade': '#00ffff',
    storytelling: '#8b5a00',
    '3d-interactive': '#3b82f6',
    ecommerce: '#059669',
    videography: '#1f2937'
  };
  return themeColors[theme as keyof typeof themeColors] || '#000000';
};

export default SEOHead;
