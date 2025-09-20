'use client';

import Script from 'next/script';

export const Default = (props) => {
  const { fields } = props;
  const { Html } = fields;

  return <Script strategy="afterInteractive">{Html?.value}</Script>;
};
