import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  section?: string;
}

const SEO = ({
  title = 'InsurSnoop',
  description = 'Upload a document. Ask a question. Get instant answers.',
  keywords = 'insurance, document analysis, AI assistant, policy questions',
  image = '/og-image.png',
  url = window.location.href,
  type = 'website',
  author = 'InsurSnoop',
  publishedTime,
  section
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    if (author) updateMetaTag('author', author);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:site_name', 'InsurSnoop', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Article-specific meta tags
    if (type === 'article') {
      if (publishedTime) updateMetaTag('article:published_time', publishedTime, true);
      if (author) updateMetaTag('article:author', author, true);
      if (section) updateMetaTag('article:section', section, true);
    }

    // Canonical URL
    let canonicalElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalElement) {
      canonicalElement.href = url;
    } else {
      canonicalElement = document.createElement('link');
      canonicalElement.rel = 'canonical';
      canonicalElement.href = url;
      document.head.appendChild(canonicalElement);
    }
  }, [title, description, keywords, image, url, type, author, publishedTime, section]);

  return null;
};

export default SEO;