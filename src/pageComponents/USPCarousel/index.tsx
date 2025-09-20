import { useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import GlobalStructure from 'subComponents/GlobalStructure';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './styles.module.scss';
import { USPCarouselProps } from './types';
import USPCard from './USPCard';

export const Default: React.FC<USPCarouselProps> = ({ fields, rendering }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const swiperRef = useRef<SwiperType>();
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const uspItems = fields?.uspItems || rendering?.fields?.uspItems || [];

  if (!uspItems || uspItems.length === 0) {
    return null;
  }

  console.log('USPCarouselProps:', fields, rendering);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsTransitioning(true);
    setActiveIndex(swiper.realIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (index: number) => {
    if (swiperRef.current && !isTransitioning) {
      swiperRef.current.slideToLoop(index);
    }
  };

  const goToPrev = () => {
    if (swiperRef.current && !isTransitioning) {
      swiperRef.current.slidePrev();
    }
  };

  const goToNext = () => {
    if (swiperRef.current && !isTransitioning) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <GlobalStructure
      isFullWidth={true}
      paddingClass={''}
      anchorId={''}
      style={undefined}
      className={styles.uspCarousel}
      isNoPadding={false}
      defaultPaddingClass={undefined}
      isExpendRight={false}
      isExpendLeft={false}
      componentContentClass={undefined}
    >
      {' '}
      <section className={styles.uspCarousel} aria-label="USP Carousel">
        <div className={styles.gallery}>
          <div className={styles.cardsContainer}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1.4}
              centeredSlides={true}
              loop={true}
              watchSlidesProgress={true}
              speed={600}
              breakpoints={{
                480: {
                  slidesPerView: 1.4,
                  spaceBetween: 8,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 0,
                },
              }}
              onSwiper={(swiper: SwiperType) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={handleSlideChange}
              onProgress={(swiper: SwiperType) => {
                try {
                  if (swiper && swiper.slides && swiper.slides.length > 0) {
                    swiper.slides.forEach((slide: any) => {
                      if (slide && slide.style) {
                        slide.style.opacity = '1';
                        slide.style.visibility = 'visible';
                        if (
                          slide.style.transform &&
                          slide.style.transform.includes('translateX(-100%)')
                        ) {
                          slide.style.transform = slide.style.transform.replace(
                            'translateX(-100%)',
                            'translateX(0%)'
                          );
                        }
                      }
                    });
                  }
                } catch (error) {
                  console.warn('Error in onProgress handler:', error);
                }
              }}
              onResize={(swiper: SwiperType) => {
                try {
                  if (swiper && typeof swiper.update === 'function') {
                    swiper.update();
                  }
                  if (swiper && typeof swiper.updateProgress === 'function') {
                    swiper.updateProgress();
                  }
                  if (swiper && typeof swiper.updateSlidesClasses === 'function') {
                    swiper.updateSlidesClasses();
                  }
                } catch (error) {
                  console.warn('Error in onResize handler:', error);
                }
              }}
              className={styles.swiper}
            >
              {uspItems.map((item, index) => (
                <SwiperSlide key={`${item.id}-${index}`} className={styles.slide}>
                  <USPCard
                    item={item}
                    index={index}
                    activeIndex={activeIndex}
                    totalSlides={uspItems.length}
                    onCardClick={goToSlide}
                    slideIndex={index}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {!isMobile && (
            <div className={styles.actions}>
              <motion.button
                className={styles.navButton}
                onClick={goToNext}
                disabled={isTransitioning}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous slide"
                type="button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>

              <motion.button
                className={styles.navButton}
                onClick={goToPrev}
                disabled={isTransitioning}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next slide"
                type="button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </div>
          )}
        </div>
      </section>
    </GlobalStructure>
  );
};
