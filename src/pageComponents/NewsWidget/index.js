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
  const { fields } = props;

  const [isClosed, setIsClosed] = useState(false);
  const isDesktopAndNoPadding = useMediaQuery('(max-width: 1296px)');
  const [uniqueId, setUniqueId] = useState();
  const { t } = useI18n();
  const { locale } = useGlobalContext();

  useEffect(() => {
    !!!uniqueId && setUniqueId(v4());
  }, [uniqueId]);

  const { items, title } = fields;
  const shouldrenderItems = !!items && items?.length > 0;
  return (
    <div
      className={clsx(styles['NewsWidget'], isClosed && styles['shrink'])}
      // paddingClass={Styles}
      // anchorId={props?.rendering?.uid}
    >
      <div className={clsx(styles['content-container'])}>
        <div className={clsx(styles['info-container'], isClosed && styles['hide'])}>
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

                  const finalLink = !!link?.value?.url ? link?.value?.url : url;

                  const shouldRenderButton = !!finalLink;
                  return (
                    <SwiperSlide key={i} className={styles['swiper-slide']}>
                      <div className={clsx(styles['card'], 'flex-it')}>
                        <div className={styles['background-image']}>
                          {shouldRenderImage && (
                            <ImageRenderer desktopSrc={thumbnailImage} mobileSrc={thumbnailImage} />
                          )}
                        </div>
                        {shouldRenderInnerBox && (
                          <div
                            className={clsx(
                              styles['internal-box-wrap'],
                              'flex-it flex-align-item-center'
                            )}
                          >
                            <div className={styles['internal-box']}>
                              {shouldRenderDate && (
                                <TextComponent
                                  field={{ value: formattedDate['m d, y'] }}
                                  className={clsx(
                                    styles['date'],
                                    suppressDate?.value ? styles['hide-date'] : ''
                                  )}
                                />
                              )}
                              {shouldRenderTitle && (
                                <TextComponent field={title} className={styles['title']} />
                              )}
                              {shouldRenderButton && (
                                <a
                                  aria-label={
                                    shouldRenderTitle
                                      ? title?.value
                                      : shouldRenderSubtitle
                                      ? subtitle?.value
                                      : ''
                                  }
                                  href={finalLink}
                                  className={styles['link']}
                                  {...(!!link?.value?.url
                                    ? { target: '_blank', rel: 'noopener noreferrer' }
                                    : {})}
                                >
                                  <ButtonArrow label={t('label_find_out_more')} />
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </>
          )}
          <div className={styles['close-icon']} onClick={() => setIsClosed(true)}>
            <ImageRenderer icon="/images/news_widget_close.svg" renderSVG />
          </div>
        </div>
        <div className={clsx(styles['small-info-container'], isClosed && styles['show'])}>
          <div className={styles['open-icon']} onClick={() => setIsClosed(false)}>
            <ImageRenderer icon="/images/news_widget_open.svg" renderSVG />
          </div>
          <TitleComponent field={title} className={styles['title']} />
        </div>
      </div>
    </div>
  );
};
