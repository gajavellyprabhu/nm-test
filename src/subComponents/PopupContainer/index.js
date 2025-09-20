'use client';
import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { useEffect } from 'react';
import ImageRenderer from '../ImageRenderer';

const PopupContainer = ({
  children,
  isPopupOpen,
  className,
  handleBackdropClick,
  style = { zIndex: 200, backgroundColor: 'rgba(0, 0, 0, 0.7)' },
  showShadow = false,
  innerShadowContent = null,
}) => {
  useEffect(() => {
    if (isPopupOpen) {
      document.body.classList.add('body-overflow-hidden');
    } else {
      document.body.classList.remove('body-overflow-hidden');
    }
  }, [isPopupOpen]);

  return (
    <Backdrop
      onClick={handleBackdropClick}
      sx={style}
      open={isPopupOpen}
      className={clsx(styles['PopupContainer'], className)}
    >
      <div
        className={clsx('player-video-full', 'flex-it flex-align-item-center flex-justify-center')}
      >
        <div className={'player-video-wrap'}>
          <div className={('auto', 'player-wrapper')}>
            <div className="player-inner">
              <div className={'close'}>
                <ImageRenderer
                  className={styles['close-icon']}
                  icon={`/images/ico_18x18_close_white.svg`}
                />
              </div>
              {children}
            </div>
          </div>
        </div>
        {!!showShadow ? innerShadowContent() : null}
      </div>
    </Backdrop>
  );
};

export default PopupContainer;
