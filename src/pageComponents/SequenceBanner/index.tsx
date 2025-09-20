'use client';

import clsx from 'clsx';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import GlobalStructure from 'subComponents/GlobalStructure';
import TextComponent from 'subComponents/TextComponent';
import TitleComponent from 'subComponents/TitleComponent';
import Video from 'subComponents/Video';
import styles from './styles.module.scss';
import { SequenceBannerProps } from './types';

export const Default = (props: SequenceBannerProps) => {
  console.log('SequenceBanner props:', props);
  const fields = props.fields;
  const { title, titleTag } = fields;
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const videoBRef = useRef<HTMLVideoElement | null>(null);
  const videoARef = useRef<HTMLVideoElement | null>(null);

  const startScrub = 0.1;
  const endScrub = 0.85;

  const opacityA = useTransform(scrollYProgress, [0, startScrub], [1, 0]);
  const opacityB = useTransform(scrollYProgress, [startScrub, startScrub + 0.1], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  useEffect(() => {
    const videoB = videoBRef.current;
    if (!videoB) return;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const duration = videoB.duration || 0;
      if (latest > startScrub && latest < endScrub) {
        const scrubProgress = (latest - startScrub) / (endScrub - startScrub);
        videoB.currentTime = scrubProgress * duration;
      }
      if (latest >= endScrub) {
        videoB.currentTime = duration;
      }
      if (latest <= startScrub) {
        videoB.currentTime = 0;
      }
    });

    {
      /*const opacityA = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const opacityB = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  useEffect(() => {
    const videoB = videoBRef.current;
    if (!videoB) return;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const duration = videoB.duration || 0;
      if (latest > 0.4 && latest < 0.8) {
        const scrubProgress = (latest - 0.1) / 0.6;
        videoB.currentTime = scrubProgress * duration;
      }
      if (latest >= 0.8) {
        videoB.currentTime = duration;
      }
      if (latest <= 0.2) {
        videoB.currentTime = 0;
      }
    }); */
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoARef.current?.play();
        }
      },
      { threshold: 0.1 }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      unsubscribe();
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [scrollYProgress]);

  return (
    <GlobalStructure
      isFullWidth={true}
      paddingClass={''}
      anchorId={''}
      style={undefined}
      className={''}
      isNoPadding={true}
      defaultPaddingClass={undefined}
      isExpendRight={false}
      isExpendLeft={false}
      componentContentClass={undefined}
    >
      <section ref={targetRef} className={styles.sequenceBanner}>
        <div className={styles.scrollArea}>
          <div className={styles.stickyContainer}>
            <motion.div style={{ opacity: opacityA }}>
              <Video
                externalClass={styles.video}
                videoRef={videoARef}
                extraLargeScreenSrc={fields.sequence1video.value.href}
                largeScreenSrc={fields.sequence1video.value.href}
                mediumScreenSrc={
                  fields.mobileSequence1video?.value.href ?? fields.sequence1video.value.href
                }
                autoPlay
                loop
                muted
                playsInline
              />
            </motion.div>

            <motion.div style={{ opacity: opacityB }}>
              <Video
                externalClass={styles.video}
                videoRef={videoBRef}
                extraLargeScreenSrc={fields.sequence2video.value.href}
                largeScreenSrc={fields.sequence2video.value.href}
                mediumScreenSrc={
                  fields.mobileSequence2video?.value.href ?? fields.sequence2video.value.href
                }
                forcePosterOnBeforeWindowLoad={false}
                preload="auto"
                loop={false}
                muted
                playsInline
              />
            </motion.div>
            <motion.div
              style={{ opacity: textOpacity }}
              className={styles.textOverlay}
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
            >
              <div className={clsx(styles['textContainer'], 'component-content', 'no-paddding')}>
                {!!title?.value && (
                  <TitleComponent field={title} headingTag={titleTag} className={styles['title']} />
                )}
                {fields.shortDescription?.value && (
                  <TextComponent
                    field={fields.shortDescription}
                    headingTag={{ value: 'h4' }}
                    className={styles.description}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </GlobalStructure>
  );
};
