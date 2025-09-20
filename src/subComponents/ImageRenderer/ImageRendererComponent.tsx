import { ReactSVGClient } from './ReactSVGClient';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { NextImage as Image, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
// import { Image as LegacyImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import { useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';
// import Image from 'next/image';
// import { Hidden, useMediaQuery } from '@mui/material';

// export const getServerSideProps = async (context: any) => {
//   console.log('context', context);
// };

export interface ImageRendererComponentProps {
  icon?: string;
  className?: string;
  alt?: string;
  width?: string;
  height?: string;
  ipadshow?: boolean;
  renderSVGInImageTag?: boolean;
  desktopSrc?: {
    value: {
      [x: string]: string;
    };
  };
  mobileSrc?: {
    value: {
      [x: string]: string;
    };
  };
  renderLegacyImage?: boolean;
  disableLazyLoading?: boolean;
}

const customImageLoader = ({ src, width, quality = 80 }: any) => {
  // Modify the image URL to load from a specific domain
  const imageUrl = `${process.env.PUBLIC_URL}/_next/image?url=${encodeURIComponent(
    src
  )}&w=${width}&q=${quality}`;

  // Return the modified image URL
  return imageUrl;
};

const ImageRendererComponent: FC<ImageRendererComponentProps> = (props) => {
  const { sitecoreContext } = useSitecoreContext();
  const { isDesktopLayout: isDesktopLayoutProp, pageEditing } = sitecoreContext;
  const {
    icon,
    className,
    alt,
    width,
    height,
    renderSVGInImageTag = false,
    desktopSrc,
    mobileSrc,
    ipadshow = false,
    renderLegacyImage = false,
    disableLazyLoading = false,
  } = props;
  const [isDesktopLayout, setIsDesktopLayout] = useState(isDesktopLayoutProp);
  const isDesktopLayoutMedia = useMediaQuery(`(min-width:${!ipadshow ? 769 : 1025}px)`);
  // const handleGetWindowSize = () => {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   return useMediaQuery(`(min-width:${!ipadshow ? 769 : 1025}px)`);
  // };

  useEffect(() => {
    if (isDesktopLayoutMedia !== undefined) {
      setIsDesktopLayout(isDesktopLayoutMedia);
    }
  }, [isDesktopLayoutMedia]);

  const { t } = useI18n();

  const handleSetFallBackProp = (mainProps: any, fallbackProp: any, targetedKey: string) => {
    const selectedValue = !!mainProps?.value?.[targetedKey]
      ? mainProps?.value?.[targetedKey]
      : fallbackProp?.value?.[targetedKey];
    return selectedValue;
  };

  let objectProps: any;
  if (isDesktopLayout) {
    objectProps = {
      value: {
        ...desktopSrc?.value,
        // alt: !!desktopSrc?.value?.alt ? desktopSrc?.value?.alt : mobileSrc?.value?.alt,
        alt: handleSetFallBackProp(desktopSrc, mobileSrc, 'alt') ?? t('label_image'),
      },
    };
  } else {
    objectProps = {
      value: {
        ...mobileSrc?.value,
        // alt: !!mobileSrc?.value?.alt ? mobileSrc?.value?.alt : desktopSrc?.value?.alt,
        src: handleSetFallBackProp(mobileSrc, desktopSrc, 'src'),
        alt: handleSetFallBackProp(mobileSrc, desktopSrc, 'alt'),
      },
    };
  }

  const backgroundImageAlt = !!desktopSrc?.value?.alt
    ? desktopSrc?.value?.alt
    : mobileSrc?.value?.alt;

  const finalAlt = !!alt ? alt : !!backgroundImageAlt ? backgroundImageAlt : t('label_image');
  // const isDesktopLayout =
  //   typeof window !== 'undefined'
  //     ? window?.innerWidth > (!!!ipadshow ? 769 : 1025)
  //       ? true
  //       : false
  //     : null;

  let isSVG = false;
  const regexSubstringLink = /\/-\/.+.svg/gi;
  const extractedExternalSrc = desktopSrc?.value?.src;
  const output = extractedExternalSrc?.match(regexSubstringLink);
  isSVG = output !== null;

  const resultSource = isDesktopLayout
    ? desktopSrc?.value?.src
    : mobileSrc?.value?.src ?? desktopSrc?.value?.src;

  if (!!pageEditing) {
    const LegacyImage = dynamic(() =>
      import('@sitecore-jss/sitecore-jss-nextjs/').then((mod) => mod.Image)
    );
    return (
      <LegacyImage
        className={clsx('next_image', isDesktopLayout ? 'desk' : 'mob', className)}
        field={{
          value: {
            ...objectProps?.value,
          },
        }}
      />
    );
  }

  if ((isSVG && !!!icon) || renderLegacyImage) {
    return (
      <img
        {...{
          src: resultSource,
          className,
          width,
          height,
          alt: finalAlt,
          ...(!disableLazyLoading && { loading: 'lazy' }),
        }}
      />
    );
  }

  if (!!icon) {
    // const source = iconsObjectConstant?.[icon];
    const source = `/-/jssmedia/Project/Murabba/murabba-site/${icon}`;
    return !renderSVGInImageTag ? (
      <ReactSVGClient {...{ src: source, className, width, height, alt: finalAlt }} />
    ) : (
      <img
        {...{
          src: source,
          className,
          alt: finalAlt,
          ...(!disableLazyLoading && { loading: 'lazy' }),
        }}
      />
    );
  }

  // let finalImage = [
  //   isDesktopLayout
  //     ? !!desktopSrc?.value?.src
  //       ? desktopSrc
  //       : mobileSrc
  //     : !!mobileSrc?.value?.src
  //     ? mobileSrc
  //     : desktopSrc,
  // ];
  // finalImage?.alt = finalAlt;
  // debugger;

  return !!desktopSrc ? (
    <>
      <Image
        placeholder="empty"
        fill
        loader={customImageLoader}
        className={clsx('next_image', isDesktopLayout ? 'desk' : 'mob', className)}
        field={{
          value: {
            ...objectProps?.value,
            // loading: 'lazy',
            // src: objectProps?.value?.src?.replace(
            //   'https://new-murabba.mirummea.com',
            //   'https://node.new-murabba.mirummea.com'
            // ),
          },
        }}
        // src={objectProps?.value?.src}
        // alt={objectProps?.value?.alt}
        // quality={80}
      />
      {/* {isDesktopLayout ? (
        <Image
          // src={desktopSrc?.value?.src}
          // alt={desktopSrc?.value?.alt}
          placeholder="empty"
          // fill
          className={clsx('next_image desk', className)}
          // onLoadingComplete={() => setImageLoaded(true)}
          field={objectProps}
        />
      ) : (
        <Image
          alt={finalAlt}
          // src={mobileSrc?.value?.src ?? desktopSrc?.value?.src}
          // alt={mobileSrc?.value?.alt ?? ''}
          field={!!mobileSrc?.value?.src ? mobileSrc : desktopSrc}
          // field={{ value: { ...desktopSrc?.value, alt: finalAlt } }}
          placeholder="empty"
          // fill
          className={clsx('next_image mob', className)}
          // onLoadingComplete={() => setImageLoaded(true)}
        />
      )} */}

      {/* <Hidden {...(!ipadshow ? { smDown: true } : { mdDown: true })}>
        <Image
          placeholder="empty"
          className={clsx('next_image desk', className)}
          field={desktopSrc}
        />
      </Hidden>

      <Hidden {...(!ipadshow ? { smUp: true } : { mdUp: true })}>
        <Image
          field={!!mobileSrc?.value?.src ? mobileSrc : desktopSrc}
          placeholder="empty"
          className={clsx('next_image mob', className)}
        />
      </Hidden> */}

      {/* {!imageLoaded && (
        <Skeleton sx={{ bgcolor: 'grey.100' }} variant="rectangular" width="100%" height="100%" />
      )} */}
    </>
  ) : (
    <></>
  );
};

export default ImageRendererComponent;
