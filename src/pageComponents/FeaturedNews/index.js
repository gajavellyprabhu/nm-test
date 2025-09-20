'use client';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import ImageRenderer from 'subComponents/ImageRenderer';
import clsx from 'clsx';
import GlobalStructure from 'subComponents/GlobalStructure';
import { useGlobalContext } from 'globalContext/context';
import TitleComponent from 'subComponents/TitleComponent';
import TextComponent from 'subComponents/TextComponent';
import { getLangDir } from 'utils';
import { v4 } from 'uuid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useMediaQuery } from '@mui/material';
import { dateFormat } from '../../Helpers/dateTimeHelper';
import ButtonArrow from 'subComponents/ButtonArrow';
import { useI18n } from 'next-localization';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
export const Default = (props) => {
  const { fields, params } = props;
  const { Styles } = params;
  const isDesktopAndNoPadding = useMediaQuery('(max-width: 1296px)');
  const [uniqueId, setUniqueId] = useState();
  const { t } = useI18n();
  const { locale } = useGlobalContext();

  useEffect(() => {
    !!!uniqueId && setUniqueId(v4());
  }, [uniqueId]);

  const { shortDescription, title, items, titleTag } = fields;
  const shouldRenderShortDescription = !!shortDescription?.value;
  const shouldRenderTitle = !!title?.value;
  const shouldrenderItems = !!items && items?.length > 0;
  const getCategory = (type) => {
    let category = '';
    if (type?.toLowerCase()?.indexOf('def7f6c8d26f4f5f828de16257d154e3') !== -1) {
      category = t('label_press_release');
    }
    if (type?.toLowerCase()?.indexOf('b5e20d30538c4c13adbe1739f86364ef') !== -1) {
      category = t('lablel_interview');
    }
    if (type?.toLowerCase()?.indexOf('c9171630f9cb46afaba28f929e1f9cbb') !== -1) {
      category = t('label_gallery');
    }
    if (type?.toLowerCase()?.indexOf('4937151a0c7f4059b55bfd2324cf85dd') !== -1) {
      category = t('label_article');
    }

    return category;
  };
  return (
    <GlobalStructure
      className={clsx(styles['FeaturedNews'])}
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      {shouldRenderTitle && (
        <TitleComponent headingTag={titleTag} field={title} className={styles['mainTitle']} />
      )}
      {shouldRenderShortDescription && (
        <TextComponent field={shortDescription} className={styles['mainDescription']} />
      )}
      {shouldrenderItems && !!uniqueId && (
        <>
          <Swiper
            loop={false}
            dir={getLangDir(locale)}
            spaceBetween={32}
            slidesPerView={1}
            pagination={{
              el: `.global-swiper-pagination-${uniqueId}`,
              type: 'progressbar',
            }}
            {...(isDesktopAndNoPadding && {
              slidesOffsetAfter: 24,
              slidesOffsetBefore: 24,
            })}
            className={styles['cards-wrapper']}
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{
              nextEl: `.feature-swiper-button-next-${uniqueId}`, // Use CSS Module class reference
              prevEl: `.feature-swiper-button-prev-${uniqueId}`,
            }}
          >
            {items?.map((item, i) => {
              const {
                newsSource,
                date,
                category,
                thumbnailImage,
                shortDescription: subtitle,
                link,
                title,
                suppressDate,
                enablePlayButton
              } = item?.fields;
              const { url } = item;
              const shouldRenderTitle = !!title?.value;
              const shouldRenderSubtitle = !!subtitle?.value;
              const shouldRenderDetails = shouldRenderSubtitle;
              const shouldRenderInnerBox = shouldRenderTitle || shouldRenderDetails;
              const shouldRenderImage = !!thumbnailImage?.value?.src;
              const labelValue = category?.id?.toLowerCase()?.replaceAll('-', '');
              const shouldRenderItemLabel = !!labelValue;
              const shouldRenderItemLogo = !!newsSource?.fields?.logo?.value?.src;
              const shouldRenderDate = !!date?.value;

              let formattedDate = dateFormat(date?.value, locale);
              // let finalDate = {
              //   value: `${formattedDate.month} ${formattedDate.day}, ${formattedDate.year}`,
              // };

              const finalLink = !!link?.value?.url ? link?.value?.url : url;
              // debugger;
              const shouldRenderButton = !!finalLink;
              const shouldEnablePlayButton = !!enablePlayButton?.value;
              return (
                <SwiperSlide key={i} className={styles['swiper-slide']}>
                  <a
                    aria-label={
                      shouldRenderTitle ? title?.value : shouldRenderSubtitle ? subtitle?.value : ''
                    }
                    href={finalLink}
                    className={clsx(styles['card'], 'flex-it')}
                    data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                    {...(!!link?.value?.url
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <div className={styles['background-image']}>
                      {shouldRenderImage && (
                        <ImageRenderer desktopSrc={thumbnailImage} mobileSrc={thumbnailImage} />
                      )}
                      {shouldEnablePlayButton && (
                        <ImageRenderer
                          icon="/images/news_component_play_icon.svg"
                          className={styles['video_play']}
                        />
                      )}
                      {shouldRenderItemLabel && (
                        <div
                          className={clsx(
                            'press-release',
                            `css_${
                              labelValue?.toLowerCase() === 'def7f6c8d26f4f5f828de16257d154e3'
                                ? 'press'
                                : labelValue?.toLowerCase() === 'b5e20d30538c4c13adbe1739f86364ef'
                                ? 'interview'
                                : labelValue?.toLowerCase() === 'c9171630f9cb46afaba28f929e1f9cbb'
                                ? 'gallery'
                                : ''
                            }`,
                            styles['category']
                          )}
                        >
                          {getCategory(labelValue)}
                        </div>
                      )}
                    </div>
                    {shouldRenderInnerBox && (
                      <div
                        className={clsx(
                          styles['internal-box-wrap'],
                          'flex-it flex-align-item-center'
                        )}
                      >
                        <div className={styles['auto']}>
                          <div className={styles['internal-box']}>
                            {shouldRenderItemLogo && (
                              <div
                                className={clsx(styles['label'], 'flex-it flex-align-item-center')}
                              >
                                <ImageRenderer
                                  desktopSrc={newsSource?.fields?.logo}
                                  mobileSrc={newsSource?.fields?.logo}
                                  alt={
                                    shouldRenderTitle
                                      ? title?.value
                                      : shouldRenderSubtitle
                                      ? subtitle?.value
                                      : ''
                                  }
                                />
                              </div>
                            )}
                            {shouldRenderDate && (
                              <TextComponent
                                field={{ value: formattedDate['d m y'] }}
                                className={clsx(styles['date'], suppressDate?.value ? styles['hide-date']: '')}
                              />
                            )}
                            {shouldRenderTitle && (
                              <TextComponent field={title} className={styles['title']} />
                            )}
                            {shouldRenderDetails && (
                              <div className={styles['details']}>
                                {shouldRenderSubtitle && (
                                  <TextComponent
                                    field={subtitle}
                                    className={styles['description']}
                                  />
                                )}
                              </div>
                            )}
                            {shouldRenderButton && <ButtonArrow label={t('label_find_out_more')} />}
                          </div>
                        </div>
                      </div>
                    )}
                  </a>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="global-swiper-buttons">
            <div className="global-swiper-pagination-wrap">
              <div className={`global-swiper-pagination global-swiper-pagination-${uniqueId}`} />
            </div>
            <div className="global-nav-wrap">
              <div className={`swiper-buttons feature-swiper-button-prev-${uniqueId}`}>
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
                    icon="/images/ico_angle_left.svg"
                    renderSVG
                    width={9}
                    height={14}
                  />
                </div>
              </div>
              <div className={`swiper-buttons feature-swiper-button-next-${uniqueId}`}>
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
    </GlobalStructure>
  );
};
