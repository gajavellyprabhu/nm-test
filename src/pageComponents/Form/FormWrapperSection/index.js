/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from '../styles.module.scss';
import { useConditions } from '../FormFieldHook';

const FormWrapperSection = (props) => {
  const { field, fieldFactory } = props;
  const [_, fieldShow] = useConditions(props);

  useEffect(() => {
    if (field?.model?.restorable) {
      field?.fields?.map((field) => {
        field.needToSave = true;
      });
    }
  }, []);
  return (
    <fieldset
      className={clsx(field?.model?.cssClass, styles['form-element-section'], fieldShow)}
      {...(field?.model?.name === 'recaptcha' && { 'data-cy': 'input-field-recaptcha' })}
    >
      {field?.fields?.map((el, index) => {
        return { ...fieldFactory(el), key: index };
      })}
    </fieldset>
  );
};

export default FormWrapperSection;
// "d7731fd3-0b48-4e3d-b6bd-eb1c83ad1c18"
