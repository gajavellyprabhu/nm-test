import React, { useEffect, useState } from 'react';
// import "./index.scss";
import styles from './index.module.scss';
import clsx from 'clsx';
import { TextField } from '@mui/material';
import ErrorComponent from '../ErrorComponent';
import { useConditions } from '../FormFieldHook';
import { useI18n } from 'next-localization';
// import SitecoreIcon from "components/Shared/components/SitecoreIcon";
// import CountryCodeSelector from "./countryCodeSelector";

const CustomMultipleLineText = (props) => {
  const { t } = useI18n();
  const { field, onChange, errors, tracker, type, value } = props;
  const { model, valueField, needToSave } = field;
  const {
    cssClass,
    minLength,
    maxLength,
    rows,
    validationDataModels,
    placeholderText,
    title,
    readOnly,
    subLabel,
    suffix,
    // suffixCssClass,
    prefix,
    // prefixCssClass,
  } = model;
  const isDisabledFromCss = cssClass?.includes('disabled');
  const isError = !!errors?.length;
  const [fieldIsDisabled, fieldShow, handleChangeCB, conditionSettings] = useConditions(props);
  // const [isPasswordVisibile, setIsPasswordVisibile] = useState();
  // const shouldShowSuffix = !!suffix;
  const isPhoneType = type === 'tel';
  // const isPasswordType = type === 'password';
  // const shouldShowPrefix = !!prefix || isPhoneType;
  // const shouldShowAdorments = shouldShowSuffix || shouldShowPrefix || isPasswordType;
  // const isValue = !!value || isPhoneType;
  const requiredLabel = `${title}${model?.required ? ' *' : ''}`;
  const [countries, setCountries] = useState(field?.model?.countryList);
  const [phoneCode, setPhoneCode] = useState(
    Array.isArray(countries) && countries?.length > 0 ? countries?.[0] : ''
  );
  // const [actualValue, setActualValue] = useState(value);

  // const handlePhoneCodeChange = (newCode) => {
  //   const countryObject = countries?.find((item) => {
  //     return item.countryCode === newCode;
  //   });
  //   setPhoneCode(countryObject);
  //   if (isPhoneType && newCode !== phoneCode?.countryCode && value?.length > 0) {
  //     const splitted = value?.split(`+${phoneCode?.countryCode}`);
  //     const newValue = `+${newCode}${splitted?.[1]}`;
  //     onChange(valueField?.name, newValue, errors?.length === 0, errors);
  //   }
  // };

  const handleBlur = (field, value, errors, e) => {
    tracker.onBlurField(field, value, errors);
    handleChange(e);
  };

  const handleChange = (e) => {
    const newValue = e?.target?.value;
    if (readOnly) {
      return;
    }
    const validation = {
      valid: true,
      errors: [],
    };

    try {
      if (model.required && !newValue) {
        validation.valid = false;
        validation?.errors.push(t('IsRequiredMessage')?.replace('{0}', model?.title));
      }
      if (newValue) {
        validationDataModels?.map((_validation) => {
          if (_validation?.name === 'MessageValidator') {
            const regex = _validation?.parameters;
            const test = newValue?.match(JSON.parse(regex)?.regularExpression);
            if (!test) {
              validation.valid = false;
              validation.errors?.push(_validation?.message?.replace('{0}', model?.title));
            }
          }
          if (_validation?.name === 'String Length Validator') {
            var test = true;
            const length = newValue?.length;

            // Handling pressing on keys after reaching max-length
            var keyDown = false;
            if (length === maxLength && !keyDown && !!e?.key) {
              keyDown = true;
              validation.valid = false;
              const validationMessage = _validation?.message
                ?.replace('{0}', model?.title)
                ?.replace('{1}', minLength)
                ?.replace('{2}', maxLength);
              validation.errors?.push(validationMessage);
              setTimeout(() => {
                validation.valid = true;
                var index = validation?.errors.indexOf(validationMessage);
                validation.errors.splice(index, 1);
                onChange(validation?.valid, validation?.errors);
              }, 3000);
            }
            // Handling minLength and  maxLength
            if (minLength) {
              test = test && length >= minLength;
            }
            if (maxLength) {
              test = test && length <= maxLength;
            }
            if (!test) {
              validation.valid = false;
              validation.errors?.push(
                _validation?.message
                  ?.replace('{0}', model?.title)
                  ?.replace('{1}', minLength)
                  ?.replace('{2}', maxLength)
              );
            }
          }
        });
      }
    } catch (e) {
      console.error(e?.message);
    }
    if (needToSave) {
      localStorage?.setItem(valueField?.id, newValue);
    }

    onChange(valueField?.name, newValue, validation?.valid, validation?.errors);
  };

  return (
    <div className={styles['CustomMultipleLineText']}>
      <TextField
        // variant="outlined"
        placeholder={placeholderText}
        fullWidth
        label={requiredLabel}
        disabled={isDisabledFromCss || fieldIsDisabled}
        inputProps={{ maxLength: maxLength, 'data-cy': `input-field-multi-line-text${model.required? '-required': ''}` }}
        InputLabelProps={{
          // className: 'green-label-body2',
          disableAnimation: true,
          // focused: true,
          shrink: true,
        }}
        className={clsx(styles[cssClass], styles['green-parent-body2'], styles[fieldShow])}
        error={isError}
        {...{
          type: 'text',
          id: valueField.id,
          name: valueField.name,
          value: value,
          maxLength: maxLength,
          // placeholder: placeholderText,
          onChange: (e) => handleChange(e),
          onFocus: () => tracker.onFocusField(field, value),
          onBlur: (e) => handleBlur(field, value, errors, e),
          onKeyDown: (e) => handleChange(e),
        }}
        autoComplete="off"
        autoCorrect="off"
        multiline
        rows={rows}
        variant="outlined"
      />
      <ErrorComponent data-cy={'error-field-multi-line-text'}  {...{ errors, subLabel }} />
    </div>
  );
};

export default CustomMultipleLineText;
