/* eslint-disable react/no-unescaped-entities */
'use client';
import styles from './styles.module.scss';
import GlobalStructure from 'subComponents/GlobalStructure';
import ImageRenderer from 'subComponents/ImageRenderer';
import clsx from 'clsx';
import TitleComponent from 'subComponents/TitleComponent';
import TextComponent from 'subComponents/TextComponent';
import { useGlobalContext } from 'globalContext/context';

export const Default = (props) => {
  const { fields, params } = props;
  const { Styles, ShowQuoteIcon, ImageLeft } = params;
  const { shortDescription, name, position, logo, logoMobile } = fields;

  const { isDesktopLayout } = useGlobalContext();

  const shouldRenderShortDescription = !!shortDescription?.value;
  const shouldRenderColoredPartContent = shouldRenderShortDescription || ShowQuoteIcon;
  const shouldRenderName = !!name?.value;
  const shouldRenderPosition = !!position?.value;
  const shouldRenderBorderedText = shouldRenderPosition || shouldRenderName;
  const shouldRenderImage = !!logo?.value?.src || !!logoMobile?.value?.src;

  return (
    <>
      <GlobalStructure
        className={clsx(styles['Quote'], shouldRenderImage && ImageLeft && ['flipped'])}
        // anchorId={anchorId}
        isFullWidth
        paddingClass={Styles}
        anchorId={props?.rendering?.uid}
      >
        <div className={clsx(styles['content-image-container-parent'])}>
          <div
            className={clsx(
              styles['content-image-container'],
              shouldRenderColoredPartContent && styles['max-height'],
              ' component-content'
            )}
          >
            <div className={clsx(styles['content-wrapper'])}>
              {(isDesktopLayout || shouldRenderColoredPartContent) && (
                <div className={clsx(styles['colored-part'])}>
                  <div className={clsx(styles['absolute-background-color'])} />
                  {shouldRenderColoredPartContent && (
                    <div className={styles['colored-part-content']}>
                      {ShowQuoteIcon && (
                        <ImageRenderer className={styles['quote-icon']} icon="images/quote" />
                      )}
                      {shouldRenderShortDescription && (
                        <TextComponent field={shortDescription} className={styles['description']} />
                      )}
                    </div>
                  )}
                </div>
              )}
              <div className={clsx(styles['content-container'])}>
                <div className={clsx(styles['mobile-absolute-background-color'])} />
                {shouldRenderBorderedText && (
                  <div
                    className={clsx(styles['content'])}
                    data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                  >
                    <div className={styles['gradient-divider']} />
                    <div className={styles['list-item']}>
                      {shouldRenderName && (
                        <TitleComponent field={name} className={styles['title']} />
                      )}
                      {shouldRenderPosition && (
                        <TextComponent field={position} className={styles['description']} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {shouldRenderImage && (
              <div
                className={clsx(styles['image'])}
                data-aos="fade-up"
                data-aos-offset="400"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
              >
                <div className={clsx(styles['mobile-absolute-background-color'])} />
                <ImageRenderer
                  ipadshow={true}
                  desktopSrc={logo}
                  mobileSrc={logoMobile}
                  className={styles['img']}
                />
              </div>
            )}
          </div>
        </div>
      </GlobalStructure>
    </>
  );
};
