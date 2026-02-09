// Schema.org structured data for calculators

export interface SchemaProps {
  name: string;
  description: string;
  url: string;
  locale: string;
  category: string;
  faqs?: { question: string; answer: string }[];
}

// WebApplication schema - tells Google it's a calculator tool
export function getWebApplicationSchema(props: SchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": props.name,
    "description": props.description,
    "url": props.url,
    "applicationCategory": "CalculatorApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "inLanguage": props.locale,
  };
}

// FAQPage schema - FAQs appear expanded in Google
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// BreadcrumbList schema - nice breadcrumbs in Google
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Combine all schemas
export function getAllSchemas(props: SchemaProps) {
  const schemas = [
    getWebApplicationSchema(props),
    getBreadcrumbSchema([
      { name: "Home", url: `https://kalcufy.com/${props.locale}` },
      { name: "Calculators", url: `https://kalcufy.com/${props.locale}/calculators` },
      { name: props.name, url: props.url }
    ])
  ];
  
  if (props.faqs && props.faqs.length > 0) {
    schemas.push(getFAQSchema(props.faqs));
  }
  
  return schemas;
}
