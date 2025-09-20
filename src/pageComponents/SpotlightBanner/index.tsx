import clsx from 'clsx';
import { useGlobalContext } from 'globalContext/context';
import React from 'react';
import ButtonTertiary from 'subComponents/ButtonTertiary';
import ImageRenderer from 'subComponents/ImageRenderer';
import TitleComponent from 'subComponents/TitleComponent';
import Video from 'subComponents/Video';
import styles from './styles.module.scss';
import { SpotlightBannerProps } from './types';

export const Default: React.FC<SpotlightBannerProps> = (props) => {
  const { isDesktopLayout } = useGlobalContext();
  const { uid, fields } = props;
  const {
    link,
    title,
    titleTag,
    videoLinkDesktop,
    posterImage,
    posterImageMobile,
    videoLinkExtraLarge,
    videoLinkMobile,
  } = fields;
  const isVideo = videoLinkDesktop?.value.href;
  const CTA = link?.value;

  const renderMedia = () => {
    if (isVideo) {
      return (
        <Video
          image={isDesktopLayout ? posterImage?.value?.src : posterImageMobile?.value?.src}
          extraLargeScreenSrc={videoLinkExtraLarge?.value?.href}
          largeScreenSrc={videoLinkDesktop?.value?.href}
          mediumScreenSrc={videoLinkMobile?.value?.href}
          forcePosterOnBeforeWindowLoad={true}
        />
      );
    }

    return <ImageRenderer mobileSrc={posterImageMobile} desktopSrc={posterImage} />;
  };

  return (
    <div className={styles['banner-container']} id={uid}>
      <div className={styles['media-container']}>{renderMedia()}</div>
      <div className={styles['content-overlay']}>
        <div className={clsx(styles['banner-wrapper'], 'component-content', 'no-paddding')}>
          <div
            className={styles['banner-content']}
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
          >
            {!!title?.value && (
              <TitleComponent field={title} headingTag={titleTag} className={styles['title']} />
            )}

            <div
              className={'flex-it'}
              data-aos="fade-up"
              data-aos-offset="-100"
              data-aos-delay="50"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
            >
              {CTA?.text && (
                <ButtonTertiary
                  text={CTA.text}
                  href={CTA.href}
                  {...(CTA.target === '_blank'
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className={CTA.class}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
