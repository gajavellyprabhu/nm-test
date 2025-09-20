import type { Meta, StoryObj } from '@storybook/react';
import { Default as SpotlightBanner } from './index';

const meta: Meta<typeof SpotlightBanner> = {
  title: 'Components/SpotlightBanner',
  component: SpotlightBanner,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    uid: {
      description: 'Unique identifier for the banner',
      control: 'text',
    },
    fields: {
      description: 'Banner content and configuration',
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SpotlightBanner>;

export const Default: Story = {
  args: {
    uid: 'spotlight-banner-1',
    fields: {
      title: {
        value: 'Discover New Murabba',
      },
      titleTag: {
        value: 'Discover New Murabba',
      },
      posterImage: {
        value: {
          src: 'https://newmurabba.com/-/jssmedia/Project/Murabba/murabba-site/about-us/our-strategy/our-strategy-revamp/NM-our-strategy-banner-desktop.png',
          alt: 'New Murabba Strategy',
          width: '1920',
          height: '1080',
        },
      },
      posterImageMobile: {
        value: {
          src: 'https://newmurabba.com/-/jssmedia/Project/Murabba/murabba-site/about-us/our-strategy/our-strategy-revamp/NM-our-strategy-banner-mobile.png',
          alt: 'New Murabba Strategy Mobile',
          width: '768',
          height: '1024',
        },
      },
      videoLinkDesktop: {
        value: {
          href: 'https://newmurabba.com/videos/spotlight-desktop.mp4',
        },
      },
      videoLinkExtraLarge: {
        value: {
          href: 'https://newmurabba.com/videos/spotlight-xl.mp4',
        },
      },
      videoLinkMobile: {
        value: {
          href: 'https://newmurabba.com/videos/spotlight-mobile.mp4',
        },
      },
      link: {
        value: {
          text: 'Learn More',
          href: '/about-us',
          class: 'tertiary-button',
          target: '_self',
        },
      },
    },
  },
};

export const WithoutVideo: Story = {
  args: {
    uid: 'spotlight-banner-2',
    fields: {
      title: {
        value: 'Our Vision',
      },
      titleTag: {
        value: 'h2',
      },
      posterImage: {
        value: {
          src: 'https://newmurabba.com/-/jssmedia/Project/Murabba/murabba-site/about-us/our-vision/banner.png',
          alt: 'Our Vision',
          width: '1920',
          height: '1080',
        },
      },
      posterImageMobile: {
        value: {
          src: 'https://newmurabba.com/-/jssmedia/Project/Murabba/murabba-site/about-us/our-vision/banner-mobile.png',
          alt: 'Our Vision Mobile',
          width: '768',
          height: '1024',
        },
      },
      link: {
        value: {
          text: 'Explore Vision',
          href: '/our-vision',
          class: 'tertiary-button',
          target: '_self',
        },
      },
    },
  },
};
