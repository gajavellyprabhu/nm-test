import React from 'react';
// import "./index.scss";
import clsx from 'clsx';
import { TextField } from '@mui/material';
import ErrorComponent from '../ErrorComponent';

const CustomTextField = (props) => {
  const { field, onChange, errors, tracker, value } = props;
  const { model, valueField } = field;
  const { cssClass, placeholderText, title, subLabel } = model;
  const isDisabledFromCss = cssClass?.includes('disabled');
  const [fieldIsDisabled, fieldShow, handleChangeCB, conditionSettings] = useConditions(props);

  const handleOnChange = (newValue) => {
    onChange(newValue?.target?.name, newValue?.target?.value, true, []);
    setTimeout(() => {
      handleChangeCB(conditionSettings);
    }, [50]);
  };
  return (
    <div className={clsx('CustomTextField', fieldShow)}>
      <TextField
        name={valueField?.name}
        variant="standard"
        className={clsx(cssClass)}
        id={valueField?.id}
        label={title}
        disabled={isDisabledFromCss || fieldIsDisabled}
        value={value}
        InputLabelProps={{ className: 'green-label-body2' }}
        placeholder={placeholderText}
        onChange={handleOnChange}
        onFocus={() => tracker.onFocusField(field, value)}
        onBlur={() => tracker.onBlurField(field, value, errors)}
        autoComplete="off"
        autoCorrect="off"
      />
      <ErrorComponent {...{ errors, subLabel }} />
    </div>
  );
};

export default CustomTextField;
