import GlobalStructure from 'subComponents/GlobalStructure';
import styles from './styles.module.scss';
import clsx from 'clsx';
import TitleComponent from 'subComponents/TitleComponent';
import TextComponent from 'subComponents/TextComponent';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

export const Sitemap = (props) => {
  const { fields, params } = props;
  const { Styles: paddingStyles } = params;
  const { sitecoreContext } = useSitecoreContext();
  const pageTitle =
    sitecoreContext?.route?.fields?.title || sitecoreContext?.route?.fields?.NavigationTitle;
  const { Children, Href, Id, NavigationTitle, Querystring, Styles } = fields[0];
  const shouldRenderPageTitle = !!pageTitle?.value;
  const shouldRenderNavigationTitle = !!NavigationTitle?.value;
  const shouldRenderChildren = !!Children?.length;
  // const customStyles = clsx(styles.classFromModule, ...Styles);
  return (
    <GlobalStructure className={styles['SitemapComponent']} paddingClass={paddingStyles}>
      <div className={styles['intro-section']}>
        {shouldRenderPageTitle && (
          <TitleComponent field={pageTitle} className={styles['main-title']} />
        )}
        {/* {shouldRenderLastUpdated && (
          <p className={styles["last-updated"]}>{lastUpdated}</p>
        )} */}
      </div>
      <div className={styles['grid-container']}>
        {shouldRenderNavigationTitle && (
          <a
            {...{ href: Href }}
            className={clsx(styles['link'], styles['span_all'])}
            aria-label={NavigationTitle?.value}
          >
            <TitleComponent field={NavigationTitle} className={clsx(styles['title'])} />
          </a>
        )}
        {shouldRenderChildren &&
          Children?.map((item, i) => {
            const { Children, Href, Id, NavigationTitle, Querystring, Styles } = item;
            const shouldRenderMainSectionTitle = !!NavigationTitle?.value;
            const isSubPages = !!Children?.length;

            if (isSubPages) {
              return (
                <div key={i} className={styles['sub-container']}>
                  {/* {shouldRenderMainSectionTitle && (
                    <TitleComponent field={NavigationTitle} className={clsx(styles['title'])} />
                  )} */}
                  {shouldRenderMainSectionTitle && (
                    <a
                      {...{ href: Href }}
                      className={clsx(styles['link'])}
                      aria-label={NavigationTitle?.value}
                    >
                      <TextComponent field={NavigationTitle} className={clsx(styles['title'])} />
                    </a>
                  )}
                  {Children?.map((item, i) => {
                    const { Children, Href, Id, NavigationTitle, Querystring, Styles } = item;
                    const shouldRenderTitle = !!NavigationTitle?.value;

                    return (
                      shouldRenderTitle && (
                        <a
                          key={i}
                          {...{ href: Href }}
                          className={clsx(styles['link'])}
                          aria-label={NavigationTitle?.value}
                        >
                          <TextComponent
                            field={NavigationTitle}
                            className={clsx(styles['title'], styles['normal-title'])}
                          />
                        </a>
                      )
                    );
                  })}
                </div>
              );
            }
            return (
              <a
                key={i}
                {...{ href: Href }}
                className={clsx(styles['link'])}
                aria-label={NavigationTitle?.value}
              >
                <TitleComponent field={NavigationTitle} className={clsx(styles['title'])} />
              </a>
            );
          })}
      </div>
    </GlobalStructure>
  );
};
