export interface USPCarouselFields {
  uspItems: USPItem[];
}

export interface USPCarouselProps {
  fields: USPCarouselFields;

  rendering?: {
    uid: string;

    componentName: string;

    dataSource: string;

    fields: USPCarouselFields;
  };
}

export interface SitecoreField<T = string> {
  value: T;
}

export interface ImageField {
  value: { src: string; alt: string; width: string; height: string };
}

export interface USPItemFields {
  title: SitecoreField;
  subtitle: SitecoreField;
  shortDescription: SitecoreField;
  image: ImageField;
  titleTag: SitecoreField;
}

export interface USPItem {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: USPItemFields;
}

export interface USPCardProps {
  item: USPItem;
  index: number;
  activeIndex: number;
  totalSlides: number;
  onCardClick: (index: number) => void;
  slideIndex?: number;
}
