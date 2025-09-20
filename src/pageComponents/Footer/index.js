import styles from './styles.module.scss';
import clsx from 'clsx';
import ImageRenderer from 'subComponents/ImageRenderer';
import GlobalStructure from 'subComponents/GlobalStructure';
import Button from 'subComponents/Button';
import TextComponent from 'subComponents/TextComponent';
import { Fragment } from 'react';

export const Default = (props) => {
  const { fields, params } = props;
  const { Styles } = params;
  const {
    // logoLinkPIF,
    murabbaIcon,
    pifIcon,
    // socialMedia,
    // termsAndConditions,
    // hyperLinks,
    // singleLinks,
    //
    copyrightLinks,
    copyrightText,
    footerLinks,
    logos,
    socialLinks,
    featuredLinks,
  } = fields;
  // const footerLinksSubLinks = footerLinks?.filter((item) => item?.items?.length > 0);
  // const footerLinksSingleLinkss = footerLinks?.filter((item) => !!!item?.items?.length);
  const footerLinksSubLinks = footerLinks;
  const footerLinksSingleLinkss = featuredLinks;
  const footerLinksSubLinksMid = Math.floor((footerLinksSubLinks.length + 1) / 2);

  // Divide the array into two parts
  const footerLinksSubLinksFirstHalf = footerLinksSubLinks.slice(0, footerLinksSubLinksMid);
  const footerLinksSubLinksSecondHalf = footerLinksSubLinks.slice(footerLinksSubLinksMid);

  // const shouldRenderTermsAndConditions = !!termsAndConditions?.items?.length;

  const shouldRenderSocialMedia = !!socialLinks?.items?.length;
  // const shouldRenderLogoLinkPIF = !!logoLinkPIF?.href;
  // const shouldRenderPifIcon = !!pifIcon?.desktopSrc;
  // const shouldRenderMurabbaIcon = !!murabbaIcon?.desktopSrc;

  const shouldRenderLogos = logos?.items?.length;
  // const isBothLogos = shouldRenderMurabbaIcon && shouldRenderPifIcon;
  const shouldRenderSocialMediaTitle = !!socialLinks?.fields?.title;

  return (
    <GlobalStructure
      className={styles['footerComponent']}
      isFullWidth
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      <div className={styles['footer-content']}>
        <div className="component-wrapper">
          <div className="component-content">
            <div className={styles['logos-links-socials']}>
              {shouldRenderLogos && (
                <div className={styles['logos']}>
                  {/* {shouldRenderMurabbaIcon && (
                    <ImageRenderer
                      className={styles['main_logo']}
                      desktopSrc={murabbaIcon?.desktopSrc}
                      mobileSrc={murabbaIcon?.mobileSrc}
                      alt="Footer_Gold_Murabba_Logo"
                    />
                  )}
                  {isBothLogos && <span />}
                  {shouldRenderPifIcon && (
                    <a
                      href={logoLinkPIF?.href}
                      target="_blank"
                      className={styles['secondary_logo']}
                    >
                      <ImageRenderer
                        desktopSrc={pifIcon?.desktopSrc}
                        mobileSrc={pifIcon?.mobileSrc}
                        alt="Footer_PIF_Logo"
                      />
                    </a>
                  )} */}
                  {logos?.items?.map((item, i) => {
                    const { logo, logoMobile, link } = item?.fields;
                    const shouldWrapWithLink = !!link?.value?.href;
                    const isFirstLogo = i === 0;
                    const ImageComponent = () => {
                      return (
                        <ImageRenderer
                          key={i}
                          className={clsx(styles['main_logo'])}
                          desktopSrc={logo}
                          mobileSrc={logoMobile}
                        />
                      );
                    };

                    return (
                      <Fragment key={i}>
                        {!isFirstLogo && <span />}
                        {shouldWrapWithLink ? (
                          <a
                            aria-label={link?.value?.text}
                            href={link?.value?.href}
                            // target="_blank"
                            {...(link?.value?.target === '_blank'
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : {})}
                            className={clsx(
                              !isFirstLogo && styles['secondary_logo'],
                              styles['image_link']
                            )}
                          >
                            <ImageComponent />
                          </a>
                        ) : (
                          <ImageComponent />
                        )}
                      </Fragment>
                    );
                  })}
                </div>
              )}
              <div className={styles['hyperlinks_parent']}>
                <div className={styles['hyperlinks_container']}>
                  <div className={styles['hyperlinks_sub_container']}>
                    <div className={styles['hyperlinks_container']}>
                      {/* {hyperLinks?.map((item, i) => {
                        const { items, title, link } = item;
                        const isHref = !!link;
                        return (
                          <div
                            key={i}
                            className={clsx(styles['section_parent'], styles['big_width'])}
                          >
                            <a
                              className={clsx(
                                styles['title'],
                                styles['link_effect'],
                                !isHref && styles['no-hover-effect']
                              )}
                              href={link}
                            >
                              {title}
                            </a>
                            {items?.map((_item, _i) => {
                              const { text, link } = _item;
                              return (
                                <div key={_i} className={styles['sub_section']}>
                                  <div className={styles['border_left']} />
                                  <a className={styles['link_effect']} href={link}>
                                    {text}
                                  </a>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })} */}
                      <div className={clsx(styles['first_section'])}>
                        {footerLinksSubLinksFirstHalf?.map((item, i) => {
                          const { items, fields } = item;
                          const { title, link } = fields;
                          const isHref = !!link?.value?.href;
                          return (
                            <div
                              key={i}
                              className={clsx(styles['section_parent'], styles['big_width'])}
                            >
                              <Button
                                link={link}
                                className={clsx(
                                  styles['title'],
                                  styles['link_effect'],
                                  !isHref && styles['no-hover-effect']
                                )}
                                text={title?.value}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div className={clsx(styles['first_section'])}>
                        {footerLinksSubLinksSecondHalf?.map((item, i) => {
                          const { items, fields } = item;
                          const { title, link } = fields;
                          const isHref = !!link?.value?.href;
                          return (
                            <div
                              key={i}
                              className={clsx(styles['section_parent'], styles['big_width'])}
                            >
                              <Button
                                link={link}
                                className={clsx(
                                  styles['title'],
                                  styles['link_effect'],
                                  !isHref && styles['no-hover-effect']
                                )}
                                text={title?.value}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className={styles['singleLinks_container']}>
                      {footerLinksSingleLinkss?.map((item, i) => {
                        const { link } = item?.fields;
                        const shouldRenderLink = !!link?.value?.href;
                        return (
                          shouldRenderLink && (
                            <div
                              key={i}
                              className={clsx(styles['section_parent'], styles['stand_alone'])}
                            >
                              <div className={styles['border_left']} />
                              <Button
                                link={link}
                                className={clsx(
                                  styles['title'],
                                  styles['second_part'],
                                  styles['link_effect']
                                )}
                              />
                            </div>
                          )
                        );
                      })}
                    </div>
                    {shouldRenderSocialMedia && (
                      <div className={styles['social_links_container']}>
                        {shouldRenderSocialMediaTitle && (
                          // <span className={styles['title']}>{socialMedia?.title}</span>
                          <TextComponent
                            field={socialLinks?.fields?.title}
                            className={styles['title']}
                            headingTag={socialLinks?.fields?.titleTag}
                          />
                        )}
                        <div className={styles['social-images']}>
                          {socialLinks?.items?.map((item, i) => {
                            const { logo, logoMobile, link } = item?.fields;
                            return (
                              <a
                                aria-label={link?.value?.text}
                                key={i}
                                className={clsx(styles['footer-links'])}
                                href={link?.value?.href}
                                target="_blank"
                              >
                                <ImageRenderer
                                  desktopSrc={logo}
                                  mobileSrc={logoMobile}
                                  className={styles['image-logo']}
                                  renderSVG
                                />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['terms-rights']}>
              <div className={styles['terms']}>
                {/* {termsAndConditions?.items?.map((item, i) => {
                  const { text, link } = item;
                  return (
                    <a key={i} href={link} className={styles['terms-link']}>
                      {text}
                    </a>
                  );
                })} */}
                {copyrightLinks?.items?.map((item, i) => {
                  const { link } = item?.fields;
                  return (
                    // <a key={i} href={link} className={styles['terms-link']}>
                    //   {text}
                    // </a>
                    <Button link={link} key={i} className={styles['terms-link']} />
                  );
                })}
              </div>
              <div className={styles['rights']}>
                {/* <span> {termsAndConditions?.allRightsReserved?.text} </span> */}
                <TextComponent field={copyrightText} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlobalStructure>
  );
};
