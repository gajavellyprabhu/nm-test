'use client';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { createContext, useContext, useEffect } from 'react';
// import Cookie from 'js-cookie';
// import { uuid } from 'uuidv4';
import { useMediaQuery } from '@mui/material';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useState } from 'react';

const globalContext = createContext({
  locale: '',
  isDesktopLayout: '',
  setIsNavigationSubMenuOpen: () => {},
  isNavigationSubMenuOpen: false,
  setSearchOpen: () => {},
  searchOpen: false,
});

export function useGlobalContext() {
  return useContext(globalContext);
}

export function GlobalContextProvider(props) {
  const { sitecoreContext } = useSitecoreContext();
  const { isDesktopLayout: isDesktopLayoutProp } = sitecoreContext;
  const { children, locale, activeLinkID } = props;
  const [pageData, setPageData] = useState({});
  const [isNavigationSubMenuOpen, setIsNavigationSubMenuOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);

  // const isDesktopLayout = useMediaQuery('(min-width:769px)');
  const [isDesktopLayout, setIsDesktopLayout] = useState(isDesktopLayoutProp);
  const isDesktopLayoutMedia = useMediaQuery('(min-width:769px)');
  const isUnderIpadLayout = useMediaQuery('(max-width:1024px)');

  useEffect(() => {
    if (isDesktopLayoutMedia !== undefined) {
      setIsDesktopLayout(isDesktopLayoutMedia);
    }
  }, [isDesktopLayoutMedia]);

  useEffect(() => {
    if (isDesktopLayout) {
      Aos.init({
        once: true,
      });
    }
  }, [isDesktopLayout]);
  // useEffect(() => {
  //   const userCookie = Cookie.get('userCookie');
  //   if (!!!userCookie) {
  //     const uniqueUUID = uuid();
  //     Cookie && Cookie.set('userCookie', uniqueUUID, { expires: 1 });
  //   }
  // }, []);

  return (
    <globalContext.Provider
      value={{
        locale,
        pageData,
        setPageData,
        isDesktopLayout,
        isUnderIpadLayout,
        activeLinkID,
        isNavigationSubMenuOpen,
        setIsNavigationSubMenuOpen,
        searchOpen,
        setSearchOpen,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}
