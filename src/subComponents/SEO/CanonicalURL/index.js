'use client';
// import { useParams, usePathname } from 'next/navigation';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Head from 'next/head';
export default function CanonicalURL() {
  const { sitecoreContext } = useSitecoreContext();
  const { canonicalUrl, language } = sitecoreContext;
  // const pathname = usePathname();
  // const param = useParams();
  // const url = process.env.SITECORE_API_HOST;
  //  const baseUrl = `${url}${pathname}`;
  // let final = pathname.replace(`${param.locale}/`, ``); // search

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
      <link
        rel="alternate"
        hrefLang={`en`}
        href={
          canonicalUrl.endsWith('/' + language) //language ar
            ? canonicalUrl.replace('/' + language, '/en')
            : canonicalUrl.replace('/' + language + '/', '/en/')
        }
      />
      <link
        rel="alternate"
        hrefLang={`ar`}
        href={
          canonicalUrl.endsWith('/' + language)
            ? canonicalUrl.replace('/' + language, '/ar')
            : canonicalUrl.replace('/' + language + '/', '/ar/')
        }
      />
    </Head>
  );
}
