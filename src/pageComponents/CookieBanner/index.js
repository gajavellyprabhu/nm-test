'use client';
import styles from './styles.module.scss';
import GlobalStructure from 'subComponents/GlobalStructure';
import Button from 'subComponents/Button';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import config from 'temp/config';

const COOKIE_CONSENT_KEY = 'MurabbaCookies';
const COOKIE_DURATION = 7;

export const Default = (props) => {
  const { fields, params } = props;
  const { Styles } = params;
  const { acceptCtaTitle, description } = fields;
  const buttonText = acceptCtaTitle?.value;
  const text = description?.value;

  const [cookieConsentExists, setCookieConsentExists] = useState(false);
  const [componentLoaded, setComponentLoaded] = useState(false);

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

  useEffect(() => {
    setComponentLoaded(true);
    const cookieConsentValue = Cookies.get(COOKIE_CONSENT_KEY);
    const cookieHasValue = !!cookieConsentValue;
    setCookieConsentExists(cookieHasValue);
  }, []);

  const handleClick = (cookieValue) => {
    handleFetchCookie(true);
    Cookies.set(COOKIE_CONSENT_KEY, cookieValue, { expires: COOKIE_DURATION, secure: true });
    setCookieConsentExists(true);
  };

  return (
    !cookieConsentExists &&
    componentLoaded && (
      <GlobalStructure className={styles['cookieBannerComponent']} paddingClass={Styles}>
        <div className={styles['inner-container']}>
          {!!text && (
            <p
              className={styles['text']}
              dangerouslySetInnerHTML={{
                __html: text,
              }}
            />
          )}
          {!!buttonText && (
            <Button
              onClick={() => {
                handleClick('true');
              }}
              target="_blank"
              className={clsx('primary-button')}
              text={buttonText}
            />
          )}
        </div>
      </GlobalStructure>
    )
  );
};
