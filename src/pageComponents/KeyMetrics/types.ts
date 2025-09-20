export interface KeyMetricField {
  value: string;
}

export interface KeyMetricFields {
  titleSuffix: KeyMetricField;
  title: KeyMetricField;
  subtitle: KeyMetricField;
  shortDescription: KeyMetricField;
  titleTag: KeyMetricField;
  backgroundImage: KeyMetricField; // CHANGE: Add missing backgroundImage field
}

export interface KeyMetricItem {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: KeyMetricFields;
}

export interface KeyMetricsProps {
  fields: {
    keyMetrics: KeyMetricItem[];
  };
  rendering?: {
    uid: string;
    componentName: string;
    dataSource: string;
    fields: {
      keyMetrics: KeyMetricItem[];
    };
  };
  className?: string;
}

export interface MetricCardProps {
  metric: any;
  index: number;
  isFullWidth?: boolean;
  className?: string;
}
