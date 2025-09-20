import React from 'react';
// import "./index.scss";
import clsx from 'clsx';
import ImageRenderer from 'subComponents/ImageRenderer';

import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import ErrorComponent from '../ErrorComponent';
import { useConditions } from '../FormFieldHook';

const CustomRadioButtonList = (props) => {
  const { field, onChange, errors, tracker, value } = props;
  const { model, valueField } = field;
  const { cssClass, placeholderText, title, items } = model;
  const isDisabledFromCss = cssClass?.includes('disabled');
  const [fieldIsDisabled, fieldShow, handleChangeCB, conditionSettings] = useConditions(props);
  const handleOnChange = (event) => {
    onChange(valueField.name, event.target.value, true, []);
    setTimeout(() => {
      handleChangeCB(conditionSettings);
    }, [50]);
  };
  return (
    <div className={clsx('CustomRadioButtonList', fieldShow)}>
      <p className="black-label-body2">{title}</p>
      <RadioGroup
        className="radio-group-mui"
        placeholder={placeholderText}
        id={field.valueField.id}
        name={valueField?.name}
        onClick={handleOnChange}
        onFocus={() => tracker.onFocusField(field, value)}
        onBlur={() => tracker.onBlurField(field, value, errors)}
      >
        {items?.map((item, i) => {
          const { text, value: itemValue } = item;
          const isChecked = itemValue === value || itemValue === value?.[0];
          return (
            <FormControlLabel
              value={itemValue}
              disabled={isDisabledFromCss || fieldIsDisabled}
              label={text}
              key={i}
              className={clsx('SingleRadioButton', isChecked && 'is-checked')}
              control={
                <Radio
                  className="radio-mui-span"
                  checked={isChecked}
                  checkedIcon={<ImageRenderer icon="ico_circle_complete" />}
                  icon={<ImageRenderer icon="ico_circle_empty" />}
                  disableFocusRipple
                  disableTouchRipple
                  disableRipple
                />
              }
            />
          );
        })}
      </RadioGroup>
      <ErrorComponent {...{ errors, placeholderText }} />
    </div>
  );
};

export default CustomRadioButtonList;
