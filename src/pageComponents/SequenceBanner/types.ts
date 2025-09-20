export interface VideoLink {
  value: {
    href: string;
    text?: string;
    linktype?: string;
    url?: string;
    anchor?: string;
    target?: string;
    class?: string;
    title?: string;
    querystring?: string;
    id?: string;
  };
}

export interface SequenceBannerFields {
  sequence1video: VideoLink;
  sequence2video: VideoLink;
  mobileSequence1video?: VideoLink;
  mobileSequence2video?: VideoLink;
  title?: {
    value: string;
  };
  shortDescription?: {
    value: string;
  };
  titleTag?: {
    value: string;
  };
}

export interface SequenceBannerProps {
  fields: SequenceBannerFields;
  params?: {
    Styles?: string;
  };
  rendering?: {
    uid?: string;
  };
}
