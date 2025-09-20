import { GoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import NewsletterBanner from './NewsletterBanner';
import { useState } from 'react';
import { NewsletterBannerProvider } from './context';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

export const Default = (props) => {
  const [googleRecaptchaVerifiedKey, setGoogleRecaptchaVerifiedKey] = useState('');
  const [refreshReCaptcha, setRefreshReCaptcha] = useState({
    shouldInsert: false,
    count: 0,
    shouldSubmit: false,
  });
  const { sitecoreContext } = useSitecoreContext();
  const { recaptcha } = sitecoreContext;
  const { publicKey } = recaptcha;

  const onRecaptchaVerify = (token) => {
    if (!!!googleRecaptchaVerifiedKey && refreshReCaptcha?.shouldInsert) {
      setGoogleRecaptchaVerifiedKey(token);
      setRefreshReCaptcha((preValue) => ({ ...preValue, shouldInsert: false, shouldSubmit: true }));
    }
  };
  return (
    <NewsletterBannerProvider>
      <GoogleReCaptchaProvider reCaptchaKey={publicKey}>
        <NewsletterBanner
          {...{
            ...props,
            googleRecaptchaVerifiedKey,
            setGoogleRecaptchaVerifiedKey,
            setRefreshReCaptcha,
            refreshReCaptcha,
          }}
        />
        <GoogleReCaptcha onVerify={onRecaptchaVerify} refreshReCaptcha={refreshReCaptcha.count} />
      </GoogleReCaptchaProvider>
    </NewsletterBannerProvider>
  );
};
