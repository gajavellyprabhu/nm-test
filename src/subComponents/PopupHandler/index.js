'use client';
import React from 'react';
import PopupContainer from '../PopupContainer';
import Video from '../Video';

const PopupHandler = ({
  openPopup,
  videoUrl,
  image,
  shouldShowControls,
  handleBackdropClick,
  muted,
  loop,
  showControls,
  videoRef,
  autoplay,
}) => {
  const isYouTube = videoUrl?.includes('youtube.com') || videoUrl?.includes('youtu.be') || videoUrl?.includes('vimeo');
  return (
    <PopupContainer isPopupOpen={openPopup} handleBackdropClick={() => handleBackdropClick()} className={isYouTube ? 'isYoutubePopup' : ''}>
      {openPopup && <Video
        muted={muted}
        loop={loop}
        videoRef={videoRef}
        showControls={showControls}
        autoplay={autoplay}
        {...{ shouldShowControls, image, videoUrl }}
        className={'remove-content'}
        forcePosterOnBeforeWindowLoad={true}
      />
      }
    </PopupContainer>
  );
};

export default PopupHandler;
