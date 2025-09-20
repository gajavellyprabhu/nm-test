import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { Placeholder, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import { useGlobalContext } from 'globalContext/context';
import GlobalStructure from 'subComponents/GlobalStructure';
import BasicSelect from 'subComponents/Listing/FilterComponent/SubComponents/BasicSelect';
import ImageRenderer from 'subComponents/ImageRenderer';
import { Navigation } from 'swiper/modules';
import { getLangDir } from 'utils';
import { SwiperSlide, Swiper } from 'swiper/react';
import TextComponent from 'subComponents/TextComponent';
import { v4 } from 'uuid';
import 'swiper/css/navigation';
import 'swiper/css';
// import DesktopTabs from 'subComponents/Listing/FilterComponent/SubComponents/DesktopTabs';

export const Default = (props) => {
  const { fields, rendering, params } = props || {};
  const { Styles } = params;
  let { All, items } = fields || {};
  // let { items, url } = TabItems;
  const { isDesktopLayout, locale } = useGlobalContext();
  const { sitecoreContext } = useSitecoreContext();
  const swiperRef = useRef();
  const isEditing = sitecoreContext?.pageEditing;

  const { t } = useI18n();

  const shouldRenderItems = !!items && items?.length > 0;
  // To Add All view
  if (All) {
    const allItem = {
      displayName: t('All'),
      id: 'All',
      name: 'All',
      fields: { title: { value: t('All') } },
      url: '',
    };
    items = [allItem, ...items, ...items];
  }

  const [activeTab, setActiveTab] = useState(0);
  const [uniqueId, setUniqueId] = useState();

  const handleTabClick = (_i, shouldSlideTo) => {
    setActiveTab(_i);
    if (!!swiperRef?.current) {
      if (_i > 0 && _i < items.length - 1) {
        swiperRef.current.swiper.slideTo(_i - 1);
      } else if (_i >= items.length - 1 || (shouldSlideTo && _i <= 0)) {
        swiperRef.current.swiper.slideTo(_i);
      }
    }
  };
  useEffect(() => {
    !!!uniqueId && setUniqueId(v4());
  }, [uniqueId]);

  return (
    <>
      <GlobalStructure
        paddingClass={Styles}
        anchorId={props?.rendering?.uid}
        className={styles['tabs']}
      >
        <div className="component-sub-content">
          <div className={styles['top-section']}>
            {!isDesktopLayout && shouldRenderItems && (
              <BasicSelect
                items={items}
                handleTabChange={handleTabClick}
                shouldOnClearCapture={!!isEditing}
              />
            )}

            {isDesktopLayout && shouldRenderItems && (
              <div className={clsx(styles['desktop-tabs'], 'flex-it', 'global-swiper-buttons')}>
                <div
                  className={clsx(
                    styles['desktop-tabs-swiper-button-prev'],
                    `desktop-tabs-swiper-button-prev-${uniqueId}`,
                    activeTab === 0 && 'swiper-button-disabled'
                  )}
                  onClick={() => handleTabClick(activeTab - 1, true)}
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
                    <ImageRenderer
                      icon="/images/ico_angle_left.svg"
                      renderSVG
                      width={12}
                      height={14}
                    />
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
                    enabled: false,
                  }}
                  slidesPerView="auto"
                >
                  {items?.map((_item, _i) => {
                    const { title, titleTag } = _item?.fields;
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
                          }}
                          onClickCapture={() => {
                            handleTabClick(_i);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.stopPropagation();
                              handleTabClick(_i);
                            }
                          }}
                          field={title}
                          headingTag={titleTag}
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
                    activeTab === items?.length - 1 && 'swiper-button-disabled'
                  )}
                  onClick={() => handleTabClick(activeTab + 1)}
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
                    <ImageRenderer
                      icon="/images/ico_angle_right.svg"
                      renderSVG
                      width={12}
                      height={14}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </GlobalStructure>
      {isEditing ? (
        <>
          {Object.entries(rendering?.placeholders)?.map((item, i) => {
            const isActive = i === activeTab;
            return (
              <div key={i} className={clsx(!isActive && 'd-none')}>
                <Placeholder name={item?.[0]} rendering={rendering} />
              </div>
            );
          })}
        </>
      ) : (
        <Placeholder name={`jss-tabItem-${activeTab}`} rendering={rendering} />
      )}
    </>
  );
};
