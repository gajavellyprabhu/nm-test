import { AnimatePresence, motion, Variants } from 'framer-motion';
import React from 'react';
import ImageRenderer from 'subComponents/ImageRenderer';
import styles from './styles.module.scss';
import { USPCardProps } from './types';

export const USPCard: React.FC<USPCardProps> = ({
  item,
  index,
  activeIndex,
  totalSlides,
  onCardClick,
  slideIndex,
}) => {
  const { title, subtitle, shortDescription, image, titleTag } = item.fields;
  const titleElement = titleTag?.value || 'h3';
  const isActive = activeIndex === index;

  const getSlidePosition = (slideIndex: number, totalSlides: number) => {
    let distance = slideIndex - activeIndex;

    if (distance > totalSlides / 2) {
      distance = distance - totalSlides;
    } else if (distance < -totalSlides / 2) {
      distance = distance + totalSlides;
    }

    return distance;
  };

  const getCardVariants = (slideIndex: number): Variants => {
    const position = getSlidePosition(slideIndex, totalSlides);

    return {
      center: {
        scale: 1,
        opacity: 1,
        zIndex: 100,
        x: 0,
        rotateY: 0,
        filter: 'brightness(1) blur(0px)',
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
      adjacent: {
        scale: 0.8,
        opacity: 0.8,
        zIndex: 50,
        x: position < 0 ? -30 : 30,
        rotateY: position < 0 ? 15 : -15,
        filter: 'brightness(0.8) blur(1px)',
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
      backdrop: {
        scale: 0.6,
        opacity: 0.6,
        zIndex: 25,
        x: position < 0 ? -50 : 50,
        rotateY: position < 0 ? 25 : -25,
        filter: 'brightness(0.6) blur(2px)',
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
      hidden: {
        scale: 0.4,
        opacity: 0.4,
        zIndex: 10,
        x: position < 0 ? -70 : 70,
        rotateY: position < 0 ? 35 : -35,
        filter: 'brightness(0.4) blur(3px)',
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    };
  };

  const getAnimationState = (slideIndex: number): string => {
    const position = Math.abs(getSlidePosition(slideIndex, totalSlides));

    if (position === 0) return 'center';
    if (position === 1) return 'adjacent';
    if (position === 2) return 'backdrop';
    return 'hidden';
  };

  const currentSlideIndex = slideIndex !== undefined ? slideIndex : index;
  const variants = getCardVariants(currentSlideIndex);
  const animationState = getAnimationState(currentSlideIndex);

  return (
    <motion.div
      className={styles.cardWrapper}
      variants={variants}
      animate={animationState}
      initial="hidden"
      onClick={() => onCardClick(index)}
    >
      <motion.article
        className={`${styles.uspCard} ${isActive ? styles.active : ''}`}
        whileHover={isActive ? { scale: 1.02 } : {}}
      >
        {image?.value?.src && (
          <div className={styles.imageContainer}>
            <ImageRenderer desktopSrc={image} mobileSrc={image} alt={image.value.alt} />

            {!isActive && (
              <motion.div
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </div>
        )}

        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              className={styles.content}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {subtitle?.value && (
                <motion.span
                  className={styles.subtitle}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  {subtitle.value}
                </motion.span>
              )}

              {title?.value &&
                React.createElement(
                  titleElement as keyof JSX.IntrinsicElements,
                  {
                    className: styles.title,
                  },
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    {title.value}
                  </motion.span>
                )}

              {shortDescription?.value && (
                <motion.p
                  className={styles.description}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  {shortDescription.value}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </motion.div>
  );
};

export default USPCard;
