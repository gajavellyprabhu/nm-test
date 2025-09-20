import React from 'react';
import GlobalStructure from 'subComponents/GlobalStructure';
import MetricCard from './MetricCard';
import styles from './styles.module.scss';
import { KeyMetricItem, KeyMetricsProps } from './types';

export const Default: React.FC<KeyMetricsProps> = (props) => {
  const transformMetrics = (keyMetrics: KeyMetricItem[]): any => {
    if (!keyMetrics || !Array.isArray(keyMetrics)) {
      return [];
    }

    return keyMetrics.map((item, index) => ({
      id: item?.id || `metric-${index}`,
      title: item?.fields?.title?.value || '',
      suffix: item?.fields?.titleSuffix?.value || '',
      subtitle: item?.fields?.subtitle?.value || '',
      description: item?.fields?.shortDescription?.value || '',
      order: index + 1,
      image: item.fields.backgroundImage,
    }));
  };

  const rawMetrics = props?.fields?.keyMetrics || props?.rendering?.fields?.keyMetrics || [];
  const metrics = transformMetrics(rawMetrics);

  const sortedMetrics = [...metrics].sort((a, b) => a.order - b.order);

  const organizeMetrics = (metrics: any) => {
    const count = metrics.length;

    if (count === 3) {
      return {
        topRow: [metrics[0], metrics[1]],
        centerColumn: [],
        bottomFullWidth: metrics[2],
      };
    } else if (count === 4) {
      return {
        topRow: [metrics[0], metrics[1], metrics[2]],
        centerColumn: [],
        bottomFullWidth: metrics[3],
      };
    } else if (count === 5) {
      return {
        leftColumn: [metrics[0], metrics[3]],
        centerColumn: [{ ...metrics[1], isLarge: true }],
        rightColumn: [metrics[2], metrics[4]],
      };
    } else if (count === 6) {
      return {
        leftColumn: [metrics[0], metrics[3]],
        centerColumn: [{ ...metrics[1], isLarge: true }],
        rightColumn: [metrics[2], metrics[4]],
        bottomFullWidth: metrics[5],
      };
    } else {
      return {
        leftColumn: [metrics[0]].filter(Boolean),
        centerColumn: [metrics[1]].filter(Boolean),
        rightColumn: [metrics[2]].filter(Boolean),
      };
    }
  };

  const {
    leftColumn = [],
    centerColumn = [],
    rightColumn = [],
    topRow = [],
    bottomFullWidth,
  } = organizeMetrics(sortedMetrics);

  const renderDesktopLayout = () => {
    const count = sortedMetrics.length;

    if (count === 3) {
      return (
        <>
          <div className={styles['keymetrics-grid-container-2']}>
            <div className={styles['keymetrics-grid-item-half']}>
              <MetricCard metric={topRow[0]} index={0} />
            </div>
            <div className={styles['keymetrics-grid-item-half']}>
              <MetricCard metric={topRow[1]} index={1} />
            </div>
          </div>
          <div className={styles['keymetrics-full-width-row']}>
            <MetricCard metric={bottomFullWidth!} index={2} isFullWidth />
          </div>
        </>
      );
    }

    if (count === 4) {
      return (
        <>
          <div className={styles['keymetrics-grid-container-3']}>
            <div className={styles['keymetrics-grid-item-third']}>
              <MetricCard metric={topRow[0]} index={0} />
            </div>
            <div className={styles['keymetrics-grid-item-third']}>
              <MetricCard metric={topRow[1]} index={1} />
            </div>
            <div className={styles['keymetrics-grid-item-third']}>
              <MetricCard metric={topRow[2]} index={2} />
            </div>
          </div>
          <div className={styles['keymetrics-full-width-row']}>
            <MetricCard metric={bottomFullWidth!} index={3} isFullWidth />
          </div>
        </>
      );
    }

    if (count === 5) {
      return (
        <div className={styles['keymetrics-grid-container-3']}>
          <div className={styles['keymetrics-grid-item-third']}>
            <div className={styles['keymetrics-metrics-column']}>
              {leftColumn?.map((metric, index) => (
                <MetricCard key={metric.id} metric={metric} index={index} />
              ))}
            </div>
          </div>
          <div className={styles['keymetrics-grid-item-third']}>
            <div
              className={`${styles['keymetrics-metrics-column']} ${styles['keymetrics-metrics-column--center']}`}
            >
              {centerColumn?.map((metric, index) => (
                <MetricCard key={metric.id} metric={metric} index={leftColumn.length + index} />
              ))}
            </div>
          </div>
          <div className={styles['keymetrics-grid-item-third']}>
            <div className={styles['keymetrics-metrics-column']}>
              {rightColumn.map((metric, index) => (
                <MetricCard
                  key={metric.id}
                  metric={metric}
                  index={leftColumn.length + centerColumn.length + index}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (count === 6) {
      return (
        <>
          <div className={styles['keymetrics-grid-container-3']}>
            <div className={styles['keymetrics-grid-item-third']}>
              <div className={styles['keymetrics-metrics-column']}>
                {leftColumn?.map((metric, index) => (
                  <MetricCard key={metric.id} metric={metric} index={index} />
                ))}
              </div>
            </div>
            <div className={styles['keymetrics-grid-item-third']}>
              <div
                className={`${styles['keymetrics-metrics-column']} ${styles['keymetrics-metrics-column--center']}`}
              >
                {centerColumn?.map((metric, index) => (
                  <MetricCard key={metric.id} metric={metric} index={leftColumn.length + index} />
                ))}
              </div>
            </div>
            <div className={styles['keymetrics-grid-item-third']}>
              <div className={styles['keymetrics-metrics-column']}>
                {rightColumn?.map((metric, index) => (
                  <MetricCard
                    key={metric.id}
                    metric={metric}
                    index={leftColumn.length + centerColumn.length + index}
                  />
                ))}
              </div>
            </div>
          </div>
          {bottomFullWidth && (
            <div className={styles['keymetrics-full-width-row']}>
              <MetricCard metric={bottomFullWidth} index={5} isFullWidth />
            </div>
          )}
        </>
      );
    }

    return (
      <div className={styles['keymetrics-grid-container-1']}>
        {sortedMetrics?.map((metric, index) => (
          <div className={styles['keymetrics-grid-item-full']} key={metric.id}>
            <MetricCard metric={metric} index={index} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <GlobalStructure
      isFullWidth={true}
      paddingClass={''}
      anchorId={''}
      style={undefined}
      className={styles['keymetrics-investment-section']}
      isNoPadding={false}
      defaultPaddingClass={undefined}
      isExpendRight={false}
      isExpendLeft={false}
      componentContentClass={undefined}
    >
      <div className={`${styles['keymetrics-metrics-container']} ${props.className || ''}`}>
        <div className={styles['keymetrics-desktop-layout']}>{renderDesktopLayout()}</div>

        <div className={styles['keymetrics-tablet-layout']}>
          <div className={styles['keymetrics-grid-container-2']}>
            {sortedMetrics?.map((metric, index) => (
              <div className={styles['keymetrics-grid-item-half']} key={metric.id}>
                <MetricCard metric={metric} index={index} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles['keymetrics-mobile-layout']}>
          <div className={styles['keymetrics-grid-container-1']}>
            {sortedMetrics?.map((metric, index) => (
              <div className={styles['keymetrics-grid-item-full']} key={metric.id}>
                <MetricCard metric={metric} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlobalStructure>
  );
};
