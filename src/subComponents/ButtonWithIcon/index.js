import clsx from 'clsx';
import React from 'react';
// import { useGlobalContext } from "@/app/GlobalContext/context";
import ImageRenderer from '../ImageRenderer';

const ButtonWithIcon = ({
  link,
  target,
  label,
  externalClass = '',
  src,
  icon,
  //   arrowDirection = "left",
  handleClick,
  alt = '',
  renderSVGInImageTag = false,
}) => {
  //   const { locale } = useGlobalContext();

  return !!link && link !== '' ? (
    <a
      className={clsx(`play-button`, externalClass)}
      href={link}
      target={target}
      aria-label={label}
    >
      <span className={'play-button-wrap flex-it flex-align-item-center'}>
        {/* {((locale === "ar" && arrowDirection === "right") ||
          (locale === "en" && arrowDirection === "left")) && (
          <ImageRenderer className="play-button-icon" src={src} alt={alt} />
        )} */}

        <ImageRenderer
          className="play-button-icon"
          src={src}
          alt={alt}
          icon={icon}
          renderSVGInImageTag
        />
        <div className={'play-button-text'}>{label}</div>
        {/* {((locale === "ar" && arrowDirection === "left") ||
          (locale === "en" && arrowDirection === "right")) && (
          <ImageRenderer className="play-button-icon" src={src} alt={alt} />
        )} */}
      </span>
    </a>
  ) : (
    <div className={clsx(`play-button`, externalClass)} onClick={handleClick}>
      <span className={'play-button-wrap flex-it flex-align-item-center'}>
        {/* {((locale === "ar" && arrowDirection === "right") ||
          (locale === "en" && arrowDirection === "left")) && (
          <ImageRenderer className="play-button-icon" src={src} alt={alt} />
        )} */}

        <ImageRenderer
          className="play-button-icon"
          src={src}
          alt={alt}
          icon={icon}
          renderSVGInImageTag
        />
        <div className={'play-button-text'}>{label}</div>

        {/* {((locale === "ar" && arrowDirection === "left") ||
          (locale === "en" && arrowDirection === "right")) && (
          <ImageRenderer className="play-button-icon" src={src} alt={alt} />
        )} */}
      </span>
    </div>
  );
};

export default ButtonWithIcon;
