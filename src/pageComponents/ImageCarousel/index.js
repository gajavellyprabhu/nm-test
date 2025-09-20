/* eslint-disable react/no-unescaped-entities */
'use client';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import GlobalStructure from 'subComponents/GlobalStructure';
import ImageRenderer from 'subComponents/ImageRenderer';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useGlobalContext } from 'globalContext/context';
import { getLangDir } from 'utils';
import { v4 } from 'uuid';
import TitleComponent from 'subComponents/TitleComponent';
import TextComponent from 'subComponents/TextComponent';

export const Default = (props) => {
  const { locale } = useGlobalContext();
  const [uniqueId, setUniqueId] = useState();
  const { fields, params } = props;
  const { Styles } = params;
  const {
    title,
    titleTag,
    shortDescription,
    // borderedText,
    link,
    infographics,
    backgroundImage,
    items,
    isDarkBackground,
    anchorId,
  } = fields;

  const { Styles: sitecoreParams } = params;

  const isPortrait = sitecoreParams?.includes('portrait');

  const shouldRenderTitle = !!title?.value;
  const shouldRenderShortDescription = !!shortDescription?.value;
  const shouldRenderLink = !!link?.value?.text;
  const shouldRenderCards = !!infographics?.length;
  const shouldRenderSlides = !!items?.length;
  const shouldRenderbackgroundImage = !!backgroundImage?.desktopSrc;
  // const shouldRenderBorderedText =
  //   !!borderedText?.title || !!borderedText?.description;
  // const shouldRenderBorderedTitle = !!borderedText?.title;
  // const shouldRenderBorderedDescription = !!borderedText?.description;

  useEffect(() => {
    !!!uniqueId && setUniqueId(v4());
  }, [uniqueId]);

  return (
    <GlobalStructure
      className={clsx(styles['ImageCarousel'], !!isDarkBackground && styles['background_color'])}
      isFullWidth
      isExpendRight
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      <div
        className={styles['content-container']}
        data-aos="fade-up"
        data-aos-offset="400"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
      >
        <div className={styles['content']}>
          {/* {shouldRenderTitle && <div className={styles['title']}>{title}</div>} */}
          {shouldRenderTitle && (
            <TitleComponent headingTag={titleTag} field={title} className={styles['title']} />
          )}

          {/* {shouldRenderDescription && <div className={styles['description']}>{description}</div>} */}
          {shouldRenderShortDescription && (
            <TextComponent field={shortDescription} className={styles['description']} />
          )}

          {/* {shouldRenderBorderedText && (
            <div className={styles["list-item-wrapper"]}>
              <div className={styles["gradient-divider"]} />
              <div className={styles["list-item"]}>
                {shouldRenderBorderedTitle && (
                  <div className={styles["title"]}>{borderedText?.title}</div>
                )}
                {shouldRenderBorderedDescription && (
                  <div className={styles["description"]}>
                    {borderedText?.description}
                  </div>
                )}
              </div>
            </div>
          )} */}

          {shouldRenderLink && (
            <a
              aria-label={link?.value?.text}
              href={link?.value?.href}
              className={clsx('primary-button', styles['learn-more-button'])}
            >
              {link?.value?.text}
            </a>
          )}
        </div>
        {shouldRenderSlides && !!uniqueId && (
          <div className={styles['image']}>
            <Swiper
              loop={false}
              spaceBetween={32}
              dir={getLangDir(locale)}
              pagination={{
                el: `.global-swiper-pagination-${uniqueId}`,
                type: 'progressbar',
              }}
              className={styles['cards-wrapper']}
              modules={[Navigation, Pagination]}
              navigation={{
                nextEl: `.contentGalleryComponent-swiper-button-next-${uniqueId}`,
                prevEl: `.contentGalleryComponent-swiper-button-prev-${uniqueId}`,
              }}
              slidesPerView="auto"
            >
              {items?.map((item, i) => {
                const { image, imageMobile } = item?.fields;
                return (
                  <SwiperSlide
                    key={i}
                    className={clsx(styles['image_slide'], isPortrait && styles['portrait'])}
                  >
                    <ImageRenderer
                      className={styles['img']}
                      desktopSrc={image}
                      mobileSrc={imageMobile}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
      {!!uniqueId && shouldRenderSlides && items?.length > 1 && (
        <div className="global-swiper-buttons default-padding-left">
          <div className="global-swiper-pagination-wrap">
            <div className={`global-swiper-pagination global-swiper-pagination-${uniqueId}`} />
          </div>
          <div className="global-nav-wrap">
            <div className={`contentGalleryComponent-swiper-button-prev-${uniqueId}`}>
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
            <div className={`contentGalleryComponent-swiper-button-next-${uniqueId}`}>
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
      {shouldRenderCards && (
        <div className={clsx(styles['logo-list'], 'default-padding-left')}>
          {infographics?.map((item, i) => {
            const { icon, title } = item?.fields;
            return (
              <div
                key={i}
                className={styles['logo']}
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="50"
                // data-aos-duration={(i + 2) * 100}
                data-aos-duration={'200'}
                data-aos-easing="ease-in-out"
              >
                <ImageRenderer
                  className={styles['image']}
                  desktopSrc={icon}
                  renderSVGInImageTag
                  // mobileSrc={imageMobile}
                />
                {/* <p className={styles['text']}>{text}</p> */}
                <TextComponent className={styles['text']} field={title} />
              </div>
            );
          })}
        </div>
      )}
      {shouldRenderbackgroundImage && (
        <ImageRenderer
          // {...backgroundImage}
          className={styles['background-pattern']}
          mobileSrc={backgroundImage.mobileSrc}
          desktopSrc={backgroundImage.desktopSrc}
          alt={backgroundImage.alt}
        />
      )}
    </GlobalStructure>
  );
};
