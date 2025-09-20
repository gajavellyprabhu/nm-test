'use client';
import 'aos/dist/aos.css';
import React, { useContext, createContext, useState, useEffect } from 'react';

const newsletterBanner = createContext({
  value: {},
  setValue: () => {},
  shouldShowThankYouComp: false,
  setShouldShowThankYouComp: () => {},
});

export function useNewsletterBannerContext() {
  return useContext(newsletterBanner);
}

export function NewsletterBannerProvider(props) {
  const { children } = props;
  const [emailValues, setEmailValues] = useState({
    value: '',
    errors: [],
    isValid: false,
  });
  const [shouldShowThankYouComp, setShouldShowThankYouComp] = useState(false);

  return (
    <newsletterBanner.Provider
      value={{
        value: emailValues,
        setValue: setEmailValues,
        shouldShowThankYouComp,
        setShouldShowThankYouComp,
      }}
    >
      {children}
    </newsletterBanner.Provider>
  );
}
