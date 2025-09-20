// import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import clsx from 'clsx';
// import Link from 'next/link';
import React from 'react';
// import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

interface ButtonProps {
  link?: {
    value: {
      [x: string]: any;
    };
  };
  text?: string;
  onClick?: any;
  onMouseEnter?: any;
  className?: string;
  isButton?: boolean;
  prefix?: any;
  tabIndex?: number;
  onKeyDown?: any;
  'data-cy'?: string;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    link,
    onClick,
    onMouseEnter,
    onKeyDown,
    text,
    className,
    isButton = false,
    prefix,
    'data-cy': dataCY,
    disabled,
  } = props;
  const shouldRenderLink = !!link?.value?.href && !!link?.value?.text;

  return shouldRenderLink ? (
    <>
      {/* <Link
        className={clsx(className, isButton && `primary-button`)}
        field={link}
        onMouseEnter={onMouseEnter}
      /> */}
      {/* <Link
        className={clsx(className, isButton && `primary-button`)}
        href={link?.value?.href}
        target={link?.value?.target}
      >
        {link?.value?.text}
      </Link> */}
      <a
        tabIndex={props?.tabIndex}
        {...(!!link?.value?.target && link?.value?.target === '_blank'
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        {...(!!link?.value?.href && {
          href: `${link?.value?.href}${link?.value?.anchor}`,
        })}
        className={clsx(className, isButton && `primary-button`)}
        onMouseEnter={onMouseEnter}
        onKeyDown={onKeyDown}
        aria-label={link?.value?.text}
        data-cy={dataCY}
      >
        {link?.value?.text}
      </a>
    </>
  ) : (
    <button
      tabIndex={props?.tabIndex}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={clsx(isButton && `primary-button`, className, disabled && 'disabled')}
      aria-label={text}
      data-cy={dataCY}
      disabled={disabled}
    >
      {!!prefix && prefix} {text}
    </button>
  );
};

export default Button;
