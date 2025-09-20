import { useState, useContext } from 'react';
import { useEffect } from 'react';
import { FormContext } from './FormContext';

const useConditions = (props) => {
  const fieldKey = props?.field?.model?.conditionSettings?.fieldKey;
  const [fieldIsDisabled, setFieldIsDisabled] = useState(false);
  const [fieldShow, setFieldShow] = useState(true);

  const { actions: actionsContext, handleChangeCB, conditionSettings } = useContext(FormContext);

  useEffect(() => {
    if (!!actionsContext) {
      actionsContext?.map((action) => {
        if (action?.fieldId === fieldKey) {
          if (action?.operator === 'show') {
            return setFieldShow('d-flex');
          } else if (action?.operator === 'hide') {
            return setFieldShow('d-none');
          } else if (action?.operator === 'disable') {
            return setFieldIsDisabled(true);
          } else if (action?.operator === 'enable') {
            return setFieldIsDisabled(false);
          }
        }
      });
    }
  }, [actionsContext]);

  const componentProps = [fieldIsDisabled, fieldShow, handleChangeCB, conditionSettings];

  return componentProps;
};

export { useConditions };
