import React, { useEffect, useRef, useState } from 'react';
// import "./index.scss";
import clsx from 'clsx';
import { TextField } from '@mui/material';
// import ErrorComponent from '../ErrorComponent';

import Styles from './index.module.scss';
import { useI18n } from 'next-localization';
import TextComponent from 'subComponents/TextComponent';
import ErrorComponent from 'pageComponents/Form/ErrorComponent';
import { useNewsletterBannerContext } from '../context';

const CustomSingleLineText = (props) => {
  const { className: propClassName, minLength, maxLength } = props;
  const { value, setValue } = useNewsletterBannerContext();
  const { t } = useI18n();
  const placeholderText = t('newsletter_email_placeholder');
  const label = t('newsletter_email_label');
  const isError = !!value?.errors?.length;
  const isRequired = true;

  const validationDataModels = [
    {
      itemId: '{9BAE3E9A-D89F-4F93-9577-68B5E9D44A38}',
      name: 'Email Validator',
      displayName: 'Email Validator',
      modelType:
        'Sitecore.ExperienceForms.Mvc.Models.Validation.RegularExpressionValidation,Sitecore.ExperienceForms.Mvc',
      message: '{0} has incorrect input.',
      parameters: '{"regularExpression":"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\\\.[A-Za-z]{2,17}$"}',
    },
  ];
  const handleChange = (e, isBlur) => {
    const newValue = e?.target?.value;
    let errors = [];
    if (!!!newValue && isRequired) {
      return setValue({
        value: newValue,
        errors: [t('newsletter_email_required')?.replace('{0}', label)],
        isValid: false,
        // errors: [t('')?.replace('{0}', label)],
      });
    }
    try {
      if (!!!newValue) {
        errors.push(t('newsletter_email_required')?.replace('{0}', label));
      }
      if (!!newValue) {
        validationDataModels?.map((_validation) => {
          if (
            // _validation?.name === 'TextValidator' ||
            // _validation?.name === 'Phone Number Validator' ||
            _validation?.name === 'Email Validator'
          ) {
            const regex = _validation?.parameters;
            const test = newValue?.match(JSON.parse(regex)?.regularExpression);

            if (!!!test) {
              errors?.push(t('newsletter_email_invalid')?.replace('{0}', label));
            }
          }
          if (_validation?.name === 'String Length Validator') {
            var test = true;
            const length = newValue?.length;
            // Handling pressing on keys after reaching max-length
            var keyDown = false;
            if (length === maxLength && !keyDown && !!e?.key) {
              keyDown = true;
              const validationMessage = t('newsletter_email_invalid_length')
                ?.replace('{0}', model?.title)
                ?.replace('{1}', minLength)
                ?.replace('{2}', maxLength);
              errors?.push(validationMessage);
              setTimeout(() => {
                valid = true;
                var index = errors.indexOf(validationMessage);
                errors.splice(index, 1);
                setValue({
                  value: newValue,
                  errors,
                });
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
              errors?.push(
                _validation?.message
                  ?.replace('{0}', label)
                  ?.replace('{1}', minLength)
                  ?.replace('{2}', maxLength)
              );
            }
          }
        });
        // if (newValue !== value?.value) {
        setValue({
          value: newValue,
          // errors: isBlur ? errors : [],
          errors,
          isValid: !!!errors?.length,
        });
        // }
      }
    } catch (e) {
      console.error(e?.message);
    }
  };

  return (
    <div className={clsx(Styles['CustomSingleLineText'], propClassName)}>
      <TextField
        variant="outlined"
        placeholder={placeholderText}
        fullWidth
        label={label}
        inputProps={{
          onKeyDown: (e) => {
            handleChange(e);
          },
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
        error={isError}
        onChange={(e) => handleChange(e)}
        // onBlur={(e) => handleChange(e, true)}
        autoComplete="off"
        autoCorrect="off"
      />
      {
        !!value?.errors?.length && (
          <ErrorComponent
            data-cy={`error-field-single-line-text-${'email'}`}
            {...{ errors: value?.errors }}
          />
        )
        // : (
        //   <TextComponent field={{ value: supportiveText }} className="form-supportive-text" />
        // )
      }
    </div>
  );
};

export default CustomSingleLineText;
