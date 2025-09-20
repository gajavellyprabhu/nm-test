'use client';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';
import ReactPlayer from 'react-player';
import { useMediaQuery } from '@mui/material';

const ReactPlayerCustom = ({
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
}) => {
  const isExtraLargeScreen = useMediaQuery('(min-width:1920px)');
  const isLargeScreen = useMediaQuery('(min-width:769px)');

  let finalSrcResponsive = isExtraLargeScreen
    ? extraLargeScreenSrc
    : isLargeScreen
    ? largeScreenSrc
    : mediumScreenSrc;

  let finalSrc = finalSrcResponsive ?? videoUrl;

  const handleClick = (event) => {
    event.stopPropagation();
    // Your click event handling code here
  };
  return (
    <ReactPlayer
      onClick={handleClick}
      ref={videoRef}
      className={clsx(`${'react-player'}`, styles['custom-player-mp4-youtube'], externalClass)}
      width="100%"
      height="100%"
      url={finalSrc}
      playsinline={autoplay} // ios
      playing={autoplay}
      loop={loop}
      muted={muted}
      controls={showControls}
      config={{
        file: { attributes: { poster: image } },
        youtube: {
          playerVars: {
            controls: showControls,
            showinfo: 0,
            autoplay: autoplay,
            modestbranding: 0,
          },
        },
      }}
    />
  );
};

export default ReactPlayerCustom;
