'use client';
import Script from 'next/script';
import React from 'react';
import config from 'temp/config';

const CookieBotScript = (props) => {
  const { local, domainGroupID } = props;

  const handleFetchCookie = async (param) => {
    try {
      await fetch(
        `${config.sitecoreApiHost}/api/cookie-policy/consent?sc_apikey=${config.sitecoreApiKey}`,
        {
          body: JSON.stringify({ accepted: param }),
          method: 'post',
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type header
          },
        }
      );
    } catch (e) {}
  };
  return (
    <Script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid={domainGroupID}
      data-culture={local}
      data-blockingmode="auto"
      type="text/javascript"
      strategy="afterInteractive" // or "beforeInteractive" if needed
      onLoad={() => {
        window.addEventListener(
          'CookiebotOnAccept',
          (e) => {
            handleFetchCookie(true);
          },
          false
        );
        window.addEventListener(
          'CookiebotOnDecline',
          (e) => {
            handleFetchCookie(false);
          },
          false
        );
      }}
    />
  );
};

export default CookieBotScript;
