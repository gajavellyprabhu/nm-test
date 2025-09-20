import React from 'react';
// import "./index.scss";
import clsx from 'clsx';
import { Checkbox, FormControlLabel } from '@mui/material';
import ImageRenderer from 'subComponents/ImageRenderer';
import ErrorComponent from '../ErrorComponent';
import { useConditions } from '../FormFieldHook';

const CustomCheckbox = (props) => {
  const { field, onChange, errors, tracker, isValid, value, pattern } = props;
  const { model, valueField } = field;
  const {
    cssClass,
    // itemId,
    // maxLength,
    // minLength,
    // validationDataModels,
    // name,
    placeholderText,
    title,
    // conditionSettings,
    // selected,
    subLabel,
  } = model;
  const isDisabledFromCss = cssClass?.includes('disabled');
  const [fieldIsDisabled, fieldShow, handleChangeCB, conditionSettings] = useConditions(props);

  function handleOnChange(field, fieldValue, callback) {
    callback(field.valueField.name, fieldValue, true, []);
    setTimeout(() => {
      handleChangeCB(conditionSettings);
    }, [50]);
  }

  return (
    <div>
      <div className={clsx('CustomCheckbox flex-inline', fieldShow)}>
        <FormControlLabel
          placeholder={placeholderText}
          disabled={isDisabledFromCss || fieldIsDisabled}
          control={
            <Checkbox
              checkedIcon={<ImageRenderer icon="ico_oneCheckbox_complete" />}
              icon={<ImageRenderer icon="ico_oneCheckbox_empty" />}
              {...{
                className: clsx(cssClass, 'checkbox-mui'),
                id: valueField.id,
                name: valueField.name,
                value: 'true',
                checked: value,
                onChange: (e) => handleOnChange(field, e.target.checked, onChange),
                onFocus: () => tracker.onFocusField(field, value),
                onBlur: () => tracker.onBlurField(field, value, errors),
              }}
            />
          }
          label={title}
        />
      </div>
      <ErrorComponent {...{ errors, subLabel }} />
    </div>
  );
};

export default CustomCheckbox;
