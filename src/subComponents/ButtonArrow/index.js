import clsx from 'clsx';
import React from 'react';
import ImageRenderer from '../ImageRenderer';
// import { useGlobalContext } from "@/app/GlobalContext/context";

const ButtonArrow = ({
  link,
  target,
  label,
  externalClass = '',
  arrowDirection = 'right',
  alt = '',
}) => {
  // const { locale } = useGlobalContext();
  return !!link && link !== '' ? (
    <a
      className={clsx(`global-arrow-button arrow-direction-${arrowDirection}`, externalClass)}
      href={link}
      target={target}
      aria-label={label}
    >
      {/* {((locale === "ar" && arrowDirection === "right") ||
        (locale === "en" && arrowDirection === "left")) && (
        <span className={"global-arrow-button-image"}>
          <ImageRenderer src={`/images/ico_6x12_angle_left.svg`} alt={alt} />
        </span>
      )} */}

      <span className={'global-arrow-button-text'}>{label}</span>
      <span className={'global-arrow-button-image'}>
        <ImageRenderer
          // src={`/images/ico_6x12_angle_right.svg`}
          icon="/images/ico_6x12_angle_right.svg"
          renderSVGInImageTag
          alt={alt}
        />
      </span>
      {/* {((locale === "ar" && arrowDirection === "left") ||
        (locale === "en" && arrowDirection === "right")) && (
        <span className={"global-arrow-button-image"}>
          <ImageRenderer src={`/images/ico_6x12_angle_right.svg`} alt={alt} />
        </span>
      )} */}
    </a>
  ) : (
    <div className={clsx(`global-arrow-button arrow-direction-${arrowDirection}`, externalClass)}>
      {/* {((locale === "ar" && arrowDirection === "right") ||
        (locale === "en" && arrowDirection === "left")) && (
        <span className={"global-arrow-button-image"}>
          <ImageRenderer src={`/images/ico_6x12_angle_left.svg`} alt={alt} />
        </span>
      )} */}

      <span className={'global-arrow-button-text'}>{label}</span>
      <span className={'global-arrow-button-image'}>
        <ImageRenderer
          // src={`/images/ico_6x12_angle_right.svg`}
          icon="/images/ico_6x12_angle_right.svg"
          renderSVGInImageTagalt={alt}
          renderSVGInImageTag
        />
      </span>
      {/* {((locale === "ar" && arrowDirection === "left") ||
        (locale === "en" && arrowDirection === "right")) && (
        <span className={"global-arrow-button-image"}>
          <ImageRenderer src={`/images/ico_6x12_angle_right.svg`} alt={alt} />
        </span>
      )} */}
    </div>
  );
};

export default ButtonArrow;
