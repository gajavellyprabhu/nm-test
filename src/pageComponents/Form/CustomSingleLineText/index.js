import React, { useEffect, useRef, useState } from 'react';
// import "./index.scss";
import clsx from 'clsx';
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import ErrorComponent from '../ErrorComponent';
import { useConditions } from '../FormFieldHook';
import CountryCodeSelector from './countryCodeSelector';
import ImageRenderer from 'subComponents/ImageRenderer';
import Styles from './index.module.scss';
import { useI18n } from 'next-localization';
import TextComponent from 'subComponents/TextComponent';

const CustomSingleLineText = (props) => {
  const { t } = useI18n();
  const { field, onChange, errors, tracker, type, value } = props;
  const { model, valueField, needToSave } = field;
  const {
    cssClass,
    minLength,
    maxLength,
    validationDataModels,
    placeholderText,
    title,
    readOnly,
    subLabel,
    suffix,
    suffixCssClass,
    prefix,
    prefixCssClass,
    supportiveText,
  } = model;
  const isDisabledFromCss = cssClass?.includes('disabled');
  const inputRef = useRef(null);
  const isError = !!errors?.length;
  const [fieldIsDisabled, fieldShow, handleChangeCB, conditionSettings] = useConditions(props);
  const [isPasswordVisibile, setIsPasswordVisibile] = useState();
  const shouldShowSuffix = !!suffix;
  const isPhoneType = type === 'tel';
  const isPasswordType = type === 'password';
  const isNumberType = type === 'number';
  const shouldShowPrefix = !!prefix || isPhoneType;
  const shouldShowAdorments = shouldShowSuffix || shouldShowPrefix || isPasswordType;
  const isValue = !!value || isPhoneType;
  const requiredLabel = `${title}${model?.required ? ' *' : ''}`;
  const [countries, setCountries] = useState(field?.model?.countryList);
  const [phoneCode, setPhoneCode] = useState(
    Array.isArray(countries) && countries?.length > 0 ? countries?.[0] : ''
  );
  const [actualValue, setActualValue] = useState(value);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // useEffect(() => {
  //   if (!isPhoneType) return setActualValue(value ?? '');
  //   if (value?.length > 0) {
  //     const splitted = value?.split(`+${phoneCode?.countryCode}`);
  //     return setActualValue(splitted?.[1]);
  //   } else {
  //     return setActualValue(value);
  //   }
  // }, [value]);
  useEffect(() => {
    !!value && handleChange(value);
    let selectedCountryCode;
    if (!!field?.model?.defaultCountryCode) {
      selectedCountryCode = countries?.find(
        (item) => item.countryCode === field?.model?.defaultCountryCode
      );
      !!selectedCountryCode?.countryCode && setPhoneCode(selectedCountryCode);
    }
  }, []);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisibile((prev) => !prev);
  };

  const handlePhoneCodeChange = (newCode) => {
    const countryObject = countries?.find((item) => {
      return item.countryCode === newCode;
    });
    setPhoneCode(countryObject);
    if (isPhoneType && newCode !== phoneCode?.countryCode && value?.length > 0) {
      const splitted = value?.split(`+${phoneCode?.countryCode}`);
      const newValue = `+${newCode}${splitted?.[1]}`;
      onChange(valueField?.name, newValue, errors?.length === 0, errors);
    }
  };

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
      const validationValue =
        isPhoneType && newValue?.length > 0 ? `+${phoneCode?.countryCode}${newValue}` : newValue; // to match client side validation with server side validation in phone number field
      if (validationValue) {
        validationDataModels?.map((_validation) => {
          if (
            _validation?.name === 'TextValidator' ||
            _validation?.name === 'Phone Number Validator' ||
            _validation?.name === 'Email Validator'
          ) {
            const regex = _validation?.parameters;
            const test = validationValue?.match(JSON.parse(regex)?.regularExpression);
            if (!test) {
              validation.valid = false;
              validation.errors?.push(_validation?.message?.replace('{0}', model?.title));
            }
          }
          if (_validation?.name === 'String Length Validator') {
            var test = true;
            const length = validationValue?.length;

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
    if (model?.mappingField === 'MobilePhone') {
      localStorage.setItem('mobileField', newValue);
    }
    if (isNumberType) {
      if (newValue?.split('')?.find((s) => isNaN(Number(s)) || s === ' ')) {
        return;
      }
    }

    if (isPhoneType) {
      if (newValue?.split('')?.find((s) => isNaN(Number(s)) || s === ' ')) {
        return;
      }
      const valueToPass = newValue?.length > 0 ? `+${phoneCode?.countryCode}${newValue}` : newValue;

      if (needToSave) {
        localStorage?.setItem(valueField?.id, valueToPass);
      }

      onChange(valueField?.name, valueToPass, validation?.valid, validation?.errors);
    } else {
      if (needToSave) {
        localStorage?.setItem(valueField?.id, newValue);
      }

      onChange(valueField?.name, newValue, validation?.valid, validation?.errors);
    }
    setTimeout(() => {
      handleChangeCB(conditionSettings);
    }, [50]);
  };

  let currentValue = '';
  if (isPhoneType && value?.length > 0) {
    const splitted = value?.split(`+${phoneCode?.countryCode}`);
    currentValue = splitted?.[1];
  } else {
    currentValue = value;
  }

  return (
    <div className={clsx(Styles['CustomSingleLineText'], 'position_relative', cssClass, fieldShow)}>
      <TextField
        variant="outlined"
        placeholder={placeholderText}
        fullWidth
        label={requiredLabel}
        disabled={isDisabledFromCss || fieldIsDisabled}
        // focused={isPopupOpen}
        {...(isPopupOpen && { focused: true })}
        ref={inputRef}
        inputProps={{
          ...(!!maxLength && { maxLength: maxLength }),
          // maxLength: maxLength,
          onKeyDown: (e) => {
            handleChange(e);
          },
          'data-cy': `input-field-single-line-text-${type || 'text'}${model.required? '-required': ''}`,
        }}
        InputProps={{ className: Styles['input-label'] }}
        InputLabelProps={{
          // className: 'green-label-body2',
          shrink: true,
          className: Styles['input-label'],
          // onKeyDown: (e) => {
          //   console.log('manal e', e);
          //   handleChange(e);
          // },
        }}
        {...(shouldShowAdorments && {
          InputProps: {
            ...(shouldShowPrefix &&
              isValue && {
                startAdornment: isPhoneType && !!countries?.length && (
                  <InputAdornment position="start">
                    {!!prefix && <p className={clsx('prefix', prefixCssClass)}>{prefix}</p>}

                    <CountryCodeSelector
                      defaultCountry={field?.model?.defaultCountryCode}
                      countries={countries}
                      setCountries={setCountries}
                      code={phoneCode}
                      setCode={handlePhoneCodeChange}
                      isPopupOpen={isPopupOpen}
                      setIsPopupOpen={setIsPopupOpen}
                      inputRef={inputRef}
                    />
                  </InputAdornment>
                ),
              }),
            ...((shouldShowSuffix || isPasswordType) && {
              endAdornment: (
                <InputAdornment position="end">
                  {shouldShowSuffix && <p className={clsx('suffix', suffixCssClass)}>{suffix}</p>}
                  {isPasswordType && (
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      <ImageRenderer icon="show_Password" />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }),
          },
        })}
        error={isError}
        {...{
          type:
            type === 'password'
              ? isPasswordVisibile
                ? 'text'
                : 'password'
              : type === 'tel'
              ? 'text'
              : type === 'number'
              ? 'text'
              : type,
          className: clsx(cssClass, fieldShow),
          id: valueField.id,
          name: valueField.name,
          value: currentValue,
          maxLength: maxLength,
          placeholder: placeholderText,
          onChange: (e) => handleChange(e),
          onFocus: () => tracker.onFocusField(field, value),
          onBlur: (e) => handleBlur(field, value, errors, e),
        }}
        autoComplete="off"
        autoCorrect="off"
      />
      {!!errors?.length ? (
        <ErrorComponent data-cy={`error-field-single-line-text-${type || 'text'}`} {...{ errors, subLabel }} />
      ) : (
        <TextComponent field={{ value: supportiveText }} className="form-supportive-text" />
      )}
    </div>
  );
};

export default CustomSingleLineText;
