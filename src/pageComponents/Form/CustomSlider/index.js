import React, { useEffect, useState } from 'react';
// import "./index.scss";
import clsx from 'clsx';
import Box from '@mui/material/Box';
import InputControl from '../InputControl';
import Slider, { SliderThumb } from '@mui/material/Slider';
import ErrorComponent from '../ErrorComponent';
import { useConditions } from '../FormFieldHook';

const CustomSlider = (props) => {
  const { field, onChange, errors, value } = props;
  const { model, valueField } = field;
  const {
    cssClass,
    title,
    step,
    min,
    max,
    prefix,
    prefixCssClass,
    placeholderText,
    value: defaultValue,
    subLabel,
  } = model;

  const isDisabledFromCss = cssClass?.includes('disabled');
  const isPlaceholderText = !!placeholderText;
  const [sliderValue, setSliderValue] = useState({ value: value });
  const [fieldIsDisabled, fieldShow, handleChangeCB, conditionSettings] = useConditions(props);

  useEffect(() => {
    onChange(valueField?.name, sliderValue?.value, true, []);
    setTimeout(() => {
      handleChangeCB(conditionSettings);
    }, [50]);
  }, [sliderValue]);
  const valuetext = (e, value) => {
    setSliderValue((prev) => {
      return {
        ...prev,
        value: +value,
        hasError: false,
        active: +value !== +defaultValue ? true : false,
      };
    });
  };

  const handleInputClick = (e) => {
    if (+e.target.value === 0) {
      e.target.select();
      return setSliderValue((prev) => {
        return {
          ...prev,
          active: true,
          value: '',
        };
      });
    }
    setSliderValue((prev) => {
      return {
        ...prev,
        active: true,
      };
    });
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    const numberNewValue = Number(newValue?.replaceAll(',', ''));
    const hasError = numberNewValue < +min || numberNewValue > +max;

    setSliderValue(() => ({
      value: newValue,
      active: true,
      hasError: hasError,
    }));
  };

  const handleBlur = (e) => {
    const newValue = e.target.value; // number
    const numberNewValue = Number(newValue.replaceAll(',', ''));
    const hasError = numberNewValue < +min || numberNewValue > +max;
    setSliderValue((prev) => {
      return {
        ...prev,
        value: newValue,
        hasError: hasError,
        active: newValue !== +defaultValue,
      };
    });
  };

  const CustomThumbComponent = (props) => {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <div className="wrap-handle">
          <span className="custom-handle-bar" />
          <span className="custom-handle-bar" />
          <span className="custom-handle-bar" />
        </div>
      </SliderThumb>
    );
  };

  return (
    <div className={clsx('customSliderControl', fieldShow)}>
      <div className="label">{title}</div>
      {isPlaceholderText && <div className="placeholder-text-helper">{placeholderText}</div>}
      <InputControl
        className={clsx(`slider-input`, isPlaceholderText && 'helper-text')}
        hideLabels={true}
        // prefix={prefix}
        value={sliderValue}
        handleInputChange={handleInputChange}
        handleClick={handleInputClick}
        handleBlur={handleBlur}
        name={valueField?.name}
        type={'text'}
        disabled={isDisabledFromCss || fieldIsDisabled}
      />
      <Box sx={{ width: '100%' }}>
        <Slider
          disabled={isDisabledFromCss || fieldIsDisabled}
          sx={{
            color: '#034638',
            height: 3,
            padding: '13px 0',
            '& .MuiSlider-thumb': {
              height: 27,
              width: 27,
              background: 'linear-gradient(90deg, #84BD00 0%, #034638 100%);',

              '& .custom-handle-bar': {
                height: '1px',
                width: '100%',
                backgroundColor: '#fff',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '2px',
                position: 'relative',
                display: 'block',
              },
              '& .wrap-handle': {
                paddingTop: '10px',
                height: '100%',
                width: '9px',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block',
                position: 'relative',
              },
            },
            '& .MuiSlider-track': {
              height: 3,
            },
            '& .MuiSlider-rail': {
              color: '#EDEDED',
              opacity: 1,
              height: 3,
            },
          }}
          aria-label={title}
          step={+step}
          min={+min}
          max={+max}
          value={
            (!!sliderValue?.value && Number(sliderValue?.value?.toString()?.replaceAll(',', ''))) ||
            0
          }
          onChange={valuetext}
          slots={{ thumb: CustomThumbComponent }}
        />

        <div
          className={clsx(
            'min-max-values flex-it flex-align-item-center flex-justify-between',
            prefixCssClass
          )}
        >
          <div className="minMaxValue min-value">{prefix + ' ' + min}</div>
          <div className="minMaxValue max-value">{prefix + ' ' + max}</div>
        </div>
      </Box>
      <ErrorComponent {...{ errors, subLabel }} />
    </div>
  );
};

export default CustomSlider;
