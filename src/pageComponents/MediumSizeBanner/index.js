/* eslint-disable react/no-unescaped-entities */
import styles from './styles.module.scss';
import GlobalStructure from 'subComponents/GlobalStructure';
import ImageRenderer from 'subComponents/ImageRenderer';
import TitleComponent from 'subComponents/TitleComponent';
import TextComponent from 'subComponents/TextComponent';
import React, { useEffect, useState } from 'react';

export const Default = (props) => {
  const { fields, params } = props;
  const { Styles } = params;
  const {
    bannerTitle,
    bannerShortDescription,
    bannerImage,
    bannerMobileImage,
    paddingClass,
    titleTag,
    items
  } = fields;
  const shouldRenderBannerTitle = !!bannerTitle?.value;
  const shouldRenderBannerShortDescription = !!bannerShortDescription?.value;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstItem, setFirstItem] = useState(0);

  const carouselImages = [
    bannerImage?.value ? { id: 'main-banner', fields: { bannerImage, bannerMobileImage } } : null,
    ...items
  ].filter(
    item =>
      item &&
      item.fields.bannerImage?.value?.src &&
      Object.keys(item.fields).length === 2 &&
      item.fields.bannerImage &&
      item.fields.bannerMobileImage
  );

  useEffect(() => {
    if (carouselImages.length > 0) {
      setCurrentIndex(0);
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % carouselImages.length);
        setFirstItem(firstItem => (firstItem + 1));
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [carouselImages.length]);

  return (
    <GlobalStructure
      className={styles['MediumSizeBanner']}
      isFullWidth
      // isNoPadding
      defaultPaddingClass="padding-default-Y-0"
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      {carouselImages.map((item, index) => (
        <div
          key={item.id}
          className={`${styles['banner-slide']} ${currentIndex === index && carouselImages.length > 1 ? styles['active'] : ''} ${firstItem <= 1 && carouselImages.length > 1 ? styles['zoom-image'] : ''}`}
          style={{ opacity: currentIndex === index ? 1 : 0 }}
        >
          <ImageRenderer
            className={styles['image-banner']}
            desktopSrc={item.fields.bannerImage}
            mobileSrc={item.fields.bannerMobileImage}
          />
        </div>
      ))}
      {(shouldRenderBannerShortDescription || shouldRenderBannerTitle) && (
        <div className={styles['data_box']}>
          <div className={'component-wrapper'}>
            <div className={'component-content no-paddding flex-it flex-align-item-end'}>
              <div className={styles['data']}>
                {shouldRenderBannerTitle && (
                  <TitleComponent
                    headingTag={titleTag}
                    field={bannerTitle}
                    className={styles['title']}
                  />
                )}
                {shouldRenderBannerShortDescription && (
                  <TextComponent field={bannerShortDescription} className={styles['description']} />
                  // <div className={styles['description']}>{description?.value}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </GlobalStructure>
  );
};