import Head from 'next/head';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

export const Default = (props) => {
  const { sitecoreContext } = useSitecoreContext();
  const { browserTitle, canonicalUrl, favIcon, route, customMetadata, language } = sitecoreContext;
  // Note that the src in favicon is the shortcut icon, the icons is the icon list, and touch icons is the apple-touch-icon. The size of the icon is sent in the name
  const { icons, touchIcons } = favIcon;
  const { fields } = route;
  // console.log('fields', fields);
  // console.log('sitecoreContext', sitecoreContext);

  var metaTags = [
    { key: 'description', name: 'PageDescription' },
    { key: 'keywords', name: 'PageKeywords' },
    { key: 'og:description', name: 'OpenGraphDescription' },
    { key: 'og:image', name: 'OpenGraphImageUrl' },
    { key: 'og:image:width', name: 'OpenGraphImageUrl' },
    { key: 'og:image:height', name: 'OpenGraphImageUrl' },
    { key: 'og:title', name: 'OpenGraphTitle' },
    { key: 'og:type', name: 'OpenGraphType' },
    { key: 'og:site', name: 'OpenGraphSiteName' },
    { key: 'og:admins', name: 'OpenGraphAppId' },
    { key: 'og:appId', name: 'OpenGraphAdmins' },
    { key: 'twitter:card', name: 'TwitterCardType' },
    { key: 'twitter:creator', name: 'TwitterSite' },
    { key: 'twitter:description', name: 'TwitterDescription' },
    { key: 'twitter:image', name: 'TwitterImage' },
    { key: 'twitter:image:width', name: 'TwitterImage' },
    { key: 'twitter:image:height', name: 'TwitterImage' },
    { key: 'twitter:title', name: 'TwitterTitle' },
  ];
  metaTags?.forEach((meta) => {
    const { key, name } = meta;
    let defaultText = '';

    if (key?.toLocaleLowerCase()?.indexOf('description')) {
      defaultText = fields['PageDescription']?.value;
    }
    if (key?.toLocaleLowerCase()?.indexOf('title')) {
      defaultText = browserTitle || 'New Murabba';
    }

    // let value = !!fields[name]?.value ? fields[name]?.value : defaultText;
    let value = !!fields[name]?.fields?.Value?.value
      ? fields[name]?.fields?.Value?.value
      : fields[name]?.value ?? defaultText;
    meta.value = value;
  });
  // console.log('sitecoreContext', sitecoreContext);

  return (
    <Head>
      <title>{fields?.OpenGraphTitle?.value || browserTitle?.value || 'New Murabba'}</title>
      <link rel="canonical" href={canonicalUrl} />
      <link
        rel="alternate"
        hrefLang={`en-SA`}
        href={
          canonicalUrl.endsWith('/' + language) //language ar
            ? canonicalUrl.replace('/' + language, '/en')
            : canonicalUrl.replace('/' + language + '/', '/en/')
        }
      />
      <link
        rel="alternate"
        hrefLang={`ar-SA`}
        href={
          canonicalUrl.endsWith('/' + language)
            ? canonicalUrl.replace('/' + language, '/ar')
            : canonicalUrl.replace('/' + language + '/', '/ar/')
        }
      />
      <link rel="shortcut icon" href={favIcon?.src} />
      {icons?.map((icon, key) => {
        const { name, type, src } = icon;
        var sizes = name?.replaceAll('-', 'x');
        return <link rel="icon" href={src} type={type} sizes={sizes} key={key} />;
      })}
      {touchIcons?.map((icon, key) => {
        const { name, type, src } = icon;
        var sizes = name?.replaceAll('-', 'x');
        return <link rel="apple-touch-icon" href={src} type={type} sizes={sizes} key={key} />;
      })}
      {Object.entries(customMetadata)?.map(([key, val] = entry) => {
        val = decodeURIComponent(val);
        if(val==='') return;
        return <meta key={key} name={key} content={val} />;
      })}

      {metaTags?.map((meta) => {
        var { key, name, value } = meta;
        if(value===''){
          return;
        }
        if (key.includes('image')) {
          value = !!fields[name]?.value?.src ? fields[name]?.value?.src : '';
        }
        if (key.includes('image:width')) {
          value = !!fields[name]?.value?.width ? fields[name]?.value?.width : '';
        }
        if (key.includes('image:height')) {
          value = !!fields[name]?.value?.height ? fields[name]?.value?.height : '';
        }
        if(value===''){
          return;
        }
        if (key.includes('og:')) {
          return <meta key={key} property={key} content={value} />;
        }
        return <meta key={key} name={key} content={value} />;
      })}

      {Object.entries(fields?.Attributes)?.map(([key, val] = entry) => {
        val = decodeURIComponent(val);
        if(val==='') return;
        return <meta key={key} name={key} content={val} />;
      })}
      {/* <meta
        name="facebook:image"
        content="https://new-murabba.mirummea.com/-/jssmedia/Project/Murabba/murabba-site/pictures/new-murabba-share-image/new-murabba-share-image.png?h=630&amp;iar=0&amp;w=1200&amp;hash=E62117B8D4A9771F2BEEFAE47EC1755E"
      ></meta>
      <meta
        name="facebook:description"
        content="Would you like to know more about NMDC? Get in touch with us for more about New Murabba project in Riyadh and let us guide you through our journey. Contact us!"
      ></meta>
      <meta name="facebook:card" content="summary_large_image"></meta>
      <meta name="facebook:creator" content=""></meta> */}
      {/* <meta
        property="og:image"
        content="https://new-murabba.mirummea.com/-/jssmedia/Project/Murabba/murabba-site/pictures/new-murabba-share-image/new-murabba-share-image.png?h=630&amp;iar=0&amp;w=1200&amp;hash=E62117B8D4A9771F2BEEFAE47EC1755E"
      ></meta> */}
      {
        fields?.ChangeFrequency?.fields?.Value?.value==='DoNotInclude'? <meta name="robots" content="noindex"></meta> : ''
      }
    </Head>
  );
};
