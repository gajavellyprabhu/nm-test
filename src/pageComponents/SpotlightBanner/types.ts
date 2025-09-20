export interface MediaValue {
  value: {
    src?: string;
    alt?: string;
    width?: string;
    height?: string;
    href?: string;
  };
}

export interface CTALink {
  value: {
    href?: string;
    text: string;
    url?: string;
    anchor?: string;
    title?: string;
    class?: string;
    target?: string;
  };
}

export interface SpotlightBannerProps {
  uid: string;
  fields: {
    title?: { value: string };
    posterImage?: MediaValue;
    posterImageMobile?: MediaValue;
    videoLinkDesktop?: MediaValue;
    videoLinkExtraLarge?: MediaValue;
    videoLinkMobile?: MediaValue;
    linkLabel?: { value: string };
    link?: CTALink;
    titleTag?: { value: string };
  };
}
