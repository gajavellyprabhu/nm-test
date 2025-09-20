'use client';
import { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import GlobalStructure from 'subComponents/GlobalStructure';
import ImageRenderer from 'subComponents/ImageRenderer';
import { useGlobalContext } from 'globalContext/context';
import Video from 'subComponents/Video';
import { v4 } from 'uuid';
import ButtonWithIcon from 'subComponents/ButtonWithIcon';
import TitleComponent from 'subComponents/TitleComponent';
import TextComponent from 'subComponents/TextComponent';
import Button from 'subComponents/Button';
import dynamic from 'next/dynamic';
import ButtonArrow from 'subComponents/ButtonArrow';
import { useI18n } from 'next-localization';
import { dateFormat } from '../../Helpers/dateTimeHelper';

const PopupHandler = dynamic(() => import('subComponents/PopupHandler'));

export const Default = (props) => {
  const { fields, params } = props;
  const { Styles } = params;
  const {
    title,
    titleTag,
    firstTitle,
    firstTitleTag,
    firstDescription,
    detailImage,
    detailTitle,
    detailTitleTag,
    detailDate,
    detailDescription,
    popupLabel,
    popupVideoLink,
    secondTitle,
    secondTitleTag,
    secondDescription,
    thirdTitle,
    thirdTitleTag,
    thirdDescription,
    image,
    videoLinkDesktop,
    videoLinkExtraLarge,
    backgroundVideo
  } = fields;
  const [uniqueId, setUniqueId] = useState();
  const { locale, isDesktopLayout } = useGlobalContext();

  const shouldRenderTitle = !!title?.value;

  const shouldRenderPopupVideo = !!popupVideoLink?.value?.href;
  const shouldRenderPopupImage = !!detailImage?.value?.src;
  // const shouldRenderVideo =
  //   !!videoLinkDesktop?.value?.href && !!videoLinkExtraLarge?.value?.href;
  const shouldRenderVideo =
    !!backgroundVideo?.value?.href;
  // const poster = posterImage?.value?.src;
  const { t } = useI18n();

  const shouldRenderCard = !!detailTitle?.value || !!detailImage?.value?.src;

  const videoRef = useRef();
  const mainVideoRef = useRef(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleBackdropClick = () => {
    setIsPopupOpen((prev) => !prev);
    videoRef?.current?.player?.player?.player?.pause();

    if (isPopupOpen) {
      // Resume the main video after closing the popup
      const mainPlayer = mainVideoRef.current;
      if (mainPlayer && typeof mainPlayer.play === 'function') {
        mainPlayer.play();
      }
    } else {
      // Open the popup - Pause the main video
      const mainPlayer = mainVideoRef.current;
      if (mainPlayer && typeof mainPlayer.pause === 'function') {
        mainPlayer.pause();
      }
    }
  };
  const handlePlayVideo = () => {
    setIsPopupOpen(true);
    videoRef?.current?.player?.player?.player?.play();
    // Pause the main video when opening the popup
    const mainPlayer = mainVideoRef.current;
    if (mainPlayer && typeof mainPlayer.pause === 'function') {
      mainPlayer.pause();
    }
  };
  useEffect(() => {
    videoRef?.current?.player?.player?.player?.pause();
  }, [videoRef]);
  useEffect(() => {
    !!!uniqueId && setUniqueId(v4());
  }, [uniqueId]);

  let formattedDate = dateFormat(detailDate?.value, locale);

  // Concatenate the values
  // Create the concatenated object
  const concatenatedValue = {
    value: `${detailTitle.value} | ${formattedDate['m d']}`
  }; return (
    <GlobalStructure
      className={styles['ProgressBar']}
      isFullWidth
      isNoPadding
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      {!!uniqueId && (
        <div className={styles['video-text-wrap']}>
          <div
            className={styles['videos']}
          >
            <div className={clsx(styles['video'], styles['selected'])}>
              {shouldRenderVideo ? <Video
                // extraLargeScreenSrc={videoLinkExtraLarge?.value?.href}
                // largeScreenSrc={videoLinkDesktop?.value?.href}
                // mediumScreenSrc={videoLinkMobile?.value?.href}
                videoRef={mainVideoRef} // Ref for the main video
                extraLargeScreenSrc={backgroundVideo?.value?.href}
                largeScreenSrc={backgroundVideo?.value?.href}
                mediumScreenSrc={backgroundVideo?.value?.href}
                image={image?.value?.src}
              />
                : (<ImageRenderer
                  desktopSrc={image}
                  mobileSrc={image}
                />)}
            </div>
          </div>
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
                    <div className={clsx(styles['inline-grid-mobile'], 'flex-it')}>
                      {shouldRenderCard && <div className={styles['card-box']} onClick={() => handlePlayVideo()}>
                        {shouldRenderPopupImage && (
                          <div className={clsx(styles['poster-image'])}>
                            <div className={clsx(styles['image-container'])}>
                              <ImageRenderer
                                desktopSrc={detailImage}
                                mobileSrc={detailImage}
                                className={clsx(styles['image'])}
                              />
                            </div>
                            {shouldRenderPopupVideo && (
                              <ImageRenderer
                                icon={'/images/ico_play.svg'}
                                className={clsx(styles['play-btn'], 'play-button')}
                                renderSVGInImageTag
                              />
                            )}
                          </div>
                        )}
                        <div className={clsx(styles['box-data'])}>
                          {!!detailTitle?.value && (
                            <TitleComponent
                              field={concatenatedValue}
                              headingTag={detailTitleTag}
                              className={styles['title']}
                            />
                          )}
                          {!!detailDescription?.value && (
                            <TextComponent field={detailDescription} className={styles['description']} />
                          )}
                          <div className={styles['btn-bottom']}>
                            <div className={styles['btn-wrap']}>
                              {shouldRenderPopupVideo && (
                                <ButtonArrow label={popupLabel?.value} />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>}
                      <div className={clsx(styles['progress-bar'])}>
                        {!!firstTitle?.value && <>
                          {
                            !!firstTitle?.value && (
                              <TitleComponent
                                field={firstTitle}
                                className={styles['text']}
                                headingTag={firstTitleTag}
                              />
                            )
                          }
                          {!!firstDescription?.value && (
                            <TextComponent field={firstDescription} className={styles['description']} />
                          )}
                        </>
                        }
                        {!!secondTitle?.value && <>
                          {
                            !!secondTitle?.value && (
                              <TitleComponent
                                field={secondTitle}
                                className={styles['text']}
                                headingTag={secondTitleTag}
                              />
                            )
                          }
                          {!!secondDescription?.value && (
                            <TextComponent field={secondDescription} className={styles['description']} />
                          )}
                        </>
                        }
                        {!!thirdTitle?.value && <>
                          {
                            !!thirdTitle?.value && (
                              <TitleComponent
                                field={thirdTitle}
                                className={styles['text']}
                                headingTag={thirdTitleTag}
                              />
                            )
                          }
                          {!!thirdDescription?.value && (
                            <TextComponent field={thirdDescription} className={styles['description']} />
                          )}
                        </>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {shouldRenderPopupVideo && (
        <PopupHandler
          className={styles['PopupHandler']}
          videoUrl={popupVideoLink?.value?.href}
          image={detailImage?.value?.src}
          handleBackdropClick={handleBackdropClick}
          openPopup={isPopupOpen}
          muted={false}
          loop={true}
          autoplay={true}
          showControls={true}
          videoRef={videoRef}
        />
      )}
    </GlobalStructure>
  );
};
