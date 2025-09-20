/* eslint-disable react/no-unescaped-entities */
import styles from './styles.module.scss';
import clsx from 'clsx';
import ImageRenderer from 'subComponents/ImageRenderer';
import TitleComponent from 'subComponents/TitleComponent';
import TextComponent from 'subComponents/TextComponent';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';

const FeaturedDetails = (props) => {
  const { title, imageMobile, image, items, titleTag, description } = props;
  const shouldRenderTitle = !!title?.value;
  const shouldRenderDescription = !!description?.value;
  const shouldRenderMainImage = !!image?.value?.src;
  const shouldRenderItems = Array.isArray(items) && items.length > 0;

  useEffect(() => {
    AOS.init({
      offset: 200, // Adjust as necessary
      delay: 50,
      duration: 500,
      easing: 'ease-in-out',
      once: false, // Set to true to animate only once
      disable: false, // Ensures AOS works on all devices
    });
  }, []);

  return (
    <div
      className={clsx(styles['FeaturedDetails'], 'apply-aos-mobile')}
      // anchorId={props?.rendering?.uid}
      data-aos="fade-up"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
    >
      <div className={clsx(styles['content-container'])}>
        <div className={clsx(styles['content'], !shouldRenderMainImage && styles['min-width'])}>
          {shouldRenderTitle && (
            <TitleComponent headingTag={titleTag} field={title} className={styles['title']} />
          )}
          {shouldRenderDescription && (
            <TextComponent field={description} className={styles['description']} />
          )}

          {shouldRenderItems && (
            <div className={styles['item-list']}>
              {items?.map((item, index) => {
                const { title, titleTag, shortDescription } = item?.fields;
                const shouldRenderTitle = !!title?.value;
                const shouldRenderDescription = !!shortDescription?.value;

                return (
                  <div
                    key={index}
                    className={styles['sub-item']}
                  >
                    {shouldRenderTitle && <TextComponent field={title} headingTag={titleTag} className={styles['text']} />}
                    {shouldRenderDescription && <TextComponent field={shortDescription} className={styles['desc']} />}

                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className={clsx(styles['image'])}>
          {shouldRenderMainImage && <ImageRenderer desktopSrc={image} mobileSrc={imageMobile} />}
        </div>
      </div>
    </div>
  );
};
export default FeaturedDetails;