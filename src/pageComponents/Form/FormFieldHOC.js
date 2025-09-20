import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import { FormContext } from './FormContext';
import { takeActionOnMatchTypes, takeActionOnOperators } from './ConditionValues';

const withFormField = (OriginalComponent) => {
  const NewComponent = (props) => {
    const fieldKey = props?.fieldKey || props?.field?.model?.conditionSettings?.fieldKey;
    const id = props?.id;
    const [fieldIsDisabled, setFieldIsDisabled] = useState(false);
    const [fieldShow, setFieldShow] = useState(true);

    const {
      conditionSettings,
      actions: actionsContext,
      setActions: setActionsContext,
    } = useContext(FormContext);

    const handleChangeCB = (newValue, valueInLabel = false) => {
      const mainActionsRes = [];
      conditionSettings?.map((element) => {
        const key = Object?.keys(element)?.[0];
        if (key === id) {
          const scenarios = element?.[key];
          scenarios?.map((scenario) => {
            let conditionsActions = [];
            const matchType = scenario?.matchType;
            const conditions = scenario?.conditions;
            const actions = scenario?.actions;
            conditions?.map((condition) => {
              const value = valueInLabel ? newValue?.label : newValue;
              conditionsActions?.push(
                takeActionOnOperators(condition?.operator, value, condition?.value)
              );
            });
            const actionRes = [];
            if (takeActionOnMatchTypes(matchType, conditionsActions)) {
              actions?.map((action) => {
                actionRes?.push({
                  fieldId: action?.fieldId,
                  operator: action?.operator,
                });
              });
            }
            if (actionRes?.length > 0) {
              mainActionsRes?.push(...actionRes);
            }
          });
        }
      });
      setActionsContext(mainActionsRes);
    };

    useEffect(() => {
      actionsContext?.map((action) => {
        if (action?.fieldId === fieldKey) {
          if (action?.operator === 'show') {
            setFieldShow('d-flex');
          } else if (action?.operator === 'hide') {
            setFieldShow('d-none');
          } else if (action?.operator === 'disable') {
            setFieldIsDisabled(true);
          } else if (action?.operator === 'enable') {
            setFieldIsDisabled(false);
          }
        }
      });
    }, [actionsContext]);

    const componentProps = {
      fieldIsDisabled,
      fieldShow,
      handleChangeCB,
    };
    return <OriginalComponent {...componentProps} {...props} />;
  };
  return NewComponent;
};

export default withFormField;
