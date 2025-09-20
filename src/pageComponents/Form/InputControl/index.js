import React from 'react';
// import "./index.scss";
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import { NumericFormat } from 'react-number-format';

const InputControl = (props) => {
  const {
    label,
    prefix,
    handleBlur,
    width,
    type,
    defaultValue,
    hideLabels,
    className,
    name,
    value,
    inputValue,
    handleInputChange,
    handleClick,
    disabled,
    subLabel,
  } = props;
  const id = uuidv4();
  const shouldRenderLabel = !!label?.value && !hideLabels;
  const shouldRenderSubLabel = !!subLabel?.value;
  return (
    <div
      style={!!width ? { width: `${width}px` } : {}}
      className={clsx(
        'InputControl flex-it flex-align-item-center',
        className,
        ((!!value?.value && +value?.value !== +defaultValue) ||
          !!inputValue?.[name]?.active ||
          value?.active) &&
          'active',
        (!!inputValue?.[name]?.hasError || !!value?.hasError) && 'error'
      )}
    >
      <div className="input-auto flex-it flex-justify-between">
        {shouldRenderLabel && (
          <div className="title-container">
            <div className="input-title">{label?.value}</div>
            {shouldRenderSubLabel && <div className="sub-label">{subLabel?.value}</div>}
          </div>
        )}
        <div className="input-content flex-it flex-align-item-center">
          {!!prefix && <div className="prefix-input">{prefix?.value}</div>}
          <NumericFormat
            thousandSeparator
            disabled={disabled}
            name={name}
            type={'text'}
            id={id}
            value={(value?.value || inputValue?.[name]?.value) ?? 0}
            onChange={(e) => {
              handleInputChange && handleInputChange(e);
            }}
            onBlur={(e) => {
              handleBlur && handleBlur(e);
            }}
            onClick={(e) => {
              handleClick && handleClick(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InputControl;
