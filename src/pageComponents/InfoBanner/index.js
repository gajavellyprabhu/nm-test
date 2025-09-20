import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import ImageRenderer from 'subComponents/ImageRenderer';
import TextComponent from 'subComponents/TextComponent';
import TitleComponent from 'subComponents/TitleComponent';
import Button from 'subComponents/Button';
import { useFormsContainerContext } from 'pageComponents/FormsContainer/FormsContainerContext';
import GlobalStructure from 'subComponents/GlobalStructure';
import { useNewsletterBannerContext } from 'pageComponents/NewsletterBanner/context';

export const Default = (props) => {
  // debugger;
  const { fields, params } = props;
  const { Styles } = params;
  const { shouldShowThankYouComp: shouldShowThankYouCompForm } = useFormsContainerContext();
  const { shouldShowThankYouComp: shouldShowThankYouCompNews } = useNewsletterBannerContext();
  let shouldShowThankYouComp = false;
  if (shouldShowThankYouCompForm || shouldShowThankYouCompNews) {
    shouldShowThankYouComp = true;
  }

  const { icon, iconMobile, link, shortDescription, title, titleTag } = fields;
  const shouldRenderTitle = !!title?.value;
  const shouldRenderShortDescription = !!shortDescription?.value;
  const shouldRenderIcon = !!icon?.value?.src;
  const shouldRenderLink = !!link?.value?.href;
  return (
    <GlobalStructure
      className={clsx(styles['ThankYou'], shouldShowThankYouComp && styles['show-comp'])}
      props={props}
      id={props?.rendering?.uid}
      paddingClass={Styles}
    >
      <div className={styles['content-container']}>
        {shouldRenderIcon && (
          <ImageRenderer
            className={styles['icon']}
            mobileSrc={!!iconMobile?.value?.src ? iconMobile : icon}
            desktopSrc={icon}
          />
        )}
        {shouldRenderTitle && (
          <TitleComponent headingTag={titleTag} field={title} className={styles['title']} />
        )}
        {shouldRenderShortDescription && (
          <TextComponent field={shortDescription} className={styles['subtitle']} />
        )}
        {shouldRenderLink && <Button link={link} className={styles['button']} isButton />}
      </div>
    </GlobalStructure>
  );
};
export const ErrorMessage = (props) => {
  const { fields, params } = props;
  const { Styles } = params;
  const { shouldShowThankYouComp: shouldShowThankYouCompForm } = useFormsContainerContext();
  const { shouldShowThankYouComp: shouldShowThankYouCompNews } = useNewsletterBannerContext();
  let shouldShowThankYouComp = false;
  if (shouldShowThankYouCompForm || shouldShowThankYouCompNews) {
    shouldShowThankYouComp = true;
  }
  const { icon, iconMobile, link, shortDescription, title } = fields;
  const shouldRenderTitle = !!title?.value;
  const shouldRenderShortDescription = !!shortDescription?.value;
  const shouldRenderIcon = !!icon?.value?.src;
  const shouldRenderLink = !!link?.value?.href;

  return (
    <GlobalStructure
      className={clsx(
        styles['ThankYou'],
        styles['errorPage'],
        shouldShowThankYouComp && styles['show-comp']
      )}
      props={props}
      paddingClass={Styles}
      // componentName={`InfoBanner`}
    >
      {/* <div
        className={clsx(
          styles['ThankYou'],
          styles['errorPage'],
          shouldShowThankYouComp && styles['show-comp']
        )}
      > */}
      <div className={styles['content-container']}>
        <div className={clsx(styles['main-box-container'], 'flex-it')}>
          <div className={clsx(styles['box'], styles['image-box'])}>
            {shouldRenderIcon && (
              <ImageRenderer
                className={styles['icon']}
                mobileSrc={!!iconMobile?.value?.src ? iconMobile : icon}
                desktopSrc={icon}
              />
            )}
          </div>
          <div className={clsx(styles['box'], styles['data-box'])}>
            {shouldRenderTitle && <TitleComponent field={title} className={styles['title']} />}
            {shouldRenderShortDescription && (
              <TextComponent field={shortDescription} className={styles['subtitle']} />
            )}
            {shouldRenderLink && <Button link={link} className={styles['button']} isButton />}
          </div>
        </div>
      </div>
      {/* </div> */}
    </GlobalStructure>
  );
};
