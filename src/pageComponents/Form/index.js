import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import clsx from 'clsx';
// import "./style.scss";
import { Form as SiteCoreForm } from '@sitecore-jss/sitecore-jss-react-forms';
import { sitecoreApiKey } from 'temp/config';
import FactoryBuilder from './FactoryBuilder';
import { useFormsContainerContext } from 'pageComponents/FormsContainer/FormsContainerContext';
// import "./style.scss";
import { FormContext } from './FormContext';
import { actionsMap, handleOperator, matchTypesMap, operatorsMap } from './ConditionValues';
import { takeActionOnMatchTypes, takeActionOnOperators } from './ConditionValues';
import { GoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import styles from './styles.module.scss';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { pushLayerObject } from './Shared/Helpers/dataLayerHelper';
import TextComponent from 'subComponents/TextComponent';

export const Default = (props) => {
  const { fields, isStandAloneForm } = props; //isStandAloneForm: related to the stepper
  const {
    shouldShowThankYouComp,
    setShouldShowThankYouComp,
    title,
    dataToRegister,
    formRef,
    setFileUploadsDataOnMultiPagesForms,
    setGoogleRecaptchaVerifiedKey,
    googleRecaptchaVerifiedKey,
    loading,
    setLoading,
    productName, // data layers: SEO
    eventValue,
    setEventValue,
  } = useFormsContainerContext();

  const factory = useMemo(FactoryBuilder, []);
  const recaptchaRef = useRef();
  const hiddenFieldCB = useRef();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  // We will use this state to pass it to context api, related to recaptcha
  const [formInfo, setFormInfo] = useState({
    recaptcha: false,
    hidden: false,
    recaptchaName: '',
    hiddenName: '',
    recaptchaDesclaimer: ''
  });
  const { sitecoreContext } = useSitecoreContext();
  const { recaptcha } = sitecoreContext;
  const { publicKey } = recaptcha;
  const [touchPointIDMap, setTouchPointIDMap] = useState(new Map());

  const [hiddenFieldValue, setHiddenFieldValue] = useState('');
  const [fieldsToMapState, setFieldsToMapState] = useState([]);
  const [conditionSettings, setConditionSettings] = useState([]);
  const [actions, setActions] = useState([]);
  const [formErrors, setFormErrors] = useState([]);
  const [fieldsDataLayerGTM, setfieldsDataLayerGTM] = useState([]);

  // const mappingFieldsArr = [
  //   'IDIdentifier',
  //   'WebsiteIdentifier',
  //   'ProductAcronym',
  //   'LanguagePage',
  //   'FormID',
  // ];
  useEffect(() => {
    handleSetConditionsAndProps();
    setTimeout(() => {
      document.querySelector('form.form-container-form').setAttribute('data-cy', `form-container`)
    }, 2000);

  }, []);

  // useEffect(() => {
  //   console.log('fieldsDataLayerGTM', fieldsDataLayerGTM);
  // }, [fieldsDataLayerGTM]);

  useEffect(() => {
    localStorage.removeItem('mobileField');
    if (typeof document !== 'undefined') {
      var forms = document.querySelectorAll('form') || [];
      for (var i = 0; i < forms.length; i++) {
        forms?.[i].setAttribute('novalidate', true);
      }
    }
  }, []);

  const onRecaptchaVerify = useCallback((token) => {
    if (!!!googleRecaptchaVerifiedKey) {
      setGoogleRecaptchaVerifiedKey(token);
    }
  });

  useEffect(() => {
    fieldsToMapState?.map((field) => {
      if (!!field?.model?.eventParameters?.trim()) {
        setfieldsDataLayerGTM((preValue) => [
          ...preValue,
          {
            key: field?.model?.eventParameters,
            value: field?.model?.itemId,
            name: field?.model?.name,
          },
        ]);
      }
    });
  }, [fieldsToMapState]);
  // this funciton handles the conditions related between different fields
  const handleSetConditionsAndProps = (fields) => {
    const fieldsConditionRes = [];
    const touchPointIDMapRes = new Map();
    // let targetedFields = !!fields // we need the nextForm to validate the other conditions and we are targeting the fields?.[1]?.f... because in multipages forms we have a stepper which is included in the form as an input
    //   ? fields
    //   : isStandAloneForm
    //   ? props?.fields?.fields
    //   : props?.fields?.fields?.[1]?.fields;

    let targetedFields = !!fields ? fields : props?.fields?.fields;

    let fieldsToMap = [];
    targetedFields?.map((item) => {
      // Sometimes the BE sends fieldSet inside fieldSet so we are mappping them to get the right data
      const itemfields = item?.fields;
      if (!!itemfields) {
        itemfields?.map((_item) => {
          fieldsToMap.push(_item);
        });
      } else {
        fieldsToMap.push(item);
      }
    });
    setFieldsToMapState(fieldsToMap);
    fieldsToMap?.forEach((field) => {
      // if we have a recaptcha
      // if (!!field?.model?.eventParameters?.trim()) {
      //   console.log('setfieldsDataLayerGTM field', field);
      //   setfieldsDataLayerGTM((preValue) => [
      //     ...preValue,
      //     {
      //       key: field?.model?.eventParameters,
      //       value: field?.model?.itemId,
      //       name: field?.model?.name,
      //     },
      //   ]);
      // }

      if (field?.model?.fieldTypeItemId === '{1EE31041-E090-4136-9812-10DE2C21F1D0}') {
        // b4cc5f67-9816-4a7e-9504-7e6a8d6ebf31
        // 447AA745-6D29-4B65-A5A3-8173AA8AF548} hosted
        setFormInfo((prev) => ({
          ...prev,
          recaptcha: true,
          recaptchaName: field?.valueField?.name,
          recaptchaDesclaimer: field?.model?.recaptchaDesclaimer
        }));
      }
      const fieldConditions = [];
      field?.model?.conditionSettings?.fieldConditions?.map((condition) => {
        const actions = [];
        const conditions = [];
        condition?.conditions?.map((singleCondition) => {
          // search for this fieldID and it's normal id
          let id = '';
          fieldsToMap?.forEach((field) => {
            if (field?.model?.conditionSettings?.fieldKey === singleCondition?.fieldId) {
              id = field?.valueField?.id;
            }
          });
          conditions?.push({
            value: singleCondition?.value,
            fieldId: singleCondition?.fieldId,
            operator: operatorsMap?.get(singleCondition?.operatorId),
            id,
          });
        });
        condition?.actions?.forEach((singleAction) => {
          let id = '';
          fieldsToMap?.forEach((field) => {
            if (field?.model?.conditionSettings?.fieldKey === singleAction?.fieldId) {
              id = field?.valueField?.id;
            }
          });
          actions?.push({
            value: singleAction?.value,
            fieldId: singleAction?.fieldId,
            operator: actionsMap?.get(singleAction?.actionTypeId),
            id,
          });
        });
        fieldConditions?.push({
          matchType: matchTypesMap?.get(condition?.matchTypeId),
          conditions,
          actions,
        });
      });
      if (fieldConditions?.length > 0) {
        fieldsConditionRes?.push({
          [field?.valueField?.id]: fieldConditions,
        });
      }
    });
    handleChangeCB(fieldsConditionRes); //this apply the condition
    setConditionSettings(fieldsConditionRes); // on mounting check condition
    setTouchPointIDMap(touchPointIDMapRes);
  };

  const handleChangeCB = (conditionsInput) => {
    const mainActionsRes = [];
    conditionsInput.map((element) => {
      const key = Object.keys(element)?.[0];
      const scenarios = element?.[key];
      scenarios?.map((scenario) => {
        let conditionsActions = [];
        const matchType = scenario?.matchType;
        const conditions = scenario?.conditions;
        const actions = scenario?.actions;
        conditions?.map((condition) => {
          const conditionInputField = fieldsToMapState?.find(
            (item) => item?.valueField?.id === condition?.id
          );
          const targetedInputField =
            conditionInputField && formRef?.current?.getCurrentFieldState(conditionInputField);

          const targetedInputFieldValue = Array.isArray(targetedInputField?.value)
            ? targetedInputField?.value?.[0] ?? ''
            : targetedInputField?.value ?? '';
          conditionsActions?.push(
            takeActionOnOperators(condition?.operator, targetedInputFieldValue, condition?.value)
          );
        });
        const actionRes = [];
        actions?.map((action) => {
          actionRes?.push({
            fieldId: action?.fieldId,
            operator: handleOperator(
              action?.operator,
              takeActionOnMatchTypes(matchType, conditionsActions)
            ),
          });
        });
        if (actionRes?.length > 0) {
          mainActionsRes?.push(...actionRes);
        }
      });
    });
    if (JSON.stringify(actions) !== JSON.stringify(mainActionsRes)) {
      setActions(mainActionsRes);
    }
    return;
  };
  const loopOverFields = (fields, fieldName) => {
    let value = '';
    fields?.map((field) => {
      const isRightField = field?.model?.name === fieldName;
      if (isRightField) {
        value = field?.model?.text;
      } else if (!value) {
        value = loopOverFields(field.fields, fieldName);
      }
    });
    return value;
  };
  const analyzeEventValue = (fields, eventValue, setEventValue) => {
    let val = eventValue;
    if (!eventValue) {
      const eventText = loopOverFields(fields, 'gtm_product_name');
      if (eventText) {
        val = eventText;
        setEventValue(eventText);
      }
    }
    return val;
  };
  const handleSubmitForm = async (formData, API, options) => {
    if (googleRecaptchaVerifiedKey) {
      // const token = await recaptchaRef?.current?.executeAsync();
      formData?.data?.find((obj, index) => {
        if (obj.key === formInfo?.recaptchaName) {
          formData.data[index] = {
            key: formInfo?.recaptchaName,
            value: googleRecaptchaVerifiedKey,
          };
          return true;
        }
      });
    }
    const navigationType = formData?.data.find((item) => item?.key?.includes('NavigationButtons'));
    dataToRegister.map((item) => formData.data.push(item));

    const navigationValue = formData?.data.find((item) => {
      const foundItem = item?.key?.includes(navigationType?.value) && item;
      if (foundItem && +foundItem?.value === 0) {
        return foundItem?.value;
      }
    });
    try {
      const res = await fetch(API, {
        body: formData.toMultipartFormData(),
        method: 'post',
        credentials: 'include',
        // mode: 'same-origin',
        ...formData,
      });
      const data = await res.json();
      const currentEventValue = analyzeEventValue(fields?.fields, eventValue, setEventValue);
      // const nextFormEventValue = !eventValue
      //   ? analyzeEventValue(data?.nextForm?.fields, eventValue, setEventValue, productName)
      //   : '';
      if (data?.success && navigationValue?.value === '0') {
        setFileUploadsDataOnMultiPagesForms(undefined);
        setShouldShowThankYouComp(true);
        // // setTimeout(()=>{
        // const gtmEventValue = nextFormEventValue || currentEventValue || eventValue;
        // const gtmOject = {
        //   event: 'form_success', // pass status of the form fill dynamically when users submit leads. If submission fails, pass the error value//
        //   product_name: gtmEventValue.replace('{product_name}', productName), // pass name of the product dynamically when users submit lead form//
        // };
        // // },1000)
        // dataLayer?.push(gtmOject);
        // let fieldsDataLayerGTM = [
        // { key: 'event', value: 'contact-us' },
        //   { key: 'queryType', value: '1cdb57a9-8d1e-4bbb-bca4-5bbfd1945ebd' },
        //   { key: 'userPhone', value: '3606db23-db40-41a7-9ea2-ca97e648d88d' },
        //   { key: 'userEmail', value: '464ca150-e0d3-4639-8791-db4e00e20044' },
        // ];
        // console.log('fieldsDataLayerGTM', fieldsDataLayerGTM);
        // pushLayer('event', fieldsDataLayerGTM?.[0]?.value);

        if (!!fieldsDataLayerGTM?.length) {
          let dataLayerObjectToPush = {};

          const handleSetObjectParams = (key, value) =>
            (dataLayerObjectToPush = { ...dataLayerObjectToPush, [key]: value });

          formData?.data?.map((item) => {
            const regex = /\[([a-f0-9-]+)\]/;
            // Extract the UUID using the regular expression
            const match = item?.key?.match(regex);
            // Output the result
            const uuid = match ? match[1] : null;
            const index = fieldsDataLayerGTM?.findIndex((obj) => {
              return obj.value === uuid;
            });

            let result =
              item?.key?.toLowerCase()?.indexOf(`[${uuid}].value`) !== -1 ? item?.value : null;

            if (!!result && !!fieldsDataLayerGTM?.[index]?.key && !!item?.value) {

              handleSetObjectParams(fieldsDataLayerGTM?.[index]?.key, item?.value?.trim());
              // pushLayer(fieldsDataLayerGTM?.[index]?.key, item?.value?.trim());
            }
          });

          let formIdObject = formData?.data?.find((obj) => {
            return obj.key.indexOf('.FormSessionId') !== -1;
          });
          // handleSetObjectParams('event', 'contactUS-form');

          handleSetObjectParams('event', fields?.metadata?.name);

          if (!!formIdObject) {
            // pushLayer('LeadID', formIdObject?.value);
            handleSetObjectParams('LeadID', formIdObject?.value);
          }

          pushLayerObject(dataLayerObjectToPush);
        }
      } else {
        const fieldsToMap = isStandAloneForm
          ? data?.nextForm?.fields
          : data?.nextForm?.fields?.[1]?.fields;
        handleSetConditionsAndProps(fieldsToMap);
      }
      setLoading({});
      return data;
    } catch (e) {
      setLoading({});
    }
  };

  const providerValue = {
    formInfo,
    setFormInfo,
    recaptchaRef,
    hiddenFieldValue,
    setHiddenFieldValue,
    hiddenFieldCB,
    conditionSettings,
    actions,
    setActions,
    selectedIndex,
    setSelectedIndex,
    touchPointIDMap,
    formErrors,
    setFormErrors,
    handleChangeCB,
    loading,
    setLoading,
  };

  const HandleRenderwithRecaptchaContext = (children) => {
    return (
      <GoogleReCaptchaProvider reCaptchaKey={publicKey}>{children}</GoogleReCaptchaProvider>
      // <GoogleReCaptchaProvider>{children}</GoogleReCaptchaProvider>
    );
  };
  const FormToRender = () => {
    return (
      <FormContext.Provider value={providerValue}>
        <div className={clsx(styles['Form'], shouldShowThankYouComp && styles['hide'])}>
          {/* SiteCoreForm: render fields of the fieldFactory */}
          <SiteCoreForm
            {... props}
            form={fields}
            className={clsx(
              props?.params?.Styles,
              styles['form-container-form'],
              isStandAloneForm && 'stand-alone',
              'form-container-form'
            )}
            // sitecoreApiHost={sitecoreApiHost}
            sitecoreApiHost={''}
            sitecoreApiKey={sitecoreApiKey}
            fieldFactory={factory}
            // formFetcher={debounce(handleSubmitForm, 300)}
            formFetcher={handleSubmitForm}
            fieldValidationErrorsComponent={() => <></>}
            errorComponent={() => <></>}
            ref={formRef}
          />
          {formInfo.recaptcha && <GoogleReCaptcha onVerify={onRecaptchaVerify} />}
          <TextComponent className={styles['recaptcha-disclaimer']} field={{value: formInfo?.recaptchaDesclaimer}} />
        </div>
      </FormContext.Provider>
    );
  };

  return formInfo.recaptcha ? HandleRenderwithRecaptchaContext(FormToRender()) : FormToRender();
};
