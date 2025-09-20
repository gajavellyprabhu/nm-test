import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useGlobalContext } from 'globalContext/context';
import GlobalStructure from 'subComponents/GlobalStructure';
import { Navigation } from 'swiper/modules';
import { getLangDir } from 'utils';
import { SwiperSlide, Swiper } from 'swiper/react';
import TextComponent from 'subComponents/TextComponent';
import { v4 } from 'uuid';
import 'swiper/css/navigation';
import 'swiper/css';
import FeaturedDetails from './FeatureDetails/index';
import TitleComponent from 'subComponents/TitleComponent';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const Default = (props) => {
  const { fields, params } = props || {};
  const { Styles } = params;
  let { items, title, titleTag, link } = fields || {};
  const { isDesktopLayout, locale } = useGlobalContext();
  const { sitecoreContext } = useSitecoreContext();
  const swiperRef = useRef();
  const isEditing = sitecoreContext?.pageEditing;
  const [fadeClass, setFadeClass] = useState('');
  const shouldRenderTitle = !!title?.value;
  const shouldRenderHyperlink = !!link?.value?.href;
  const shouldRenderItems = !!items && items?.length > 0;

  const [activeTab, setActiveTab] = useState(0);
  const [uniqueId, setUniqueId] = useState();

  const [key, setKey] = useState(0); // Add state for triggering re-render

  const handleTabClick = (index) => {
    setActiveTab(index);
    setKey((prevKey) => prevKey + 1); // Increment the key to force re-render
    if (swiperRef?.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };
  useEffect(() => {
    !uniqueId && setUniqueId(v4());
  }, [uniqueId]);

  return (
    <GlobalStructure
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
      className={styles['tabs']}
    >
      <div className="component-sub-content">
        <div className={clsx(styles['top'], 'flex-it flex-justify-between')}
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out">
          {shouldRenderTitle && (
            <TitleComponent headingTag={titleTag} className={styles['title']} field={title} />
          )}
          {shouldRenderHyperlink && (
            <div className={clsx(styles["learn-more"], "flex-it")}>
              <a href={link.value.href} className="primary-button fit-height">
                {link.value.text}
              </a>
            </div>
          )}
        </div>
        <div className={styles['top-section']}>
          <div className={clsx(styles['desktop-tabs'], 'flex-it', 'global-swiper-buttons')}>
            <Swiper
              ref={swiperRef}
              loop={false}
              dir={getLangDir(locale)}
              spaceBetween={24}
              className={styles['tabs-swiper']}
              modules={[Navigation]}
              slidesPerView="auto"
            >
              {shouldRenderItems && items.map((tab, index) => (
                <SwiperSlide
                  key={index}
                  role="tab"
                  aria-selected={activeTab === index}
                  tabIndex={activeTab === index ? 0 : -1}
                  className={clsx(styles['tab-container'], styles['swiper-slide'])}
                >
                  <TextComponent
                    className={clsx(activeTab === index && styles['active'], styles['tab'])}
                    // Disable onClick for the active tab
                    onClick={activeTab !== index ? () => handleTabClick(index) : undefined}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && activeTab !== index) {
                        handleTabClick(index);
                      }
                    }}
                    field={tab.tabName}
                    headingTag={tab.tabNameTag}
                  />
                  {activeTab === index && <div className={styles['underline']} />}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Tab Content */}
        {shouldRenderItems && items[activeTab] && (
          <div key={key} className={clsx(styles['tab-content'], fadeClass)} >
            <FeaturedDetails {...{ ...items[activeTab] }} />
          </div>
        )}
      </div>
    </GlobalStructure>
  );
};
