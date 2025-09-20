// 'use client';
// import PopupHandler from 'subComponents/PopupHandler';
import styles from './styles.module.scss';
import ImageRenderer from 'subComponents/ImageRenderer';
import { useEffect, useRef, useState } from 'react';
import ButtonWithIcon from 'subComponents/ButtonWithIcon';
import Video from 'subComponents/Video';
import clsx from 'clsx';
import GlobalStructure from 'subComponents/GlobalStructure';
import { useGlobalContext } from 'globalContext/context';
import dynamic from 'next/dynamic';
import TitleComponent from 'subComponents/TitleComponent';
import TextComponent from 'subComponents/TextComponent';
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';

const PopupHandler = dynamic(() => import('subComponents/PopupHandler'));

export const Default = (props) => {
  const { isDesktopLayout } = useGlobalContext();
  const { fields, params, rendering } = props;
  const { Styles } = params;
  // const { video, title, description, popupVideo, variation = '' } = fields;
  const {
    // backgroundImage,
    // backgroundImageMobile,
    shortDescription,
    // link,
    posterImage,
    posterImageMobile,
    title,
    titleTag,
    videoLinkDesktop,
    videoLinkExtraLarge,
    videoLinkMobile,
    popupVideoLink,
    popupLabel,
    popupVideoPoster,
  } = fields;
  // const [shouldLoadPopupAfterPageLoad, setShouldLoadPopupAfterPageLoad] = useState(false);

  // useEffect(() => {
  //   const loadVideo = () => {
  //     setShouldLoadPopupAfterPageLoad(true);
  //   };
  //   // Listen for the window load event
  //   window.addEventListener('load', loadVideo);

  //   // Cleanup event listener on component unmount
  //   return () => {
  //     window.removeEventListener('load', loadVideo);
  //   };
  // }, []);

  const shouldRenderVideo = !!videoLinkDesktop?.value?.href;
  const shouldRenderTitle = !!title?.value;
  const shouldRenderShortDescription = !!shortDescription?.value;
  const shouldRenderPopupVideo = !!popupVideoLink?.value?.href;
  // const shouldRenderVideoLbl = !!popupVideo?.label;
  const videoRef = useRef();
  const mainVideoRef = useRef(null);
  // const { extraLargeScreenSrc, largeScreenSrc, mediumScreenSrc } = video;
  // const shouldRenderVideo = !!extraLargeScreenSrc && !!largeScreenSrc && !!mediumScreenSrc;

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

  return (
    <GlobalStructure
      className={clsx(styles['HeroBanner'])}
      isFullWidth
      isNoPadding
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      <div className={styles['video-text-wrap']}>
        <div className={styles['video']}>
          {shouldRenderVideo && (
            <Video
              videoRef={mainVideoRef} // Ref for the main video
              image={isDesktopLayout ? posterImage?.value?.src : posterImageMobile?.value?.src}
              extraLargeScreenSrc={videoLinkExtraLarge?.value?.href}
              largeScreenSrc={videoLinkDesktop?.value?.href}
              mediumScreenSrc={videoLinkMobile?.value?.href}
              forcePosterOnBeforeWindowLoad={true}
            />
          )}
        </div>
        <div className={styles['scroll-arrow-wrap']}>
          <div className={'component-wrapper'}>
            <div className={'component-content no-paddding'}>
              <div className={styles['text-wrap']}>
                <div className={'component-wrapper'}>
                  <div className={'component-content no-paddding'}>
                    <div className={styles['box']}>
                      {shouldRenderTitle && (
                        <TitleComponent
                          field={title}
                          headingTag={titleTag}
                          className={styles['title']}
                        />
                      )}
                      {shouldRenderShortDescription && (
                        <TextComponent field={shortDescription} className={styles['description']} />
                      )}
                      <div className={'buttons flex-it flex-align-item-center'}>
                        {shouldRenderPopupVideo && (
                          <ButtonWithIcon
                            label={popupLabel?.value}
                            icon={'/images/ico_play.svg'}
                            handleClick={() => handlePlayVideo()}
                            className={'play-button'}
                            renderSVGInImageTag
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className={styles['arrow-scroll']}>
                <ImageRenderer
                  icon="/images/down-arrow-scroll.svg"
                  alt="play video"
                  renderSVGInImageTag
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {shouldRenderPopupVideo && (
        <PopupHandler
          className={styles['PopupHandler']}
          videoUrl={popupVideoLink?.value?.href}
          image={popupVideoPoster?.value?.src}
          handleBackdropClick={handleBackdropClick}
          openPopup={isPopupOpen}
          muted={false}
          loop={true}
          autoplay={true}
          showControls={true}
          videoRef={videoRef}
        />
      )}
      <Placeholder
        name="hero-banner-inner"
        {...{ rendering }}
        // modifyComponentProps={(props) => ({ isStandAloneForm, ...props })}
      />
    </GlobalStructure>
  );
};

export const FullWidthOverlay = (props) => {
  const { isDesktopLayout } = useGlobalContext();
  const { fields, params, rendering } = props;
  const { Styles } = params;
  // const { video, title, description, popupVideo, variation = '' } = fields;
  const {
    // backgroundImage,
    // backgroundImageMobile,
    shortDescription,
    // link,
    posterImage,
    posterImageMobile,
    title,
    titleTag,
    videoLinkDesktop,
    videoLinkExtraLarge,
    videoLinkMobile,
    popupVideoLink,
    popupLabel,
    popupVideoPoster,
  } = fields;
  // const [shouldLoadPopupAfterPageLoad, setShouldLoadPopupAfterPageLoad] = useState(false);

  // useEffect(() => {
  //   const loadVideo = () => {
  //     setShouldLoadPopupAfterPageLoad(true);
  //   };
  //   // Listen for the window load event
  //   window.addEventListener('load', loadVideo);

  //   // Cleanup event listener on component unmount
  //   return () => {
  //     window.removeEventListener('load', loadVideo);
  //   };
  // }, []);

  const shouldRenderVideo = !!videoLinkDesktop?.value?.href;
  const shouldRenderTitle = !!title?.value;
  const shouldRenderShortDescription = !!shortDescription?.value;
  const shouldRenderPopupVideo = !!popupVideoLink?.value?.href;
  // const shouldRenderVideoLbl = !!popupVideo?.label;
  const videoRef = useRef();
  const mainVideoRef = useRef(null);

  // const { extraLargeScreenSrc, largeScreenSrc, mediumScreenSrc } = video;
  // const shouldRenderVideo = !!extraLargeScreenSrc && !!largeScreenSrc && !!mediumScreenSrc;

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

  return (
    <GlobalStructure
      className={clsx(styles['HeroBanner'], styles['HeroBannerWithOverlay'], styles['WithNewsWidget'])}
      isFullWidth
      isNoPadding
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      <div className={styles['video-text-wrap']}>
        <div className={styles['video']}>
          {shouldRenderVideo && (
            <Video
              videoRef={mainVideoRef} // Ref for the main video
              image={isDesktopLayout ? posterImage?.value?.src : posterImageMobile?.value?.src}
              extraLargeScreenSrc={videoLinkExtraLarge?.value?.href}
              largeScreenSrc={videoLinkDesktop?.value?.href}
              mediumScreenSrc={videoLinkMobile?.value?.href}
              forcePosterOnBeforeWindowLoad={true}
            />
          )}
        </div>
        <div className={styles['scroll-arrow-wrap']}>
          <div className={'component-wrapper'}>
            <div className={'component-content no-paddding'}>
              <div className={styles['text-wrap']}>
                <div className={'component-wrapper'}>
                  <div className={'component-content no-paddding'}>
                    <div className={styles['box']}>
                      {shouldRenderTitle && (
                        <TitleComponent
                          field={title}
                          headingTag={titleTag}
                          className={styles['title']}
                        />
                      )}
                      {shouldRenderShortDescription && (
                        <TextComponent field={shortDescription} className={styles['description']} />
                      )}
                      <div className={'buttons flex-it flex-align-item-center'}>
                        {shouldRenderPopupVideo && (
                          <ButtonWithIcon
                            label={popupLabel?.value}
                            icon={'/images/ico_play.svg'}
                            handleClick={() => handlePlayVideo()}
                            className={'play-button'}
                            renderSVGInImageTag
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className={styles['arrow-scroll']}>
                <ImageRenderer
                  icon="/images/down-arrow-scroll.svg"
                  alt="play video"
                  renderSVGInImageTag
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {shouldRenderPopupVideo && (
        <PopupHandler
          className={styles['PopupHandler']}
          videoUrl={popupVideoLink?.value?.href}
          image={popupVideoPoster?.value?.src}
          handleBackdropClick={handleBackdropClick}
          openPopup={isPopupOpen}
          muted={false}
          loop={true}
          autoplay={true}
          showControls={true}
          videoRef={videoRef}
        />
      )}
      <Placeholder
        name="hero-banner-inner"
        {...{ rendering }}
        // modifyComponentProps={(props) => ({ isStandAloneForm, ...props })}
      />
    </GlobalStructure>
  );
};