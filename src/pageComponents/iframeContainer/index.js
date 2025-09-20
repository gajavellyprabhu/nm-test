/* eslint-disable react/no-unescaped-entities */
'use client';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Cookie from 'js-cookie';
import Script from 'next/script';
import GlobalStructure from 'subComponents/GlobalStructure';
import { useI18n } from 'next-localization';
import TitleComponent from 'subComponents/TitleComponent';

export const Default = (props) => {
  const { t } = useI18n();
  const iframelink = 'https://my.forms.app/nmdcvr/vendorform-1#655631413b034d6e26ee0e5f=';
  const formID = '654cb1ea7b562eea573435ac';
  const heightFixed = '2850px';
  const uniqueUUID = Cookie.get('userCookie') || '123';
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <GlobalStructure className={styles['FormIframe']} isNoPadding anchorId={props?.rendering?.uid}>
      <TitleComponent field={{ value: t('title_iframe') }} className={styles['iframe_title']} />

      {!!uniqueUUID && domLoaded && (
        <>
          <div className={styles['formiframe']} formsappid={formID}></div>
          <Script
            src="https://forms.app/static/embed.js"
            type="text/javascript"
            async
            defer
            onLoad={() => {
              new formsapp(formID, 'standard', {
                height: heightFixed,
                width: '100%',
                answers: { '655631413b034d6e26ee0e5f': uniqueUUID }, // used to generate uuid params in the url
              });
            }}
          />
        </>
      )}
    </GlobalStructure>
  );
};
