/* eslint-disable react/no-unescaped-entities */
'use client';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import GlobalStructure from 'subComponents/GlobalStructure';
import ImageRenderer from 'subComponents/ImageRenderer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { useGlobalContext } from 'globalContext/context';
import { getLangDir } from 'utils';
import { v4 } from 'uuid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css';
import clsx from 'clsx';
import TitleComponent from 'subComponents/TitleComponent';
import TextComponent from 'subComponents/TextComponent';

export const Default = (props) => {
  const { locale } = useGlobalContext();
  const [uniqueId, setUniqueId] = useState();
  const { fields, params } = props;
  const { Styles } = params;
  const { title, boardVariation, items, anchorId, titleTag } = fields;

  const shouldRenderTitle = !!title?.value;
  const shouldRenderSlides = !!items?.length;
  // const shouldRenderBoardVariationImage = !!boardVariationImage?.desktopSrc;
  const multiSlides = items?.length > 1;

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    !!!uniqueId && setUniqueId(v4());
  }, [uniqueId]);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Function to update window width
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener to listen for window resize
    window.addEventListener('resize', updateWindowWidth);

    // Call the function initially to set the initial width
    updateWindowWidth();

    // Remove event listener on component unmount
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []); // Empty dependency array means this effect runs only once after initial render

  return (
    <>
      <GlobalStructure
        className={clsx(styles['QuoteCarousel'], boardVariation && styles['board-variation'])}
        // anchorId={anchorId}
        // isFullWidth
        // isNoPadding
        isExpendRight={multiSlides ? true : false}
        paddingClass={Styles}
        anchorId={props?.rendering?.uid}
      >
        <div className={styles['content-container']}>
          <div
            className={clsx(styles['content'], multiSlides && styles['expanded'])}
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
          >
            <Swiper
              className={styles['thumb-swiper-testimonial']}
              onSwiper={setThumbsSwiper}
              effect={'fade'}
              modules={[EffectFade, Thumbs]}
              allowTouchMove={false}
            >
              {items?.map((item, i) => {
                const { shortDescription, name, position, titleTag } = item?.fields;
                const shouldRenderName = !!name?.value;
                const shouldRenderPosition = !!position?.value;
                const shouldRenderShortDescription = !!shortDescription?.value;
                const shouldRenderBorderedText = shouldRenderPosition || shouldRenderName;
                return (
                  <SwiperSlide key={i}>
                    {shouldRenderTitle && (
                      <TitleComponent
                        headingTag={thumbsSwiper?.realIndex === i ? fields.titleTag : 'p'}
                        field={title}
                        className={clsx(styles['title'], styles['main-title'])}
                      />
                    )}
                    {shouldRenderShortDescription && (
                      <TextComponent field={shortDescription} className={styles['description']} />
                    )}
                    {shouldRenderBorderedText && (
                      <div className={styles['list-item-wrapper']}>
                        <div className={styles['gradient-divider']} />
                        <div className={styles['list-item']}>
                          {shouldRenderName && (
                            <TitleComponent
                              headingTag={titleTag}
                              field={name}
                              className={styles['title']}
                            />
                          )}
                          {shouldRenderPosition && (
                            <TextComponent field={position} className={styles['description']} />
                          )}
                        </div>
                      </div>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          {shouldRenderSlides && !!uniqueId && (
            <div
              className={clsx(
                styles['image'],
                multiSlides ? styles['multi-slide'] : styles['one-slide']
              )}
              data-aos="fade-up"
              data-aos-offset="400"
              data-aos-delay="50"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
            >
              <Swiper
                dir={getLangDir(locale)}
                loop={true}
                freeMode={true}
                pagination={{
                  el: `.global-swiper-pagination-${uniqueId}`,
                  type: 'progressbar',
                }}
                className={styles['cards-wrapper']}
                modules={[Navigation, Pagination, Thumbs]}
                navigation={{
                  nextEl: `.TestimonialsComponent-swiper-button-next-${uniqueId}`,
                  prevEl: `.TestimonialsComponent-swiper-button-prev-${uniqueId}`,
                }}
                thumbs={!!thumbsSwiper && { swiper: thumbsSwiper }}
                slidesPerView={multiSlides ? (windowWidth > 1400 ? windowWidth / 1300 : 1.2) : 1}
                breakpoints={{
                  0: {
                    spaceBetween: 24,
                    slidesPerView: multiSlides ? 1.2 : 1,
                  },
                  1024: {
                    spaceBetween: 32,
                    slidesPerView: multiSlides
                      ? windowWidth > 1400
                        ? windowWidth / 1300
                        : 1.2
                      : 1,
                  },
                }}
              >
                {items?.map((item, i) => {
                  const { logo, logoMobile } = item?.fields;
                  return (
                    <SwiperSlide
                      key={i}
                      className={clsx(boardVariation && styles['board-variation-desktop'])}
                    >
                      <ImageRenderer
                        ipadshow={true}
                        desktopSrc={logo}
                        mobileSrc={logoMobile}
                        className={styles['img']}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          )}
        </div>
        {!!uniqueId && shouldRenderSlides && multiSlides && (
          <div className="global-swiper-buttons">
            <div className="global-swiper-pagination-wrap">
              <div className={`global-swiper-pagination global-swiper-pagination-${uniqueId}`} />
            </div>
            <div className="global-nav-wrap">
              <div className={`TestimonialsComponent-swiper-button-prev-${uniqueId}`}>
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
              <div className={`TestimonialsComponent-swiper-button-next-${uniqueId}`}>
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
      </GlobalStructure>
    </>
  );
};
