import React, { useRef, useEffect, useState, memo } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';
import { useGlobalContext } from 'globalContext/context';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const ReactPlayerCustomDebes = memo(
  ({
    videoUrl,
    image,
    externalClass = '',
    showControls = false,
    muted = true,
    loop = true,
    videoRef,
    autoplay = true,
    extraLargeScreenSrc,
    largeScreenSrc,
    mediumScreenSrc,
    forcePosterOnBeforeWindowLoad: forcePosterOnBeforeWindowLoadProp,
  }) => {
    const { isDesktopLayout } = useGlobalContext();
    const isExtraLargeScreen = useMediaQuery('(min-width:1920px)');
    const isLargeScreen = useMediaQuery('(min-width:769px)');
    const [shouldLoadPlayer, setShouldLoadPlayer] = useState(false);
    const [forcePosterOnBeforeWindowLoad, setForcePosterOnBeforeWindowLoad] = useState(
      forcePosterOnBeforeWindowLoadProp
    );

    // Determine the responsive video source
    let finalSrcResponsive;
    if (isExtraLargeScreen || isLargeScreen) {
      finalSrcResponsive = isExtraLargeScreen
        ? extraLargeScreenSrc
        : isLargeScreen
        ? largeScreenSrc
        : mediumScreenSrc;
    } else {
      finalSrcResponsive = isDesktopLayout ? largeScreenSrc : mediumScreenSrc;
    }
    const finalSrc = finalSrcResponsive ?? videoUrl;

    // Detect platform
    const isVimeo = finalSrc?.includes('player.vimeo');
    const isYouTube = finalSrc?.includes('youtube.com') || finalSrc?.includes('youtu.be');

    // Ref for the video element
    const localVideoRef = useRef(null);
    const videoElementRef = videoRef || localVideoRef;

    // useEffect(() => {
    //   const loadPlayer = () => {
    //     setShouldLoadPlayer(true);
    //   };

    //   if (!shouldLoadPlayer) {
    //     setTimeout(() => {
    //       loadPlayer();
    //     }, 3500); // Delay for demo
    //   }
    // }, [finalSrc]);

    useEffect(() => {
      if (isVimeo || isYouTube) {
        setShouldLoadPlayer(true);
      } else if (!shouldLoadPlayer) {
        const timeout = setTimeout(() => {
          setShouldLoadPlayer(true);
        }, 3500); // Keep delay for other platforms if needed
        return () => clearTimeout(timeout);
      }
    }, [finalSrc, isVimeo, shouldLoadPlayer, isYouTube])

    return isYouTube || isVimeo ? (
      shouldLoadPlayer && (
        <ReactPlayer
          onClick={(e) => e.stopPropagation()}
          ref={videoElementRef}
          className={clsx('react-player', styles['custom-player-mp4-youtube'], externalClass)}
          width="100%"
          height="100%"
          url={finalSrc}
          playing={autoplay}
          loop={loop}
          muted={muted}
          controls={showControls}
          config={{
            youtube: {
              playerVars: {
                controls: showControls ? 1 : 0,
                autoplay: autoplay ? 1 : 0,
                modestbranding: 1,
              },
            },
            vimeo: {
              autoplay: autoplay,
              loop: loop,
              muted: muted,
              dnt: true, // Do Not Track
              preload: 'auto', // Preload for Vimeo
            },
          }}
        />
      )
    ) : (
      <div
        className={clsx('react-player', styles['custom-player-mp4-youtube'])}
        style={{ width: '100%', height: '100%' }}
      >
        <video
          ref={videoElementRef}
          width="100%"
          height="100%"
          className={clsx(externalClass)}
          src={finalSrc}
          {...(forcePosterOnBeforeWindowLoad && { poster: image })}
          playsInline
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          controls={showControls}
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    );
  }
);

export default ReactPlayerCustomDebes;
