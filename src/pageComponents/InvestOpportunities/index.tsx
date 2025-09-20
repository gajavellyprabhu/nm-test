import { useMediaQuery } from '@mui/material';
import clsx from 'clsx';
import { motion, useInView, Variants } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import GlobalStructure from 'subComponents/GlobalStructure';
import ImageRenderer from 'subComponents/ImageRenderer';
import { OpportunityItem } from '../../pageComponents/InvestOpportunities/types';
import styles from './styles.module.scss';

const cardOffsets = [32, 72, 0, 36];

const getCardDelay = (index: number) => {
  if (index === 0) return 0;
  if (index === 2) return 0.15;
  if (index === 1) return 0.3;
  if (index === 3) return 0.45;
  return 0;
};

const createCardVariants = (index: number, isMobile: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: isMobile ? 120 : cardOffsets[index] + 120,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: isMobile ? 0 : cardOffsets[index],
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: getCardDelay(index),
      opacity: { duration: 0.6, delay: getCardDelay(index) },
      y: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: getCardDelay(index) },
      scale: { duration: 0.6, ease: 'easeOut', delay: getCardDelay(index) + 0.1 },
    },
  },
  hover: {
    scale: 1.02,
    y: isMobile ? -8 : cardOffsets[index] - 8,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  tap: {
    scale: 0.98,
    y: isMobile ? 4 : cardOffsets[index] + 4,
    transition: { duration: 0.1 },
  },
});

interface UpdatedGridOpportunityProps {
  rendering?: {
    uid: string;
    componentName: string;
    dataSource: string;
    fields: {
      investmentOpportunities: OpportunityItem[];
    };
  };
  fields?: {
    subtitle?: { value: string };
    title?: { value: string };
    investmentOpportunities: OpportunityItem[];
  };
  title?: string;
  onCardClick?: (opportunity: OpportunityItem) => void;
}

export const Default: React.FC<UpdatedGridOpportunityProps> = (props) => {
  const { rendering, fields, onCardClick } = props;

  const isMobile = useMediaQuery('(max-width: 1024px)');

  const opportunities =
    fields?.investmentOpportunities || rendering?.fields?.investmentOpportunities || [];
  const displayTitle = fields?.title?.value;

  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    margin: '-50px 0px -50px 0px',
  });

  useEffect(() => {
    if (!isInView) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      const scrollProgress = Math.max(
        0,
        Math.min(1, (viewportHeight - elementTop) / (viewportHeight + elementHeight))
      );

      const newVisibleCards = new Set<number>();

      if (scrollProgress > 0.1) {
        newVisibleCards.add(0);
        newVisibleCards.add(1);
        newVisibleCards.add(2);
        newVisibleCards.add(3);
      }

      setVisibleCards(newVisibleCards);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInView]);

  const handleCardClick = (opportunity: OpportunityItem) => {
    if (onCardClick) {
      onCardClick(opportunity);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, opportunity: OpportunityItem) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick(opportunity);
    }
  };

  if (!opportunities || opportunities.length === 0) {
    return null;
  }

  return (
    <GlobalStructure
      className={clsx(styles['investopportunities-opportunity-section'])}
      anchorId={props?.rendering?.uid}
      isFullWidth={false}
      paddingClass={''}
      style={undefined}
      isNoPadding={false}
      defaultPaddingClass={undefined}
      isExpendRight={false}
      isExpendLeft={false}
      componentContentClass={undefined}
    >
      <div className={styles['investopportunities-grid-container']} ref={containerRef}>
        <h1 className={styles['investopportunities-section-title']}>{displayTitle}</h1>

        <div className={styles['investopportunities-cards-grid']}>
          {opportunities.map((opportunity, index) => (
            <motion.button
              key={opportunity.id}
              className={styles['investopportunities-motion-card']}
              initial="hidden"
              animate={visibleCards.has(index) ? 'visible' : 'hidden'}
              whileHover="hover"
              whileTap="tap"
              variants={createCardVariants(index, isMobile)}
              onClick={() => handleCardClick(opportunity)}
              onKeyDown={(event) => handleKeyDown(event, opportunity)}
              aria-label={`View ${opportunity.fields.title} opportunities`}
            >
              <div className={styles['investopportunities-card-background']}>
                <ImageRenderer
                  desktopSrc={opportunity.fields.backgroundImage}
                  mobileSrc={opportunity.fields.backgroundImage}
                  alt={opportunity.fields.backgroundImage.value.alt}
                  height="100%"
                  className={styles['investopportunities-image']}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(360deg, #111111 0%, rgba(17, 17, 17, 0) 43.74%)',
                    zIndex: 1,
                  }}
                />
              </div>

              <div className={styles['investopportunities-card-content']}>
                <div className={styles['investopportunities-title-container']}>
                  {!isMobile && (
                    <div
                      className={`${styles['investopportunities-title-line']} ${styles['investopportunities-align-left']}`}
                    />
                  )}
                  <h3 className={styles['investopportunities-card-title']}>
                    {opportunity.fields.title.value}
                  </h3>
                  {isMobile && (
                    <p className={styles['investopportunities-card-detail']}>
                      {opportunity.fields.subtitle?.value}
                    </p>
                  )}
                  {!isMobile && (
                    <div
                      className={`${styles['investopportunities-title-line']} ${styles['investopportunities-align-right']}`}
                    />
                  )}
                </div>
              </div>

              {isMobile && (
                <div className={styles['investopportunities-arrow-button']}>
                  <svg
                    className={styles['investopportunities-arrow-icon']}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 2L8 6L4 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </GlobalStructure>
  );
};
