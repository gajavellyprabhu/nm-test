import React from 'react';
// import Head from 'next/head';
import {
  Placeholder,
  LayoutServiceData,
  HTMLLink,
  VisitorIdentification,
} from '@sitecore-jss/sitecore-jss-nextjs';
// import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import { GlobalContextProvider } from 'globalContext/context';
import ImageRenderer from 'subComponents/ImageRenderer';
import clsx from 'clsx';
import { Helmet } from 'react-helmet';
// import CanonicalURL from 'subComponents/SEO/CanonicalURL';
import GoogleTagManager from 'subComponents/SEO/GoogleTagManager';
// import CookieBotScript from 'subComponents/SEO/CookieBotScript';
// Prefix public assets with a public URL to enable compatibility with Sitecore editors.
// If you're not supporting Sitecore editors, you can remove this.
// const publicUrl = getPublicUrl();
import SEOSchema from 'subComponents/SEO/SEOSchema';

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

// interface RouteFields {
//   [key: string]: unknown;
//   pageTitle: Field;
// }
const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { route, context } = layoutData.sitecore;
  const { itemId, itemLanguage, fields }: any = route;
  const { backgroundImage, backgroundImageFlipped, schemaSameAs, schemaName, schemaLogo } = fields;

  const { canonicalUrl, itemPath }: any = context;

  const isHomePage = itemPath === '/';

  // const fields = route?.fields as RouteFields;
  // const handleSetActiveRoute = (props: any) => {

  //   return { activePageID: route?.itemId, ...props };
  // };
  // const handleSetFieldsAndParams = (props: any) => {
  //   return { fields: {}, params: {}, ...props };
  // };

  // const getInitialProps = async (ctx) => {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   return { ...initialProps };
  // };

  return (
    <>
      {/* <Scripts /> */}
      {/* <CanonicalURL /> */}
      <GoogleTagManager />
      {isHomePage && <SEOSchema {...{ schemaSameAs, schemaName, canonicalUrl, schemaLogo }} />}
      {/* <Head>
        <title>{fields.pageTitle.value.toString() || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
      </Head> */}
      {/* <Head>{route && <Placeholder name="murabba-head" rendering={route} />}</Head> */}
      {route && <Placeholder name="murabba-head" rendering={route} />}

      <Helmet>
        <html
          lang={route?.itemLanguage}
          dir={route?.itemLanguage?.startsWith('en') ? 'ltr' : 'rtl'}
          // prettier-ignore
          {...({ 'xml:lang': `${route?.itemLanguage}`} as any)}
        />
        {/* <Head> */}
        {/* </Head> */}
      </Helmet>
      <VisitorIdentification />
      {/* root placeholder for the app, which we add components to using route data */}
      <GlobalContextProvider activeLinkID={itemId} locale={itemLanguage}>
        <div className="global-wrapper">
          <div className="global-content">
            {route && (
              <Placeholder
                name="murabba-header"
                rendering={route}
                // modifyComponentProps={handleSetActiveRoute}
              />
            )}
            {route && (
              <main className="layout-main">
                {route && (
                  <Placeholder
                    name="murabba-main-sub"
                    rendering={route}
                    // modifyComponentProps={handleSetActiveRoute}
                  />
                )}
                <div
                  className={clsx(
                    'main-section',
                    !!fields?.styles?.value ? fields?.styles?.value : ''
                  )}
                >
                  {backgroundImage?.value?.src && (
                    <ImageRenderer
                      className={clsx(
                        'pattern_image_global',
                        backgroundImageFlipped?.value && 'fliped-image'
                      )}
                      desktopSrc={backgroundImage}
                    />
                  )}
                  <Placeholder
                    name="murabba-main"
                    rendering={route}
                    // modifyComponentProps={handleSetFieldsAndParams}
                  />
                </div>
              </main>
            )}
            {route && <Placeholder name="murabba-footer" rendering={route} />}
          </div>
        </div>
      </GlobalContextProvider>
    </>
  );
};

export default Layout;
