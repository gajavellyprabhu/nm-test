'use client';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ImageRenderer from 'subComponents/ImageRenderer';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import clsx from 'clsx';
import { getLangDir } from 'utils';
import { useGlobalContext } from 'globalContext/context';
import { v4 } from 'uuid';
import { useMediaQuery } from '@mui/material';
import TitleComponent from 'subComponents/TitleComponent';
import TextComponent from 'subComponents/TextComponent';
import Button from 'subComponents/Button';
import GlobalStructure from 'subComponents/GlobalStructure';

export const Default = (props) => {
  const { fields, params } = props;
  const { Styles } = params;
  const { locale } = useGlobalContext();
  const [uniqueId, setUniqueId] = useState();
  const { title, shortDescription, link, items, backgroundSrc, titleTag } = fields;
  const isDesktopAndNoPadding = useMediaQuery('(max-width: 1296px)');
  const shouldRenderLink = !!link?.value?.href;

  const shouldRenderTitle = !!title?.value;
  const shouldRenderShortDescriptione = !!shortDescription?.value;

  const shoudlRenderThreeCards= items?.length === 3 ;

  useEffect(() => {
    !!!uniqueId && setUniqueId(v4());
  }, [uniqueId]);

  return (
    <GlobalStructure
      className={clsx(styles['FeatureCards'], shoudlRenderThreeCards? 'ThreeFeatureCards': '')}
      style={!!backgroundSrc ? { backgroundImage: `url(${backgroundSrc})` } : {}}
      isFullWidth
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      <div className={'component-wrapper'}>
        <div>
          <div
            className={clsx(styles['box'], 'component-content no-paddding')}
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
          >
            <div className={styles['title-description-wrapper']}>
              {!!shouldRenderTitle && (
                <TitleComponent headingTag={titleTag} field={title} className={styles['title']} />
              )}
              {!!shouldRenderShortDescriptione && (
                <TextComponent field={shortDescription} className={styles['description']} />
              )}
            </div>
            {/* {!!button && (
              <div className="flex-it">
                <a href={button.href} className="primary-button fit-height">
                  {button.text}
                </a>
              </div>
            )} */}
            {shouldRenderLink && <Button link={link} className="primary-button fit-height" />}
          </div>
          {!!uniqueId && (
            <>
              <div className={'component-wrapper'}>
                <div className={'component-content no-paddding-x'}>
                  <Swiper
                    loop={false}
                    dir={getLangDir(locale)}
                    spaceBetween={32}
                    pagination={{
                      el: `.global-swiper-pagination-${uniqueId}`,
                      type: 'progressbar',
                    }}
                    {...(isDesktopAndNoPadding && {
                      slidesOffsetAfter: 24,
                      slidesOffsetBefore: 24,
                    })}
                    className={styles['cards-wrapper']}
                    modules={[Navigation, Pagination]}
                    navigation={{
                      nextEl: `.journeyCardsComponent-swiper-button-next-${uniqueId}`, // Use CSS Module class reference
                      prevEl: `.journeyCardsComponent-swiper-button-prev-${uniqueId}`,
                    }}
                    slidesPerView="auto"
                  >
                    {items.map((item, i) => {
                      const { backgroundImage, title, link, facts, subtitle } = item?.fields;
                      const shouldRenderTitle = !!title?.value;
                      const shouldRenderSubtitle = !!subtitle?.value;
                      const shouldRenderFacts = !!facts?.value;
                      const shouldRenderDetails = shouldRenderSubtitle || shouldRenderFacts;
                      const shouldRenderInnerBox = shouldRenderTitle || shouldRenderDetails;
                      const shouldRenderImage = !!backgroundImage?.value?.src;
                      return (
                        <SwiperSlide key={i} className={styles['swiper-slide']}>
                          <a
                            aria-label={title?.value}
                            className={clsx(
                              styles['card'],
                              !!link?.value?.href && styles['with-link']
                            )}
                            data-aos="fade-up"
                            data-aos-offset="200"
                            data-aos-delay="50"
                            data-aos-duration="500"
                            // data-aos-duration={(i + 1) * 200}
                            data-aos-easing="ease-in-out"
                            {...(!!link?.value?.href && {
                              href: `${link?.value?.href}${link?.value?.anchor}`,
                            })}
                            // href={
                            //   !!link?.value?.href
                            //     ? `${link?.value?.href}${link?.value?.anchor}`
                            //     : null
                            // }
                          >
                            {shouldRenderImage && (
                              <ImageRenderer
                                className={styles['background-image']}
                                mobileSrc={backgroundImage}
                                desktopSrc={backgroundImage}
                              />
                            )}
                            <div className={styles['overlay']} />
                            {shouldRenderInnerBox && (
                              <div className={styles['internal-box-wrap']}>
                                <div className={styles['auto']}>
                                  <div className={clsx(styles['internal-box'])}>
                                    {shouldRenderTitle && (
                                      <TextComponent field={title} className={styles['title']} />
                                    )}
                                    {shouldRenderDetails && (
                                      <div className={styles['details']}>
                                        {shouldRenderSubtitle && (
                                          <TextComponent
                                            field={subtitle}
                                            className={styles['subtitle']}
                                          />
                                        )}
                                        {shouldRenderFacts && (
                                          <TextComponent
                                            field={facts}
                                            className={styles['facts']}
                                          />
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </a>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
              <div className="global-swiper-buttons component-content no-paddding">
                <div className="global-swiper-pagination-wrap">
                  <div
                    className={`global-swiper-pagination global-swiper-pagination-${uniqueId}`}
                  />
                </div>
                <div className="global-nav-wrap">
                  <div className={`journeyCardsComponent-swiper-button-prev-${uniqueId}`}>
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
                        // src={'/images/ico_angle_left.svg'}
                        icon="/images/ico_angle_left.svg"
                        renderSVG
                        width={9}
                        height={14}
                      />
                    </div>
                  </div>
                  <div className={`journeyCardsComponent-swiper-button-next-${uniqueId}`}>
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
                        // src={'/images/ico_angle_right.svg'}
                        icon="/images/ico_angle_right.svg"
                        renderSVG
                        width={9}
                        height={14}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </GlobalStructure>
  );
};
