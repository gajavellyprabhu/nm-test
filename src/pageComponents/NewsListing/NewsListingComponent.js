import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import GlobalStructure from 'subComponents/GlobalStructure';
import { useListingComponentContext } from 'subComponents/Listing/context/ListingComponentContext';
import styles from './styles.module.scss';
import TextComponent from 'subComponents/TextComponent';
import TitleComponent from 'subComponents/TitleComponent';
import ImageRenderer from 'subComponents/ImageRenderer';
import Button from 'subComponents/Button';
import ButtonArrow from 'subComponents/ButtonArrow';
import { useI18n } from 'next-localization';
import { useGlobalContext } from 'globalContext/context';
import BasicSelect from 'subComponents/Listing/FilterComponent/SubComponents/BasicSelect';
import DesktopTabs from 'subComponents/Listing/FilterComponent/SubComponents/DesktopTabs';
import { dateFormat } from 'src/Helpers/dateTimeHelper';

const NewsListingComponent = (props) => {
  const scrollToRef = useRef(null);
  const containerRef = useRef(null);
  const { t } = useI18n();
  const { fields, params } = props;
  const { Styles } = params;
  const { pageSize } = fields;
  const { isDesktopLayout, locale } = useGlobalContext();
  const { title, titleTag, facetOnTag } = fields;

  const {
    dataToRender,
    hasNext,
    // loadingData,
    // allFilters,
    // setSelectedFilters,
    // handleChangeFilter,
    handleResetPageLimit,
    loadMore,
    totalCount,
  } = useListingComponentContext();

  const isPagination = totalCount > pageSize?.value;

  // const shouldRenderQA = !!dataToRender?.length;
  const shouldRenderTitle = !!title?.value;
  // const [animateScroll, setAnimateScroll] = useState(false);

  const handleLoadMore = () => {
    // setAnimateScroll((prev) => !prev);
    let menuHeight = isDesktopLayout ? 172 + 30 : 131 + 30;
    let hScroll = scrollToRef?.current?.getBoundingClientRect().top + window.scrollY - menuHeight;
    let time = 0;
    if (hasNext) {
      hScroll = scrollToRef?.current?.getBoundingClientRect().top + window.scrollY - menuHeight;
    } else if (!hasNext) {
      hScroll = containerRef?.current?.getBoundingClientRect().top + window.scrollY - menuHeight;
    }
    if (!!scrollToRef?.current && hScroll > 0) {
      clearTimeout(time);
      time = setTimeout(() => {
        const scrollToTop = {
          behavior: 'smooth',
          top: hScroll,
        };
        window.scrollTo(scrollToTop);
      }, 450);
    }
    return hasNext ? loadMore() : handleResetPageLimit();
  };

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
      className={clsx(styles['NewsListing'])}
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      <div className={styles['top-section']}>
        {shouldRenderTitle && (
          <TitleComponent headingTag={titleTag} field={title} className={styles['title']} />
        )}
        {!isDesktopLayout && <BasicSelect facetOnTag={facetOnTag} />}
        {isDesktopLayout && <DesktopTabs facetOnTag={facetOnTag} />}
      </div>
      <div className={clsx(styles['items_container'], 'flex-it')} ref={containerRef}>
        {dataToRender?.map((item, i) => {
          const { date, shortDescription, thumbnailImage, title, category, newsSource, url, link, suppressDate,enablePlayButton } =
            item?.item;
          const shouldRenderItemTitle = !!title?.value;
          const shouldRenderItemDescription = !!shortDescription?.value;
          const logo = newsSource?.targetItem?.logo?.src;
          const shouldRenderItemLogo = !!logo;
          const finalLink = !!link?.url ? link?.url : url;
          const shouldRenderButton = !!finalLink;
          const shouldRenderItemMainImagePath = !!thumbnailImage?.src;
          const shouldRenderDate = !!date?.dateFormatted;
          const labelValue = category?.targetItem?.id?.toLowerCase()?.replaceAll('-', '');
          const shouldRenderItemLabel = !!labelValue;
          const shouldEnablePlayButton = !!enablePlayButton?.value;

          let formattedDate = dateFormat(date?.dateFormatted, locale);
          return (
            <a
              aria-label={title?.value}
              // {...(i > 0 && i % 6 === 0 ? { ref: { scrollToRef } } : {})}
              href={shouldRenderButton ? finalLink : '#'}
              key={i}
              className={styles['item']}
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="500"
              // data-index={i}
              // data-length={dataToRender?.length}
              // data-modulo={dataToRender?.length % 6 === 0}
              // data-aos-duration={(i + 1) * 200}
              data-aos-easing="ease-in-out"
              {...(!!link?.url ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {shouldRenderItemMainImagePath && (
                <div className={styles['image']}>
                  <ImageRenderer
                    desktopSrc={{ value: { ...thumbnailImage } }}
                    // renderLegacyImage
                    // mobileSrc={thumbnailImageMobile}
                  />
                  {shouldEnablePlayButton && (
                    <ImageRenderer
                      icon="/images/news_component_play_icon.svg"
                      className={styles['video_play']}
                    />
                  )}
                </div>
              )}

              <div className={styles['data']}>
                {shouldRenderItemLogo && (
                  <div className={clsx(styles['label'], 'flex-it flex-align-item-center')}>
                    <ImageRenderer
                      desktopSrc={{ value: { src: logo } }}
                      mobileSrc={{ value: { src: logo } }}
                      alt={title?.value}
                      // renderLegacyImage
                    />
                  </div>
                )}
                <div className={styles['auto']}>
                  {shouldRenderDate && (
                    <TextComponent
                      field={{ value: formattedDate['d m y'] }}
                      className={clsx(styles['date'], suppressDate?.value ? styles['hide-date']: '')}
                    />
                  )}
                  {shouldRenderItemTitle && <div className={styles['title']}>{title?.value}</div>}

                  {/* <div className={styles['data-hidden']}>
                    {shouldRenderItemDescription && (
                      <TextComponent field={shortDescription} className={styles['description']} />
                    )}
                  </div> */}
                </div>
                <div className={styles['btn-bottom']}>
                  <div className={styles['btn-wrap']}>
                    {shouldRenderButton && <ButtonArrow label={t('label_find_out_more')} />}
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
          );
        })}
        {/* <div onClick={() => loadMore()}>Load more</div> */}
        {isPagination && (
          <div className={styles['loadmore-wrap']} ref={scrollToRef}>
            <Button
              onClick={() => handleLoadMore()}
              isButton
              text={hasNext ? t('label_loadMore') : t('label_loadLess')}
              prefix={
                hasNext ? (
                  <ImageRenderer
                    icon="images/ico_plus.svg"
                    renderSVGInImageTag
                    className={styles['plus_icon']}
                  />
                ) : (
                  <ImageRenderer
                    icon="images/ico_minus.svg"
                    renderSVGInImageTag
                    className={styles['minus_icon']}
                  />
                )
              }
              className={styles['load_more_btn']}
            />
          </div>
        )}
      </div>
    </GlobalStructure>
  );
};
export default NewsListingComponent;
