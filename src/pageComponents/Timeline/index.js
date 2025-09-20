'use client';
import GlobalStructure from 'subComponents/GlobalStructure';
import styles from './styles.module.scss';
import ImageRenderer from 'subComponents/ImageRenderer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import { getLangDir } from 'utils';
import { useGlobalContext } from 'globalContext/context';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import TitleComponent from 'subComponents/TitleComponent';
import TextComponent from 'subComponents/TextComponent';
import Button from 'subComponents/Button';

export const Default = (props) => {
  const { fields, params } = props;
  const { Styles } = params;
  const [uniqueId, setUniqueId] = useState();
  const { title, shortDescription, items, link, titleTag } = fields;
  const shouldRenderLink = !!link?.value?.href;
  const shouldRenderTitle = !!title;
  const shouldRenderShortDescription = !!shortDescription;
  const shouldRenderItems = !!items?.length;
  const { locale } = useGlobalContext();
  const swiperRef = useRef(null);

  // const handleItemClick = (index) => {
  //   if (!!swiperRef?.current) {
  //     swiperRef.current.swiper.slideTo(index);
  //   }
  // };

  useEffect(() => {
    !!!uniqueId && setUniqueId(v4());
  }, [uniqueId]);

  return (
    <GlobalStructure
      className={clsx(styles['Timeline'], 'full-width')}
      isFullWidth
      isExpendRight
      anchorId={props?.rendering?.uid}
      paddingClass={Styles}
    >
      <div
        className={clsx(styles['intro-container'], 'default-padding-left')}
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
      >
        <div className={styles['intro-text-section']}>
          {shouldRenderTitle && (
            <TitleComponent headingTag={titleTag} className={styles['title']} field={title} />
          )}
          {shouldRenderShortDescription && (
            <TextComponent className={styles['description']} field={shortDescription} />
          )}
        </div>
        {shouldRenderLink && <Button target="_blank" link={link} className="primary-button" />}
      </div>
      {uniqueId && (
        <div
          className={styles['swiper-container']}
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
        >
          <Swiper
            loop={true}
            ref={swiperRef}
            dir={getLangDir(locale)}
            spaceBetween={32}
            className={styles['latestNewsSlider']}
            pagination={{
              el: `.global-swiper-pagination-${uniqueId}`,
              type: 'progressbar',
            }}
            modules={[Autoplay, Navigation, Pagination]}
            speed={500}
            autoplay={{ delay: 8000, disableOnInteraction: false }}
            navigation={{
              nextEl: `.TimelineComponent-swiper-button-next-${uniqueId}`, // Use CSS Module class reference
              prevEl: `.TimelineComponent-swiper-button-prev-${uniqueId}`,
            }}
            slidesPerView={1.61}
            // loopAdditionalSlides={1}
            breakpoints={{
              0: {
                slidesPerView: 1.187,
                spaceBetween: 16,
              },
              769: {
                slidesPerView: 1.61,
                spaceBetween: 32,
              },
            }}
            {...(items?.length > 3 && { loopAdditionalSlides: 1 })}
          >
            {items?.map((item, i) => {
              const {
                image: desktopSrc,
                imageMobile: mobileSrc,
                shortDescription: slideShortDescription,
                title: slideTitle,
                titleTag,
              } = item?.fields;
              const shouldRenderSlideTitle = !!slideTitle?.value;
              const shouldRenderSlideShortDescription = !!slideShortDescription?.value;
              const shouldRenderTextSection =
                shouldRenderSlideTitle || shouldRenderSlideShortDescription;
              return (
                <SwiperSlide key={i}>
                  <div className={styles['slide-container']}>
                    <div className={styles['slide-image-container']}>
                      <ImageRenderer
                        desktopSrc={desktopSrc}
                        mobileSrc={mobileSrc}
                        className={styles['slide-image']}
                      />
                    </div>
                    {shouldRenderTextSection && (
                      <div className={styles['slide-text-section']}>
                        {shouldRenderSlideTitle && (
                          <TitleComponent
                            headingTag={titleTag}
                            className={clsx(styles['title'])}
                            field={slideTitle}
                          />
                        )}
                        {shouldRenderSlideShortDescription && (
                          <TextComponent className={styles['text']} field={slideShortDescription} />
                        )}
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {!!uniqueId && shouldRenderItems && items?.length > 1 && (
            <div className="global-swiper-buttons default-padding-left">
              <div className="global-swiper-pagination-wrap">
                <div className={`global-swiper-pagination global-swiper-pagination-${uniqueId}`} />
              </div>
              <div className="global-nav-wrap">
                <div className={`TimelineComponent-swiper-button-prev-${uniqueId}`}>
                  <div
                    className="global-swiper-button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.target.click();
                      }
                    }}
                  >
                    <ImageRenderer
                      icon={'/images/ico_angle_left.svg'}
                      renderSVG
                      width={9}
                      height={14}
                    />
                  </div>
                </div>
                <div className={`TimelineComponent-swiper-button-next-${uniqueId}`}>
                  <div
                    className="global-swiper-button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.target.click();
                      }
                    }}
                  >
                    <ImageRenderer
                      icon={'/images/ico_angle_right.svg'}
                      renderSVG
                      width={9}
                      height={14}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </GlobalStructure>
  );
};
