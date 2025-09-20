'use client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import ImageRenderer from 'subComponents/ImageRenderer';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import { getLangDir } from 'utils';
import { useGlobalContext } from 'globalContext/context';
import ButtonArrow from 'subComponents/ButtonArrow';
import Button from 'subComponents/Button';
import { v4 } from 'uuid';
// import { useMediaQuery } from '@mui/material';
import TitleComponent from 'subComponents/TitleComponent';
import TextComponent from 'subComponents/TextComponent';
import GlobalStructure from 'subComponents/GlobalStructure';
import { useI18n } from 'next-localization';
// import { dateFormat } from '../../Helpers/dateTimeHelper';
import { useListingComponentContext } from 'subComponents/Listing/context/ListingComponentContext';
import { dateFormat } from 'src/Helpers/dateTimeHelper';

const LatestNewsComponent = (props) => {
  const { fields, params } = props;
  const { Styles } = params;
  const { t } = useI18n();
  const { locale, isDesktopLayout } = useGlobalContext();
  const [uniqueId, setUniqueId] = useState();
  // const { link, title, shortDescription: description, items } = props?.fields;
  // const isDesktopAndNoPadding = useMediaQuery('(max-width: 1296px)');
  // const shouldRenderLink = !!link?.value?.href;
  // const shouldRenderTitle = !!title?.value;
  // const shouldRenderDescription = !!description?.value;

  useEffect(() => {
    !!!uniqueId && setUniqueId(v4());
  }, [uniqueId]);

  const {
    dataToRender,
    // hasNext,
    // loadingData,
    // allFilters,
    // setSelectedFilters,
    // handleChangeFilter,
    // handleResetPageLimit,
    // loadMore,
    // totalCount,
  } = useListingComponentContext();

  const { link, title, shortDescription: description, titleTag } = fields;

  // const isDesktopAndNoPadding = useMediaQuery('(max-width: 1296px)');
  const shouldRenderLink = !!link?.value?.href;
  const shouldRenderTitle = !!title?.value;
  const shouldRenderDescription = !!description?.value;

  let showNavigation =
    (!!dataToRender && isDesktopLayout && dataToRender?.length > 3) ||
    (!!dataToRender && !isDesktopLayout && dataToRender?.length > 1);
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
      isFullWidth={true}
      className={clsx(
        styles['latestNews'],
        styles['small-news-variation'],
        // 'add-padding-content',
        'global-swiper-buttons-right-padding'
      )}
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      <div className={'component-wrapper'}>
        <div className={'component-content no-paddding'}>
          <div
            className={clsx(styles['top'], 'flex-it flex-justify-between')}
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
          >
            <div className={styles['data']}>
              {/* {shouldRenderTitle && <div className={styles['title']}>{title?.value}</div>}
               */}
              {shouldRenderTitle && (
                <TitleComponent headingTag={titleTag} className={styles['title']} field={title} />
              )}

              {/* {shouldRenderDescription && (
                <div className={styles['description']}>{description?.value}</div>
              )} */}
              {shouldRenderDescription && (
                <TextComponent className={styles['description']} field={description} />
              )}
            </div>
            {shouldRenderLink && (
              <span>
                <Button link={link} isButton />
              </span>
            )}
          </div>
        </div>
      </div>

      {!!dataToRender && !!uniqueId && (
        <div className={'component-wrapper'}>
          <div className={'component-content no-paddding-x'}>
            <div className={styles['bottom']}>
              <Swiper
                loop={true}
                loopAddBlankSlides={true}
                dir={getLangDir(locale)}
                spaceBetween={32}
                pagination={{
                  el: `.global-swiper-pagination-${uniqueId}`,
                  type: 'progressbar',
                }}
                slidesPerView={3}
                slidesPerGroup={3}
                // {...(isDesktopAndNoPadding && {
                //   slidesOffsetAfter: 24,
                //   slidesOffsetBefore: 24,
                // })}
                className={styles['latestNewsSlider']}
                modules={[Navigation, Pagination, Autoplay]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                navigation={{
                  nextEl: `.latestNewsComponent-swiper-button-next-${uniqueId}`, // Use CSS Module class reference
                  prevEl: `.latestNewsComponent-swiper-button-prev-${uniqueId}`,
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 1.2,
                    slidesPerGroup: 1,
                    slidesOffsetAfter: 24,
                    slidesOffsetBefore: 24,
                  },
                  764: {
                    slidesPerView: 2.15,
                    slidesPerGroup: 2,
                    slidesOffsetAfter: 24,
                    slidesOffsetBefore: 24,
                  },
                  1100: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    slidesOffsetAfter: 0,
                    slidesOffsetBefore: 0,
                  },
                }}
              >
                {dataToRender?.map((item, i) => {
                  const {
                    date,
                    shortDescription,
                    thumbnailImage,
                    title,
                    category,
                    newsSource,
                    url,
                    link,
                    enablePlayButton,
                    suppressDate
                  } = item?.item;
                  // link and press-release missing
                  const shouldRenderItemTitle = !!title?.value;
                  const shouldRenderItemDescription = !!shortDescription?.value;
                  const logo = newsSource?.targetItem?.logo?.src;
                  const shouldRenderItemLogo = !!logo;
                  const labelValue = category?.targetItem?.id?.toLowerCase()?.replaceAll('-', '');
                  const shouldEnablePlayButton = !!enablePlayButton?.value;
                  // let isInterview =
                  //   category?.targetItem?.id
                  //     ?.toLowerCase()
                  //     ?.replaceAll('-', '')
                  //     ?.toLowerCase()
                  //     ?.indexOf('b5e20d30538c4c13adbe1739f86364ef') !== -1;
                  // // const shouldRenderButton = !!buttonLink && !!buttonText;
                  // let finalLink = isInterview ? link?.url : url;
                  // const shouldRenderButton = !!finalLink;

                  const finalLink = !!link?.url ? link?.url : url;
                  const shouldRenderButton = !!finalLink;

                  const shouldRenderItemMainImagePath = !!thumbnailImage?.src;
                  // const shouldRenderDate = !!date?.value;
                  const shouldRenderDate = !!date?.dateFormatted;
                  const shouldRenderItemLabel = !!labelValue;
                  let formattedDate = dateFormat(date?.dateFormatted, locale);
                  // `<span>${result.month}</span><span>${result.day}</span><span>${result.year}</span>`,
                  // let finalDate = {
                  //   value: `${formattedDate.month} ${formattedDate.day}, ${formattedDate.year}`,
                  // };
                  return (
                    <SwiperSlide key={i}>
                      <a
                        aria-label={title?.value}
                        href={shouldRenderButton ? finalLink : '#'}
                        className={styles['item']}
                        data-aos="fade-up"
                        data-aos-offset="200"
                        data-aos-delay="50"
                        data-aos-duration="500"
                        // data-aos-duration={(i + 1) * 200}
                        data-aos-easing="ease-in-out"
                        {...(!!link?.url ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        <div className={clsx(styles['image'])}>
                          {shouldRenderItemMainImagePath && (
                            <ImageRenderer
                              // alt={thumbnailImage?.alt}
                              desktopSrc={{ value: { ...thumbnailImage } }}
                              // mobileSrc={thumbnailImageMobile}
                              // renderLegacyImage
                              // disableLazyLoading
                            />
                          )}
                          {shouldEnablePlayButton && (
                            <ImageRenderer
                              icon="/images/news_component_play_icon.svg"
                              className={styles['video_play']}
                            />
                          )}
                        </div>

                        <div className={styles['data']}>
                          {shouldRenderItemLogo && (
                            <div
                              className={clsx(styles['label'], 'flex-it flex-align-item-center')}
                            >
                              <ImageRenderer
                                desktopSrc={{ value: { src: logo } }}
                                mobileSrc={{ value: { src: logo } }}
                                alt={title?.value}
                                // renderLegacyImage
                                // disableLazyLoading
                              />
                            </div>
                          )}
                          <div className={styles['auto']}>
                            {shouldRenderDate && (
                              <TextComponent
                                // field={{ value: date?.dateFormatted }}
                                // field={finalDate}
                                field={{ value: formattedDate['d m y'] }}
                                className={clsx(styles['date'], suppressDate?.value ? styles['hide-date']: '')}
                              />
                            )}
                            {shouldRenderItemTitle && (
                              <div className={styles['title']}>{title?.value}</div>
                            )}

                            {/* <div className={styles['data-hidden']}>
                              {shouldRenderItemDescription && (
                                <TextComponent
                                  field={shortDescription}
                                  className={styles['description']}
                                />
                              )}
                            </div> */}
                          </div>
                          <div className={styles['btn-bottom']}>
                            <div className={styles['btn-wrap']}>
                              {shouldRenderButton && (
                                <ButtonArrow label={t('label_find_out_more')} />
                              )}
                            </div>
                          </div>
                        </div>
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
                              }`
                            )}
                          >
                            {getCategory(labelValue)}
                          </div>
                        )}
                      </a>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              {showNavigation && (
                <div className={'component-wrapper'}>
                  <div className={clsx('component-content')}>
                    <div className={'global-swiper-buttons'}>
                      <div className={'global-swiper-pagination-wrap'}>
                        <div
                          className={`global-swiper-pagination global-swiper-pagination-${uniqueId}`}
                        ></div>
                      </div>

                      <div className={'global-nav-wrap'}>
                        <div
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.target.click();
                            }
                          }}
                          className={clsx(
                            'global-swiper-button',
                            `latestNewsComponent-swiper-button-prev-${uniqueId}`
                          )}
                        >
                          <ImageRenderer
                            icon={'/images/ico_angle_left.svg'}
                            renderSVG
                            width={9}
                            height={14}
                          />
                        </div>
                        <div
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.target.click();
                            }
                          }}
                          className={clsx(
                            'global-swiper-button',
                            `latestNewsComponent-swiper-button-next-${uniqueId}`
                          )}
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
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </GlobalStructure>
  );
};
export default LatestNewsComponent;
