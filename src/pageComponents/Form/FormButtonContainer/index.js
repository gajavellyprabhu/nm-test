import React from 'react';
// import { Button } from '@mui/material';
import Button from 'subComponents/Button';
import clsx from 'clsx';
import { useFormsContainerContext } from '../../FormsContainer/FormsContainerContext';
import { useConditions } from '../FormFieldHook';

const cssClassesDependOnNavigation = {
  [-1]: 'button-hyperlink',
  [0]: 'button-primary',
  [1]: 'button-primary',
};

const FormButtonContainer = (props) => {
  const { field, onButtonClick } = props;
  const { model, buttonField } = field;
  const { navigationStep, title, cssClass, itemId } = model;
  const { formRef, loading, setLoading } = useFormsContainerContext();

  const isResetButton = cssClass?.includes('reset');
  const [fieldIsDisabled, fieldShow, handleChangeCB, conditionSettings] = useConditions(props);

  const handleClick = (e) => {
    if (isResetButton) {
      e.preventDefault();
      formRef.current.setState((prev) => {
        return { ...prev, nextForm: null };
      });
      return formRef.current.resetFieldsState();
    } else {
      const isError = Object.values(formRef.current.state)?.some((item) => {
        return !!item?.errors?.length;
      });
      if (!isError) {
        setLoading({ [itemId]: true });
      }
      onButtonClick(buttonField?.name);
    }
    setTimeout(() => {
      handleChangeCB(conditionSettings);
    }, [50]);
  };
  return (
    <Button
      className={clsx(
        !isResetButton ? cssClassesDependOnNavigation?.[navigationStep] : 'button-hyperlink',
        fieldShow
      )}
      // onClick={handleClick}
      disabled={!!fieldIsDisabled ? fieldIsDisabled : loading?.[itemId] ?? false}
      handleClick={handleClick}
      text={title}
      isButton
      data-cy="input-field-submit"
    />
  );
};

export default FormButtonContainer;
