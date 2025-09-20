import React, { Fragment } from 'react';
import styles from 'pageComponents/MainNavigation/styles.module.scss';
import TextComponent from 'subComponents/TitleComponent';
import clsx from 'clsx';
import ImageRenderer from 'subComponents/ImageRenderer';
import { useGlobalContext } from 'globalContext/context';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

export const Default = (props) => {
  const { sitecoreContext } = useSitecoreContext();
  const NavigationTitle = sitecoreContext?.route?.fields?.NavigationTitle;
  const { isNavigationSubMenuOpen } = useGlobalContext();
  // const scrolledRef = useRef(false);
  // const pathname = useHash();

  // useEffect(() => {
  //   if (!!pathname && !scrolledRef.current) {
  //     const id = pathname;
  //     setTimeout(() => {
  //       const element = document.getElementById(id);
  //       if (element) {
  //         element?.scrollIntoView({ behavior: 'smooth' });
  //         scrolledRef.current = true;
  //       }
  //     }, 1500);
  //   }
  // }, [pathname]);

  // const { breadCrumbsData, desktopLogo, submenuOpen } = props;
  const { items } = props?.fields;
  const itemsSubstractedHomePage = items?.slice(1, items?.length);
  // const truncateText = (text) => {
  //   const truncatedText = text?.value?.length > 24 ? text?.value.slice(0, 24) + '...' : text?.value;

  //   return truncatedText;
  // };

  return (
    !!items?.length && (
      <div className={clsx('component-wrapper', styles['breadcrumbs-wrapper'])}>
        {!isNavigationSubMenuOpen && (
          <div
            className={clsx(
              styles['inner-breadcrumbs'],
              'component-content no-paddding',
              'flex-it flex-align-item-center'
            )}
          >
            {/* {!!desktopLogo.imageSource && (
              <ImageRenderer
                alt={desktopLogo.alt}
                src={desktopLogo.imageSource}
                className={clsx(styles['hidden-breadcrumb-image'], styles['navbar-logo'])}
              />
            )} */}
            <div
              style={{ flex: '0 0 162px' }}
              className={clsx(styles['hidden-breadcrumb-image'], styles['navbar-logo'])}
            />

            <div className={clsx(styles['links-wrapper'], 'flex-it flex-align-item-center')}>
              <a
                href={items?.[0]?.url}
                className={styles['home-link']}
                aria-label={NavigationTitle}
              >
                <ImageRenderer icon="/images/home-icon.svg" renderSVGInImageTag />
              </a>

              {itemsSubstractedHomePage?.map((item, i) => {
                // const { title, href } = item;
                const { fields, url } = item;
                const { NavigationTitle } = fields;
                const shouldRenderTitle = !!NavigationTitle?.value;
                const shouldRenderUrl = !!url;
                const shouldRenderSection = shouldRenderTitle && shouldRenderUrl;
                return (
                  shouldRenderSection && (
                    <Fragment key={i}>
                      <ImageRenderer width="6" height="10" icon="/images/breadcrumb-arrow.svg" />
                      <a
                        aria-label={NavigationTitle}
                        href={url}
                        className={clsx(
                          styles['breadcrumb-link'],
                          items?.length == 1 && styles['single-breadcrumb']
                        )}
                      >
                        <TextComponent
                          field={NavigationTitle}
                          // field={{ value: NavigationTitle }}
                          headingTag={{ value: 'span' }}
                        />
                      </a>
                    </Fragment>
                  )
                );
              })}
              <Fragment>
                <ImageRenderer width="6" height="10" icon="/images/breadcrumb-arrow.svg" />
                <TextComponent
                  className={clsx(styles['breadcrumb-link'], styles['navigation-link'])}
                  field={NavigationTitle}
                  // field={{ value: NavigationTitle }}
                  headingTag={{ value: 'span' }}
                />
              </Fragment>
            </div>
          </div>
        )}
      </div>
    )
  );
};
