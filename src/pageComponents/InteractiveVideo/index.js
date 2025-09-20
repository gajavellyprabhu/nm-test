'use client';
import { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { EffectFade, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import GlobalStructure from 'subComponents/GlobalStructure';
import ImageRenderer from 'subComponents/ImageRenderer';
import { getLangDir } from 'utils';
import { useGlobalContext } from 'globalContext/context';
import Video from 'subComponents/Video';
import { v4 } from 'uuid';
import TitleComponent from 'subComponents/TitleComponent';
import TextComponent from 'subComponents/TextComponent';
import Button from 'subComponents/Button';

export const Default = (props) => {
  const { fields, params } = props;
  const { Styles } = params;
  // const { link, title, description, anchorId, items, videoLink, posterImage } = fields;
  const {
    link,
    title,
    titleTag,
    shortDescription,
    anchorId,
    items,
    // videoLink,
    // posterImage,
    // backgroundImage,
    // backgroundImageMobile,
  } = fields;
  const restrictedItems = items?.slice(0, 4);
  const [uniqueId, setUniqueId] = useState();
  const { locale, isDesktopLayout } = useGlobalContext();

  const shouldRenderLink = !!link?.value?.href;
  const shouldRenderTitle = !!title?.value;
  const shouldRenderShortDescription = !!shortDescription?.value;

  const swiperRef = useRef();
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    swiperRef.current.swiper.slideTo(index);
  };

  useEffect(() => {
    !!!uniqueId && setUniqueId(v4());
  }, [uniqueId]);
  return (
    <GlobalStructure
      className={styles['InteractiveVideo']}
      isFullWidth
      isNoPadding
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      {!!uniqueId && (
        <div className={styles['video-text-wrap']}>
          <Swiper
            onSwiper={setSwiper}
            dir={getLangDir(locale)}
            onSlideChange={(swiper) => {
              return setActiveIndex(swiper.realIndex);
            }}
            ref={swiperRef}
            className={styles['videos']}
            modules={[EffectFade, Navigation]}
            effect={'fade'}
            navigation={{
              nextEl: `.item-button-next-${uniqueId}`, // Use CSS Module class reference
              prevEl: `.item-button-prev-${uniqueId}`,
              // disabledClass: "arrows-disabled",
              // lockClass: "arrows-hidden",
            }}
          >
            {restrictedItems?.map((item, i) => {
              const { fields } = item;
              // const { extraLargeScreenSrc, largeScreenSrc, mediumScreenSrc, thumb } = fields;
              const {
                posterImage,
                posterImageMobile,
                // title,
                videoLinkDesktop,
                videoLinkExtraLarge,
                videoLinkMobile,
              } = fields;

              const shouldRenderVideo =
                !!videoLinkDesktop?.value?.href && !!videoLinkExtraLarge?.value?.href;
              const poster = isDesktopLayout
                ? posterImage?.value?.src
                : posterImageMobile?.value?.src;

              return (
                shouldRenderVideo && (
                  <SwiperSlide key={i}>
                    <div className={clsx(styles['video'], styles['selected'])}>
                      <Video
                        extraLargeScreenSrc={videoLinkExtraLarge?.value?.href}
                        largeScreenSrc={videoLinkDesktop?.value?.href}
                        mediumScreenSrc={videoLinkMobile?.value?.href}
                        image={poster}
                        forcePosterOnBeforeWindowLoad={activeIndex === i}
                      />
                    </div>
                  </SwiperSlide>
                )
              );
            })}
          </Swiper>
          <div className={styles['scroll-arrow-wrap']}>
            <div className={'component-wrapper'}>
              <div className={'component-content'}>
                <div className={clsx(styles['boxes'], 'flex-it flex-col')}>
                  <div
                    className={styles['box']}
                    data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                  >
                    {shouldRenderTitle && (
                      <TitleComponent
                        headingTag={titleTag}
                        field={title}
                        className={styles['title']}
                      />
                    )}
                    {shouldRenderShortDescription && (
                      // <div
                      //   className={styles['description']}
                      //   dangerouslySetInnerHTML={{
                      //     __html: description?.value,
                      //   }}
                      // />
                      <TextComponent field={shortDescription} className={styles['description']} />
                    )}
                    {shouldRenderLink && (
                      <div className={'flex-it'}>
                        {/* <a href={link?.value?.href} className={'primary-button'}>
                          {link?.value?.text}
                        </a> */}
                        <Button link={link} isButton />
                      </div>
                    )}
                  </div>
                  <div
                    className={clsx(styles['box'], styles['thumb-box'])}
                    data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                  >
                    <div
                      className={clsx(
                        styles['item-button'],
                        styles['item-button-prev'],
                        `item-button-prev-${uniqueId}`
                      )}
                    >
                      <ImageRenderer
                        icon="/images/ico_arrow_up.svg"
                        alt="arrow up"
                        renderSVGInImageTag
                      />
                    </div>

                    <div className={styles['thumb-videos']}>
                      {restrictedItems?.map((item, i) => {
                        const { title, videoLinkDesktop, videoLinkExtraLarge, titleTag } =
                          item?.fields;
                        const shouldRenderVideo =
                          !!videoLinkDesktop?.value?.href && !!videoLinkExtraLarge?.value?.href;
                        const shouldRenderTitle = !!title?.value;
                        return (
                          shouldRenderVideo && (
                            <div
                              tabIndex={0}
                              key={i}
                              className={clsx(
                                styles['item'],
                                activeIndex === i && styles['active']
                              )}
                              onClick={() => handleClick(i)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.stopPropagation();
                                  handleClick(i);
                                }
                              }}
                            >
                              {shouldRenderTitle && (
                                <TitleComponent
                                  headingTag={titleTag}
                                  field={title}
                                  className={styles['text']}
                                />
                              )}
                            </div>
                          )
                        );
                      })}
                    </div>
                    <div
                      className={clsx(
                        styles['item-button'],
                        styles['item-button-next'],
                        `item-button-next-${uniqueId}`
                      )}
                    >
                      <ImageRenderer
                        icon="/images/ico_arrow_down.svg"
                        alt="arrow bottom"
                        renderSVGInImageTag
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </GlobalStructure>
  );
};
