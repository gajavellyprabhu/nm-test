'use client';
import styles from './styles.module.scss';
import clsx from 'clsx';
import ImageRenderer from 'subComponents/ImageRenderer';
import { useCallback, useEffect, useState } from 'react';
import { useGlobalContext } from 'globalContext/context';
import { Placeholder, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import TextComponent from 'subComponents/TextComponent';
import Button from 'subComponents/Button';
import { useRouter } from 'next/router';
import TitleComponent from 'subComponents/TitleComponent';
import { useMediaQuery } from '@mui/material';
import Cookie from 'js-cookie';

// const BreadCrumb = (props) => {
//   const scrolledRef = useRef(false);
//   const pathname = useHash();

//   useEffect(() => {
//     if (!!pathname && !scrolledRef.current) {
//       const id = pathname;
//       setTimeout(() => {
//         const element = document.getElementById(id);
//         if (element) {
//           element?.scrollIntoView({ behavior: 'smooth' });
//           scrolledRef.current = true;
//         }
//       }, 1500);
//     }
//   }, [pathname]);

//   const { breadCrumbsData, desktopLogo, submenuOpen } = props;
//   return (
//     !!breadCrumbsData?.length && (
//       <div className={clsx('component-wrapper', styles['breadcrumbs-wrapper'])}>
//         {!submenuOpen && (
//           <div
//             className={clsx(
//               styles['inner-breadcrumbs'],
//               'component-content no-paddding',
//               'flex-it flex-align-item-center'
//             )}
//           >
//             {!!desktopLogo.imageSource && (
//               <ImageRenderer
//                 alt={desktopLogo.alt}
//                 src={desktopLogo.imageSource}
//                 className={clsx(styles['hidden-breadcrumb-image'], styles['navbar-logo'])}
//               />
//             )}
//             <div className={clsx(styles['links-wrapper'], 'flex-it flex-align-item-center')}>
//               <a href={desktopLogo?.href} className={styles['home-link']}>
//                 <ImageRenderer src="/images/home-icon.svg" />
//               </a>

//               {breadCrumbsData?.map((item, i) => {
//                 const { title, href } = item;
//                 return (
//                   <Fragment key={i}>
//                     <ImageRenderer
//                       width="6"
//                       height="10"
//                       renderSVG
//                       src="/images/breadcrumb-arrow.svg"
//                     />
//                     <div className="flex-it flex-align-item-center">
//                       <a
//                         href={href}
//                         className={clsx(
//                           styles['breadrumb-link'],
//                           breadCrumbsData?.length == 1 && styles['single-breadcrumb']
//                         )}
//                       >
//                         {title}
//                       </a>
//                     </div>
//                   </Fragment>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   );
// };

export const Default = (props) => {
  const isDesktopLayout = useMediaQuery('(min-width:1025px)');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubLinks, setActiveSubLinks] = useState([]);
  const [activeLink, setActiveLink] = useState(null);
  const [hovered, setHovered] = useState(false);
  const { sitecoreContext } = useSitecoreContext();
  const { route } = sitecoreContext;
  // const { pageData,  activeLinkID } = useGlobalContext();
  const {
    activeLinkID,
    locale,
    isNavigationSubMenuOpen,
    setIsNavigationSubMenuOpen,
    searchOpen,
    setSearchOpen,
  } = useGlobalContext();
  const router = useRouter();
  const { pathname } = router;

  const languageHref =
    sitecoreContext?.language === sitecoreContext?.languages?.en
      ? pathname.replace(sitecoreContext?.languages?.en, sitecoreContext?.languages?.ar)
      : pathname.replace(sitecoreContext?.languages?.ar, sitecoreContext?.languages?.en);

  const arrowRight =
    sitecoreContext?.language === sitecoreContext?.languages?.en.replaceAll('/', '')
      ? 'ArrowRight'
      : 'ArrowLeft';
  const arrowLeft =
    sitecoreContext?.language === sitecoreContext?.languages?.en.replaceAll('/', '')
      ? 'ArrowLeft'
      : 'ArrowRight';
  // const { innerPage, breadCrumbsData } = pageData;
  const { fields, params } = props;
  const {
    desktopLogo,
    // mobileLogo,
    // items,
    extraNavLink,
    languageLink,
    // burgerMenu,
    // mobileCloseIcon,
    //
    featuredLinks,
    link,
    logo,
    logoMobile,
    headerLinks,
    languageSelectors,
  } = fields;
  const shouldAlwaysBeSticky = route?.fields?.styles?.value?.includes('search-page-layout');
  // useEffect(() => {
  //   console.log('languageHref,', languageHref);
  // }, [languageHref]);
  // useEffect(() => {
  //   console.log('languageLink,', languageLink);
  // }, [languageLink]);

  const { isBackgroundTransparent } = params;
  const { languages } = sitecoreContext;
  const arrayLanguages = Object.keys(languages);

  // const handleChangeLanguage = (navLocale) => {
  //   const isNavLocaleExistingPage = arrayLanguages?.some((item) => item === navLocale);
  //   // console.log('navLocale', navLocale);
  //   // console.log('locale', locale);
  //   if (isNavLocaleExistingPage && navLocale !== locale) {
  //     //   debugger;
  //     // return router.replace(locale, navLocale);
  //     router.replace(
  //       {
  //         route: router.pathname,
  //         query: router.query,
  //       },
  //       router.asPath,
  //       { locale: navLocale }
  //     );
  //   }
  // };
  const languageHrefVar = sitecoreContext?.language !== 'en' ? 'en' : 'ar';
  const handleChangeUrl = (url) => {
    Cookie.set('murabba-site#lang', languageHrefVar);
    window.location.href = url;
  };

  const shouldRenderLogo = logo?.value?.src;
  const shouldRenderLogoMobile = !isDesktopLayout && logoMobile?.value?.src;

  const handleMouseEnter = (e, i, id) => {
    if (i === -1) return;
    setActiveSubLinks(headerLinks?.[i]?.items); // fix
    setIsNavigationSubMenuOpen(true);
    setActiveLink(id);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setActiveSubLinks([]);
    setIsNavigationSubMenuOpen(false);
    setActiveLink(null);
    setHovered(false);
  };

  const handleKeyDown = (e, i, id) => {
    if (e.key === 'Home') {
      e.preventDefault();
      document.activeElement?.parentElement?.firstChild?.focus({
        focusVisible: true,
      });
    }

    if (e.key === 'End') {
      let myArray = document.activeElement?.parentElement?.children;
      e.preventDefault();
      const lastElement = myArray[myArray.length - 1];
      lastElement?.focus({ focusVisible: true });
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleMouseEnter(e, i, id);
      document.querySelector('.navbar-sublink:first-child')?.focus({ focusVisible: true });
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleMouseLeave();
    }

    if (e.key === arrowLeft) {
      if (i === 0) {
        e.preventDefault();
        document.getElementById(`${id}`)?.focus({ focusVisible: true });
      } else {
        let prev = document.getElementById(`${id}`)?.previousSibling;
        if (!!prev) {
          prev?.focus({ focusVisible: true });
        } else {
          let newPreviousElement = document.activeElement?.previousSibling;
          newPreviousElement?.focus({
            focusVisible: true,
          });
        }
      }
    } else if (e.key === arrowRight) {
      if (i <= length) {
        let nextSibling = document.getElementById(`${id}`)?.nextElementSibling;
        if (nextSibling?.classList.contains('gbl-main-link')) {
          nextSibling = nextSibling?.firstElementChild;
          nextSibling?.focus({ focusVisible: true });
          e.preventDefault();
        } else {
          document.activeElement?.nextElementSibling?.focus({ focusVisible: true });
          e.preventDefault();
        }
      }
    }
  };
  useEffect(() => {
    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
        document.body.style.overflow = 'visible';
        document.body.classList.remove('body-overflow-type');
      }
    });
  }, []);

  const handleSubmenuKeyDown = (e, i, length) => {
    if (e.key === 'Home') {
      e.preventDefault();
      document.activeElement?.parentElement?.parentElement?.firstChild?.firstChild?.focus({
        focusVisible: true,
      });
    }

    //  navbar-sublinks
    if (e.key === 'End') {
      let myArray = document.activeElement?.parentElement?.parentElement?.children;
      e.preventDefault();
      const lastElement = myArray[myArray.length - 1];
      lastElement?.firstChild?.focus({ focusVisible: true });
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      document.getElementById(`${activeLink}`)?.focus({ focusVisible: true });
      handleMouseLeave();
      return '';
    }

    if (e.key === 'ArrowUp') {
      // console.log('shiftKey key length -1', length - 1);
      if (i === 0) {
        e.preventDefault();
        handleMouseLeave();
        document.getElementById(`${activeLink}`)?.focus({ focusVisible: true });
      } else {
        document.activeElement?.parentElement?.previousSibling?.firstChild?.focus({
          focusVisible: true,
        });
      }
    } else if (e.key === 'ArrowDown') {
      if (i <= length - 1) {
        e.preventDefault();
        document.activeElement?.parentElement?.nextElementSibling?.firstChild?.focus({
          focusVisible: true,
        });

        // document.getElementById(`${activeLink}`)?.nextElementSibling?.focus({ focusVisible: true });
      } else {
        e.preventDefault();
        handleMouseLeave();
      }
      // document.querySelectorAll('.gbl-header-link')[i + 1]?.focus({ focusVisible: true });
    }
  };

  const handleMouseEnterFeatured = (e, id, shouldSkipHoverPopUp) => {
    if (shouldSkipHoverPopUp) {
      setIsNavigationSubMenuOpen(false);
    }
    setHovered(true);
    setActiveLink(id);
  };

  // Handling scrolling

  const [y, setY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(0);

  const handleNavigation = useCallback(
    (e) => {
      const scrollY = window.scrollY;
      if (y > scrollY) {
        setScrollDirection(1);
      } else if (y < scrollY) {
        setScrollDirection(-1);
      }

      if (scrollY === 0) {
        setScrollDirection(0);
      }
      setY(scrollY);
      if (shouldAlwaysBeSticky) {
        return setScrollDirection(1);
      }
    },
    [y]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);

  const openPopup = () => {
    setSearchOpen(true);
    setMenuOpen(false);
    // Add any other logic you need when opening the popup
    // For example, you might want to disable scrolling on the body
    document.body.style.overflow = 'hidden';
    document.body.classList.add('body-overflow-type');
  };
  const scrollHeight = isBackgroundTransparent ? 130 : 0;
  return (
    <>
      {!isBackgroundTransparent && scrollDirection > scrollHeight && (
        <div className={styles['headReserve']}></div>
      )}

      {/* {isBackgroundTransparent && scrollDirection > 130 && (
        <div className={styles['headReserve']}></div>
      )} */}
      <header
        className={clsx(
          styles['headerComponent-parent']
          // shouldAlwaysBeSticky && scrollDirection > 0 && styles['sticky'],
          // scrollDirection < 0 && styles['scrolledDown'],
          // scrollDirection > 0 && styles['scrolledUp']
          // scrollDirection === 0 && isBackgroundTransparent && styles['scrolled']
        )}
      >
        {/* {scrollDirection > 130 && <div className={styles['headReserve']}></div>} */}

        <div
          className={clsx(
            styles['headerComponent'],
            !isBackgroundTransparent && styles['inner-page-header'],
            scrollDirection === 0 && isBackgroundTransparent && styles['scrolled'],
            activeLink && isBackgroundTransparent && styles['hovered'],
            (scrollDirection > 0 || menuOpen || searchOpen) && styles['sticky'],
            !menuOpen && scrollDirection < 0 && styles['scrolledDown'],
            !menuOpen && scrollDirection > 0 && styles['scrolledUp']
            // scrollDirection < 0 && styles['sticky']
            // shouldAlwaysBeSticky && styles['sticky-always']
          )}
        >
          <nav className={clsx('component-wrapper flex-it flex-col', styles['menu-nav-top'])}>
            <div className={clsx(styles['nav-bar'], 'component-content no-paddding')}>
              <div className={styles['nav-bar-content']}>
                <div className={styles['navbar-hyperlinks']}>
                  <div className={styles['navbar-logo']}>
                    {!!shouldRenderLogo && (
                      <a href={link?.value?.href} tabIndex={0} aria-label={link?.value?.text}>
                        <ImageRenderer
                          ipadshow={true}
                          className={styles['desktop-logo']}
                          // alt={desktopLogo.alt}
                          // src={desktopLogo.imageSource}
                          desktopSrc={logo}
                        />
                      </a>
                    )}
                    {!!shouldRenderLogoMobile && (
                      <a
                        href={link?.value?.href}
                        aria-label={link?.value?.text}
                        className={styles['link-mobile-logo']}
                        tabIndex={0}
                      >
                        <ImageRenderer
                          ipadshow={true}
                          className={styles['mobile-logo']}
                          // alt={mobileLogo.alt}
                          // src={mobileLogo.imageSource}
                          mobileSrc={logoMobile}
                        />
                      </a>
                    )}
                  </div>

                  <div className={clsx(styles['navbar-links-group'])}>
                    {/* {items?.map(
                  (item, i) =>
                    !!item.text && (
                      <p
                        className={clsx(
                          styles['main-header-link'],
                          pageData.activeLinkID === item.activeLinkID && styles['active-link']
                        )}
                        key={i}
                        onMouseEnter={(e) => handleMouseEnter(e, i)}
                      >
                        {item.text}
                      </p>
                    )
                )} */}
                    {headerLinks?.map((item, i) => {
                      // debugger;
                      const { title, link, titleTag } = item?.fields;
                      const shouldRenderTitle = !!title?.value;
                      // Finding active page
                      var isActivePage = false;
                      if (!!link?.value?.id) {
                        const editedID = link?.value?.id
                          ?.replace('{', '')
                          ?.replace('}', '')
                          ?.toLowerCase();
                        isActivePage = editedID === activeLinkID; // if it is a link
                      } else {
                        const editedID = item?.id
                          ?.replace('{', '')
                          ?.replace('}', '')
                          ?.toLowerCase();
                        isActivePage = editedID === activeLinkID; // if not a link
                      }
                      // to check if parent of active page
                      item?.items?.forEach((subItem) => {
                        const { link } = subItem?.fields;
                        if (!isActivePage) {
                          if (!!link?.value?.id) {
                            const editedID = link?.value?.id
                              ?.replace('{', '')
                              ?.replace('}', '')
                              ?.toLowerCase();
                            isActivePage = editedID === activeLinkID; // if it is a link
                          } else {
                            const editedID = subItem?.id
                              ?.replace('{', '')
                              ?.replace('}', '')
                              ?.toLowerCase();
                            isActivePage = editedID === activeLinkID; // if not a link
                          }
                        }
                      });
                      return (
                        <a
                          id={item?.id}
                          key={i}
                          href={link?.value?.href}
                          tabIndex={0}
                          aria-label={link?.value?.text}
                          className={clsx(
                            styles['main-header-link'],
                            'gbl-header-link',
                            !hovered && isActivePage && styles['active-page-link'],
                            activeLink === item?.id && styles['active-link']
                          )}
                          onMouseEnter={(e) => handleMouseEnter(e, i, item?.id)}
                          onKeyDown={(e) => handleKeyDown(e, i, item?.id)}
                        >
                          {shouldRenderTitle && (
                            <TextComponent headingTag={titleTag} field={title} key={i} />
                          )}
                          {featuredLinks?.length && (
                            <span className={styles['link-arrow-container']}>
                              <ImageRenderer
                                className={styles['link-arrow']}
                                icon="/images/arrow_drop_down.svg"
                                width="12"
                                height="12"
                                // icon="/images/ico_chevron_down.svg"
                                // renderSVGInImageTag
                              />
                            </span>
                          )}
                        </a>
                      );
                    })}
                    {featuredLinks?.length && (
                      <>
                        {/* <div
                          className={clsx(styles['featured-header-links'], 'gbl-main-link')}
                          onMouseEnter={() => handleMouseLeave()}
                          onMouseLeave={() => handleMouseLeave()}
                        > */}
                        {featuredLinks?.map((item, i) => {
                          const { link } = item?.fields;

                          // Finding active page
                          var isActivePage = false;
                          if (!!link?.value?.id) {
                            const editedID = link?.value?.id
                              ?.replace('{', '')
                              ?.replace('}', '')
                              ?.toLowerCase();
                            isActivePage = editedID === activeLinkID; // if it is a link
                          } else {
                            const editedID = item?.id
                              ?.replace('{', '')
                              ?.replace('}', '')
                              ?.toLowerCase();
                            isActivePage = editedID === activeLinkID; // if not a link
                          }
                          // to check if parent of active page
                          // item?.items?.forEach((subItem) => {
                          //   const { link } = subItem?.fields;
                          //   if (!isActivePage) {
                          //     if (!!link?.value?.id) {
                          //       const editedID = link?.value?.id
                          //         ?.replace('{', '')
                          //         ?.replace('}', '')
                          //         ?.toLowerCase();
                          //       isActivePage = editedID === activeLinkID; // if it is a link
                          //     } else {
                          //       const editedID = subItem?.id
                          //         ?.replace('{', '')
                          //         ?.replace('}', '')
                          //         ?.toLowerCase();
                          //       isActivePage = editedID === activeLinkID; // if not a link
                          //     }
                          //   }
                          // });
                          return (
                            // <a
                            //   className={
                            //     pageData?.activeLinkID === extraNavLink?.activeLinkID
                            //       ? styles['active-link']
                            //       : ''
                            //   }
                            //   href={link?.href}
                            // >
                            //   {extraNavLink?.text}
                            // </a>
                            <Button
                              id={item?.id}
                              link={link}
                              key={i}
                              tabIndex={0}
                              onMouseEnter={(e) => handleMouseEnterFeatured(e, item?.id, true)}
                              onKeyDown={(e) => handleKeyDown(e, -1, item?.id)}
                              className={clsx(
                                styles['featured-header-link'],
                                'gbl-header-link',
                                activeLink === item?.id && styles['active-link'],
                                !hovered && isActivePage && styles['active-page-link']
                              )}
                            />
                          );
                        })}
                        {/* </div> */}
                      </>
                    )}
                  </div>
                </div>
                <div className={styles['langs-burger-container']}>
                  {!!languageLink?.text && (
                    <div className={styles['langs-container-main-navigation']}>
                      <div
                        // href={languageHref}
                        className={clsx(styles['foreign-language'], 'gbl-header-link')}
                        tabIndex={0}
                        aria-label={languageLink.text}
                        onClick={() => handleChangeUrl(languageHref)}
                      >
                        {languageLink.text}
                      </div>
                    </div>
                  )}

                  {languageSelectors?.map((item, i) => {
                    const { code, title } = item?.fields;
                    const isNavLocaleExistingPage = arrayLanguages?.some(
                      (item) => item === code?.value
                    );
                    const shouldShowLanguage = isNavLocaleExistingPage && locale !== code?.value;

                    const languageHref =
                      sitecoreContext?.language !== 'en'
                        ? sitecoreContext?.languages?.en
                        : sitecoreContext?.languages?.ar;
                    return (
                      shouldShowLanguage && (
                        <div className={styles['langs-container-main-navigation']} key={i}>
                          <div
                            aria-label={title?.value}
                            // href={languageHref}
                            className={styles['foreign-language']}
                            tabIndex={0}
                            onClick={() => handleChangeUrl(languageHref)}
                          >
                            {title?.value}
                          </div>
                        </div>
                      )
                    );
                  })}
                  <div className={styles['icons-container']}>
                    <span
                      className={clsx(
                        styles['search-box'],
                        styles['icon-search-cadre'],
                        'flex-it flex-align-item-center flex-justify-center',
                        !!searchOpen && styles['open-menu']
                      )}
                      onClick={() => {
                        openPopup();
                        setMenuOpen(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          openPopup();
                          setMenuOpen(false);
                        }
                      }}
                      tabIndex={0}
                    >
                      <ImageRenderer
                        icon="/images/ico_search.svg"
                        renderSVGInImageTag
                        className={styles['search-icon']}
                      />
                    </span>
                    {/* {!!burgerMenu?.imageSource && ( */}
                    {/* {!menuOpen && ( */}
                    <button
                      onClick={() => {
                        setMenuOpen(true);
                        setSearchOpen(false);
                      }}
                      onKeyDown={(e) => {
                        let time = 0;
                        clearTimeout(time);
                        if (e.key === 'Enter') {
                          time = setTimeout(() => {
                            document.querySelector('.gbl-nav-bar-mobile a').focus();
                          }, 100);
                        }
                      }}
                      className={styles['burger-menu']}
                      tabIndex={0}
                    >
                      <ImageRenderer
                        icon="/images/burger-menu.svg"
                        width={32}
                        renderSVGInImageTag
                      />
                    </button>
                    {/* )} */}
                    {/* )} */}
                    {/*
                    {menuOpen && (
                      <button onClick={() => setMenuOpen(false)} className={styles['burger-menu']}>
                        <ImageRenderer
                          className={styles['close-icon']}
                          alt="close-button"
                          icon="/images/close-button.svg"
                          renderSVGInImageTag
                        />
                      </button>
                    )} */}
                  </div>
                </div>
                <div className={styles['navbar-news-letter-wrapper']}>
                  <div className={styles['navbar-news-letter-content']}>
                    {/* {!!languageLink?.text && (
                  <div className={styles['langs-container']}>
                    <a href={languageHref} className={styles['foreign-language']}>
                      {languageLink?.text}
                    </a>
                  </div>
                )} */}

                    {languageSelectors?.map((item, i) => {
                      const { code, title } = item?.fields;
                      // const isLocaleAvailable = languageSelectors?.find(
                      //   (item) => item?.field?.code?.value === locale
                      // );

                      // const shouldShowLanguage = isLocaleAvailable
                      // ? locale !== code?.value
                      const isNavLocaleExistingPage = arrayLanguages?.some(
                        (item) => item === code?.value
                      );
                      const shouldShowLanguage = isNavLocaleExistingPage && locale !== code?.value;

                      const languageHref =
                        sitecoreContext?.language !== 'en'
                          ? sitecoreContext?.languages?.en
                          : sitecoreContext?.languages?.ar;
                      return (
                        shouldShowLanguage && (
                          <div className={styles['langs-container']} key={i}>
                            <div
                              aria-label={title?.text}
                              // href={languageHref}
                              className={styles['foreign-language']}
                              tabIndex={0}
                              onClick={() => handleChangeUrl(languageHref)}
                            >
                              {title?.value}
                            </div>
                            {/* <TextComponent
                          field={title}
                          className={styles['foreign-language']}
                          onClick={() => handleChangeLanguage(code?.value)}
                        /> */}
                          </div>
                        )
                      );
                    })}

                    <span
                      tabIndex={0}
                      className={clsx(
                        styles['navbar-news-letter-divider'],
                        styles['icon-search-cadre'],
                        styles['search-box'],
                        !!searchOpen && styles['open-menu'],
                        'flex-it flex-align-item-center flex-justify-center'
                      )}
                      onClick={() => {
                        openPopup();
                        setMenuOpen(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          openPopup();
                          setMenuOpen(false);
                        }
                      }}
                    >
                      <ImageRenderer
                        icon="/images/ico_search.svg"
                        renderSVGInImageTag
                        className={styles['search-icon']}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div className={styles['breadcrumbs-submenu-wrapper']} tabIndex={-1}>
            {/* <BreadCrumb
          breadCrumbsData={breadCrumbsData}
          desktopLogo={desktopLogo}
          isNavigationSubMenuOpen={isNavigationSubMenuOpen}
        /> */}

            <Placeholder name="header-breadcrumb" rendering={props.rendering} />

            <nav
              className={clsx(
                styles['nav-bar'],
                styles['nav-bar-submenu'],
                isNavigationSubMenuOpen && styles['submenu-open'],
                'component-wrapper'
              )}
            >
              <div
                onMouseLeave={(e) => handleMouseLeave()}
                className={'component-content no-paddding flex-it'}
              >
                {!!shouldRenderLogo && (
                  <div className={styles['image-wrap']}>
                    <ImageRenderer
                      // alt={desktopLogo?.alt}
                      // src={desktopLogo?.imageSource}
                      desktopSrc={logo}
                      className={clsx(styles['hidden-image'], styles['navbar-logo'])}
                    />
                  </div>
                )}
                <div className={styles['navbar-sublinks']}>
                  {activeSubLinks?.map((item, i) => {
                    const { link } = item?.fields;
                    const shouldRenderLink = !!link?.value?.href;
                    // debugger;
                    return (
                      shouldRenderLink && (
                        // <a key={i} href={item.href}>
                        //   {item.text}
                        // </a>
                        <span
                          onKeyDown={(e) => handleSubmenuKeyDown(e, i, activeSubLinks?.length)}
                          key={i}
                        >
                          <Button
                            className={clsx(styles['navbar-sublink'], 'navbar-sublink')}
                            link={link}
                            key={i}
                            tabIndex={0}
                          />
                        </span>
                      )
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>

          <nav
            className={clsx(
              styles['mobile-nav-container'],
              menuOpen && styles['mobile-nav-open'],
              'component-wrapper flex-it flex-col'
            )}
          >
            <div
              className={clsx(
                styles['nav-bar'],
                styles['logo-burger-mobile'],
                'component-content no-paddding'
              )}
            >
              <div className={styles['nav-bar-content']}>
                <div className={styles['navbar-hyperlinks']}>
                  <div className={styles['navbar-logo']}>
                    {shouldRenderLogo && (
                      <a href={desktopLogo?.href} tabIndex={0} aria-label={desktopLogo?.text}>
                        <ImageRenderer
                          className={styles['desktop-logo']}
                          // alt={desktopLogo?.alt}
                          ipadshow={true}
                          desktopSrc={logo}
                        />
                      </a>
                    )}
                    {shouldRenderLogoMobile && (
                      <a href={link?.value?.href} aria-label={link?.value?.text} tabIndex={0}>
                        <ImageRenderer
                          ipadshow={true}
                          className={styles['mobile-logo']}
                          // alt={mobileLogo?.alt}
                          mobileSrc={logoMobile}
                        />
                      </a>
                    )}
                  </div>
                </div>

                <div className={styles['langs-burger-container']}>
                  {!!languageLink?.text && (
                    <div className={styles['langs-container']}>
                      <div
                        // href={languageHref}
                        aria-label={languageLink?.text}
                        className={styles['foreign-language']}
                        onClick={() => handleChangeUrl(languageHref)}
                      >
                        {languageLink?.text}
                      </div>
                    </div>
                  )}

                  {languageSelectors?.map((item, i) => {
                    const { code, title } = item?.fields;
                    const isNavLocaleExistingPage = arrayLanguages?.some(
                      (item) => item === code?.value
                    );
                    const shouldShowLanguage = isNavLocaleExistingPage && locale !== code?.value;

                    const languageHref =
                      sitecoreContext?.language !== 'en'
                        ? sitecoreContext?.languages?.en
                        : sitecoreContext?.languages?.ar;
                    return (
                      shouldShowLanguage && (
                        <div className={styles['langs-container']} key={i}>
                          <div
                            // href={languageHref}
                            aria-label={title?.value}
                            className={styles['foreign-language']}
                            onClick={() => handleChangeUrl(languageHref)}
                          >
                            {title?.value}
                          </div>
                        </div>
                      )
                    );
                  })}
                  <div className={styles['icons-container']}>
                    <span
                      tabIndex={0}
                      className={clsx(
                        styles['search-box'],
                        styles['icon-search-cadre'],
                        'flex-it flex-align-item-center flex-justify-center',
                        !!searchOpen && styles['open-menu']
                      )}
                      onClick={() => {
                        openPopup();
                        setMenuOpen(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          openPopup();
                          setMenuOpen(false);
                        }
                      }}
                    >
                      <ImageRenderer
                        icon="/images/ico_search.svg"
                        renderSVGInImageTag
                        className={styles['search-icon']}
                      />
                    </span>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setSearchOpen(false);
                        document.body.style.overflow = 'visible';
                        document.body.classList.remove('body-overflow-type');
                      }}
                      // onKeyDown={(e) => {
                      //   setMenuOpen(false);
                      //   setSearchOpen(false);
                      //   document.body.style.overflow = 'visible';
                      //   document.body.classList.remove('body-overflow-type');
                      // }}
                      className={styles['burger-menu']}
                    >
                      <ImageRenderer
                        className={styles['close-icon']}
                        alt="close-button"
                        width={32}
                        icon="/images/close-button.svg"
                        renderSVGInImageTag
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Placeholder name="header-breadcrumb" rendering={props.rendering} />{' '}
            <div
              className={clsx(
                styles['nav-bar'],
                styles['nav-bar-mobile'],
                'gbl-nav-bar-mobile',
                'component-content small-padding'
              )}
            >
              <div className={styles['navbar-links-group-mobile']}>
                {/* {items?.map((item, i) => {
              return (
                !!item?.text && (
                  <div className={styles['mobile-menu-links-container']} key={i}>
                    <p className={styles['main-header-link']}>{item.text}</p>
                    <div className={styles['mobile-menu-sublink']}>
                      {!!item?.subItems?.length &&
                        item?.subItems?.map((subItem, index) => {
                          return (
                            <a key={index} href={subItem?.href}>
                              {subItem.text}
                            </a>
                          );
                        })}
                    </div>
                  </div>
                )
              );
            })} */}
                {headerLinks?.map((item, i) => {
                  const { items, fields } = item;
                  const { title, link } = fields;
                  const shouldRenderTitle = !!title?.value;
                  const shouldRenderItems = !!items?.length;

                  return (
                    <div className={styles['mobile-menu-links-container']} key={i}>
                      {/* {shouldRenderTitle && <p className={styles['main-header-link']}>{item.text}</p>} */}
                      {shouldRenderTitle && (
                        <span>
                          <a
                            href={link?.value?.href}
                            aria-label={link?.value?.text}
                            className={styles['main-header-link']}
                          >
                            <TitleComponent field={title} />
                          </a>
                        </span>
                      )}

                      <div className={styles['mobile-menu-sublink']}>
                        {shouldRenderItems &&
                          items?.map((_item, _i) => {
                            const { link } = _item?.fields;
                            return (
                              // <a key={index} href={subItem?.href}>
                              //   {subItem.text}
                              // </a>
                              <Button link={link} key={_i} tabIndex={0} />
                            );
                          })}
                      </div>
                    </div>
                  );
                })}

                {featuredLinks?.length && (
                  <>
                    {/* <div
                     className={clsx(styles['featured-header-links'], 'gbl-main-link')}
                     onMouseEnter={() => handleMouseLeave()}
                     onMouseLeave={() => handleMouseLeave()}
                   > */}
                    {featuredLinks?.map((item, i) => {
                      const { link } = item?.fields;
                      return (
                        // <a
                        //   className={
                        //     pageData?.activeLinkID === extraNavLink?.activeLinkID
                        //       ? styles['active-link']
                        //       : ''
                        //   }
                        //   href={link?.href}
                        // >
                        //   {extraNavLink?.text}
                        // </a>
                        <div
                          className={clsx(
                            styles['mobile-menu-sublink'],
                            'flex-it flex-align-item-center',
                            styles['mobile-menu-sublink-feature']
                          )}
                          key={i}
                        >
                          <Button
                            link={link}
                            onMouseEnter={(e) => handleMouseEnterFeatured(e, item?.id)}
                          />
                        </div>
                      );
                    })}
                    {/* </div> */}
                  </>
                )}

                {/* <Placeholder name="header-navigation" rendering={props.rendering} /> */}

                {!!extraNavLink?.href && (
                  <a
                    className={styles['extra-link']}
                    aria-label={extraNavLink?.text}
                    href={extraNavLink?.href}
                  >
                    {extraNavLink?.text}
                  </a>
                )}
              </div>
            </div>
          </nav>
        </div>
        {searchOpen && <Placeholder name="header-global-search" rendering={props.rendering} />}
      </header>
    </>
  );
};
