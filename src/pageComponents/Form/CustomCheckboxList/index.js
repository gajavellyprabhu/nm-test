import React from 'react';
// import "./index.scss";
import clsx from 'clsx';
import ImageRenderer from 'subComponents/ImageRenderer';
import ErrorComponent from '../ErrorComponent';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useConditions } from '../FormFieldHook';

const CustomCheckboxList = (props) => {
  const { field, onChange, errors, tracker, value } = props;
  const { model } = field;
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
    items,
    subLabel,
  } = model;
  const isDisabledFromCss = cssClass?.includes('disabled');
  const [fieldIsDisabled, fieldShow, handleChangeCB, conditionSettings] = useConditions(props);

  function handleOnChange(field, originalFieldValue, changedElement, checked, callback) {
    let value = originalFieldValue;
    if (checked) {
      value.push(changedElement);
    } else {
      value = value.filter((v) => v !== changedElement);
    }
    callback(field.valueField.name, value, true, []);
    setTimeout(() => {
      handleChangeCB(conditionSettings);
    }, [50]);
  }
  return (
    <div className={fieldShow}>
      <p className="black-label-body2">{title}</p>

      <FormGroup className={clsx('radio-group-mui')}>
        {items?.map((item, i) => {
          const { text, value: itemValue } = item;
          const isChecked = value.some((v) => v === item.value);
          return (
            <FormControlLabel
              key={i}
              disabled={isDisabledFromCss || fieldIsDisabled}
              placeholder={placeholderText}
              control={
                <Checkbox
                  className="radio-mui-span"
                  checked={isChecked}
                  checkedIcon={<ImageRenderer icon="ico_checkbox_check" />}
                  icon={<ImageRenderer icon="ico_checkbox_empty" />}
                />
              }
              label={text}
              {...{
                className: clsx(cssClass, 'SingleRadioButton', isChecked && 'is-checked'),
                id: field.valueField.id + i,
                name: field.valueField.name,
                value: item.value,
                checked: value.some((v) => v === item.value),
                onChange: (e) =>
                  handleOnChange(field, value, e.target.value, e.target.checked, onChange),
                onFocus: () => tracker.onFocusField(field, value),
                onBlur: () => tracker.onBlurField(field, value, errors),
              }}
            />
          );
        })}
      </FormGroup>
      <ErrorComponent {...{ errors, subLabel }} />
    </div>
  );
};

export default CustomCheckboxList;
