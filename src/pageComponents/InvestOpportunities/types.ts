export interface BackgroundImage {
  value: {
    src: string;
    alt: string;
    width: string;
    height: string;
  };
}

export interface OpportunityItem {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    subtitle?: { value: string };
    title: {
      value: string;
    };
    backgroundImage: BackgroundImage;
    titleTag: {
      value: string;
    };
  };
}

export interface RenderingWrapper {
  uid: string;
  componentName: string;
  dataSource: string;
  fields: {
    investmentOpportunities: OpportunityItem[];
  };
}

export interface GridOpportunityProps {
  title?: string;
  opportunities?: OpportunityItem[];
  onCardClick?: (opportunity: OpportunityItem) => void;
  rendering?: RenderingWrapper;
  fields?: {
    investmentOpportunities: OpportunityItem[];
  };
}
