import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import { SitecorePageProps } from 'lib/page-props';
import MUITheme from '../utils/MUITheme';
import 'assets/main.scss';
import { CssBaseline, ThemeProvider } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
// import { useEffect } from 'react';

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const TemplateToRender = () => {
    return (
      <ThemeProvider theme={MUITheme(pageProps.locale)}>
        <CssBaseline />
        <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
          <Component {...rest} />
        </I18nProvider>
      </ThemeProvider>
    );
  };
  return (
    // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
    // Note Next.js does not (currently) provide anything for translation, only i18n routing.
    // If your app is not multilingual, next-localization and references to it can be removed.
    !pageProps.locale?.startsWith('ar') ? (
      <TemplateToRender />
    ) : (
      <CacheProvider value={cacheRtl}>
        <TemplateToRender />
      </CacheProvider>
    )
  );
}

export default App;
