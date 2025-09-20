import type { Meta, StoryObj } from '@storybook/react';
import { Default as SequenceBanner } from './index';

const meta: Meta<typeof SequenceBanner> = {
  title: 'Components/SequenceBanner',
  component: SequenceBanner,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SequenceBanner>;

export const Default: Story = {
  args: {
    fields: {
      title: {
        value: 'Experience the Future of Urban Living',
      },
      titleTag: {
        value: 'h2',
      },
      shortDescription: {
        value: 'A seamless blend of tradition and innovation in the heart of Riyadh',
      },
      sequence1video: {
        value: {
          href: 'https://newmurabba.com/-/jssmedia/Project/Murabba/murabba-site/home/Revamped-Homepage/Videos/Murabba_5SEC_EN_1920x1080.mp4',
        },
      },
      sequence2video: {
        value: {
          href: 'http://ozywuli.github.io/videos/atoms-hi-smooth.mp4',
        },
      },
      mobileSequence1video: {
        value: {
          href: 'https://newmurabba.com/-/jssmedia/Project/Murabba/murabba-site/home/Revamped-Homepage/Videos/Murabba_5SEC_EN_1920x1080.mp4',
        },
      },
      mobileSequence2video: {
        value: {
          href: 'http://ozywuli.github.io/videos/atoms-hi-smooth.mp4',
        },
      },
    },
  },
};

export const WithoutDescription: Story = {
  args: {
    fields: {
      title: {
        value: 'Experience the Future of Urban Living',
      },
      sequence1video: {
        value: {
          href: 'https://newmurabba.com/-/jssmedia/Project/Murabba/murabba-site/home/Revamped-Homepage/Videos/Murabba_5SEC_EN_1920x1080.mp4',
        },
      },
      sequence2video: {
        value: {
          href: 'http://ozywuli.github.io/videos/atoms-hi-smooth.mp4',
        },
      },
    },
  },
};
