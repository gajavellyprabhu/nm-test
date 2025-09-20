// 'use client';
import Script from 'next/script';
import React from 'react';

const SEOSchema = (props) => {
  const { schemaSameAs, schemaName, canonicalUrl, schemaLogo } = props;

  let sameAs = schemaSameAs?.value
    ?.replace(/\r?\n/g, ',') // Replace line breaks with commas
    ?.split(',') // Split by commas
    ?.map((url) => url.trim()) // Trim any extra spaces
    ?.filter((url) => url); //
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: schemaName?.value,
    url: canonicalUrl,
    logo: schemaLogo?.value?.src,
    sameAs,
  };
  return (
    // <script
    //   type="application/ld+json"
    //   dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    // />
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
};

export default SEOSchema;
