import React from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';
import { MetricCardProps } from './types';
import ImageRenderer from 'subComponents/ImageRenderer';

const MetricCard: React.FC<MetricCardProps> = ({
  metric,
  index,
  isFullWidth = false,
  className,
}) => {
  const parseValue = (value: string) => {
    if (!value || typeof value !== 'string') {
      return { number: '', suffix: '' };
    }

    const match = value.match(/^(\d+(?:,\d+)*(?:\.\d+)?)(.*)$/);
    if (match) {
      return { number: match[1], suffix: match[2] };
    }
    return { number: value, suffix: '' };
  };

  const mainValue = metric.title || '';
  const suffixValue = metric.suffix || '';

  const { number } = parseValue(mainValue);

  const metricCardClasses = [
    styles['metric-card'],
    metric.isLarge && styles['metric-card--large'],
    isFullWidth && styles['metric-card--full-width'],
    metric.image.src && styles['metric-card--has-background'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const metricContentClasses = [
    styles['metric-content'],
    metric.isLarge && styles['metric-content--large'],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div
      key={metric.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ width: isFullWidth ? '100%' : '100%' }}
      className={className}
    >
      <div className={metricCardClasses}>
        {metric.image.value.src && (
          <ImageRenderer desktopSrc={metric.image} mobileSrc={metric.image} />
        )}
        <div className={metricContentClasses}>
          <div className={styles['value-container']}>
            <span className={styles['main-value']}>{number}</span>
            {suffixValue && <span className={styles['value-suffix']}>{suffixValue}</span>}
          </div>
          <div className={styles['label-container']}>
            {metric.subtitle && <p className={styles['sub-label']}>{metric.subtitle}</p>}
            <h3 className={styles['main-label']}>{metric.description || ''}</h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
