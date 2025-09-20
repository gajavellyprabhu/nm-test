import clsx from 'clsx';
import React from 'react';

interface ButtonTertiaryProps {
  target?: string;
  href?: string;
  text: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  className?: string;
  isButton?: boolean;
  tabIndex?: number;
  'data-cy'?: string;
  disabled?: boolean;
}

const ButtonTertiary: React.FC<ButtonTertiaryProps> = (props) => {
  const {
    href,
    onClick,
    onMouseEnter,
    text,
    className,
    isButton = false,
    'data-cy': dataCY,
    disabled,
  } = props;
  return href && !isButton ? (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={clsx('tertiary-button', className, disabled && 'disabled')}
      aria-label={text}
      data-cy={dataCY}
      tabIndex={props.tabIndex}
      target={props.target}
      aria-disabled={disabled}
      style={disabled ? { pointerEvents: 'none' } : undefined}
    >
      <span className={'tertiary-btn-label'}>{text}</span>
      <span className={'tertiary-btn-line'} />
    </a>
  ) : (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={clsx('tertiary-button', className, disabled && 'disabled')}
      aria-label={text}
      data-cy={dataCY}
      disabled={disabled}
      tabIndex={props.tabIndex}
    >
      <span className={'tertiary-btn-label'}>{text}</span>
      <span className={'tertiary-btn-line'} />
    </button>
  );
};

export default ButtonTertiary;
