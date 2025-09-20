import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import 'swiper/css/navigation';
import 'swiper/css';
import { getLangDir } from 'utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { v4 } from 'uuid';
import { useGlobalContext } from 'globalContext/context';
import { useListingComponentContext } from 'subComponents/Listing/context/ListingComponentContext';
import ImageRenderer from 'subComponents/ImageRenderer';
import TextComponent from 'subComponents/TextComponent';

// Made for filters components or tabs Components.
// For filters the data come from the graphql and we pass it as 'allFilters' prop. The 'handleChangeFilter' prop handles the change in filter.
// For tabs component the data comes from a data source and we pass it as 'items' props. The 'handleTabChange' prop handles the tab change
const DesktopTabs = (props) => {
  const { items, handleTabChange, shouldOnClearCapture, facetOnTag } = props;
  const { allFilters, handleChangeFilter } = useListingComponentContext();
  const { locale } = useGlobalContext();
  const swiperRef = useRef();
  const isFiltersSource = !!allFilters && allFilters?.length > 0;
  const shouldRenderItems = !!items && items?.length > 0;
  const [activeTab, setActiveTab] = useState(0);
  const [uniqueId, setUniqueId] = useState();

  const handleTabClick = (_i) => {
    setActiveTab(_i);
    swiperRef.current.swiper.slideTo(_i);
  };

  const renderNavigationButtons =
    swiperRef?.current?.swiper?.virtualSize > swiperRef?.current?.swiper?.width;

  useEffect(() => {
    !!!uniqueId && setUniqueId(v4());
  }, [uniqueId]);

  return (
    <div className={clsx(styles['desktop-tabs'], 'flex-it', 'global-swiper-buttons')}>
      <div
        className={clsx(
          styles['desktop-tabs-swiper-button-prev'],
          `desktop-tabs-swiper-button-prev-${uniqueId}`,
          (swiperRef?.current?.swiper?.activeIndex === 0 || !renderNavigationButtons) &&
            'swiper-button-disabled'
        )}
      >
        <div
          className="global-swiper-button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.target.click();
            }
          }}
        >
          <ImageRenderer icon="/images/ico_angle_left.svg" renderSVG width={12} height={14} />
        </div>
      </div>
      <Swiper
        ref={swiperRef}
        loop={false}
        dir={getLangDir(locale)}
        spaceBetween={24}
        className={styles['tabs-swiper']}
        modules={[Navigation]}
        navigation={{
          nextEl: `.desktop-tabs-swiper-button-next-${uniqueId}`, // Use CSS Module class reference
          prevEl: `.desktop-tabs-swiper-button-prev-${uniqueId}`,
        }}
        slidesPerView="auto"
        onSlideChange={(e) => {
          setActiveTab(e.activeIndex);
          handleTabChange(e.activeIndex);
        }}
      >
        {isFiltersSource
          ? allFilters?.map((item, i) => {
              const { items, filterCategory } = item;
              return items?.map((_item, _i) => {
                const { name, value } = _item;
                const isTabActive = activeTab === _i;
                return (
                  <SwiperSlide
                    className={clsx(styles['tab-container'], styles['swiper-slide'])}
                    key={_i}
                    tabIndex={0}
                  >
                    <TextComponent
                      className={clsx(isTabActive && styles['active'], styles['tab'])}
                      onClick={() => {
                        handleChangeFilter({ filterCategory, value });
                        handleTabClick(_i);
                      }}
                      {...(!!shouldOnClearCapture && {
                        onClickCapture: () => {
                          handleChangeFilter({ filterCategory, value });
                          handleTabClick(_i);
                        },
                      })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.stopPropagation();
                          handleChangeFilter({ filterCategory, value });
                          handleTabClick(_i);
                        }
                      }}
                      field={{ value: name }}
                      {...(value !== '' && { headingTag: facetOnTag })}
                    />
                    {isTabActive && <div className={styles['underline']} />}
                  </SwiperSlide>
                );
              });
            })
          : items?.map((_item, _i) => {
              const { title } = _item?.fields;
              const isTabActive = activeTab === _i;
              return (
                <SwiperSlide
                  className={clsx(styles['tab-container'], styles['swiper-slide'])}
                  key={_i}
                  tabIndex={0}
                >
                  <TextComponent
                    className={clsx(isTabActive && styles['active'], styles['tab'])}
                    onClick={() => {
                      handleTabClick(_i);
                      handleTabChange(_i);
                    }}
                    {...(!!shouldOnClearCapture && {
                      onClickCapture: () => {
                        handleTabClick(_i);
                        handleTabChange(_i);
                      },
                    })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.stopPropagation();
                        handleTabClick(_i);
                        handleTabChange(_i);
                      }
                    }}
                    field={title}
                    headingTag={facetOnTag}
                  />
                  {isTabActive && <div className={styles['underline']} />}
                </SwiperSlide>
              );
            })}
      </Swiper>
      <div
        className={clsx(
          styles['desktop-tabs-swiper-button-next'],
          `desktop-tabs-swiper-button-next-${uniqueId}`,
          !renderNavigationButtons && 'swiper-button-disabled'
        )}
      >
        <div
          className="global-swiper-button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.target.click();
            }
          }}
        >
          <ImageRenderer icon="/images/ico_angle_right.svg" renderSVG width={12} height={14} />
        </div>
      </div>
    </div>
  );
};
export default DesktopTabs;
