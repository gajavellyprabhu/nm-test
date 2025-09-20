import React, { useContext, createContext, useRef } from 'react';
import { useState } from 'react';

const formsContainerContext = createContext({
  dataToRegister: [],
  setDataToRegister: () => {},
  shouldShowThankYouComp: false,
  setShouldShowThankYouComp: () => {},
  fileUploadsDataOnMultiPagesForms: false,
  setFileUploadsDataOnMultiPagesForms: () => {},
  formRef: null,
  googleRecaptchaVerifiedKey: false,
  setGoogleRecaptchaVerifiedKey: () => {},
  loading: {},
  setLoading: () => {},
  productName: '',
  setProductName: () => {},
  eventValue: '',
  setEventValue: () => {},
});

export function useFormsContainerContext() {
  return useContext(formsContainerContext);
}

export function FormsContainerContextProvider(props) {
  const { children, shouldShowThankYouComp, setShouldShowThankYouComp, title } = props;
  const [productName, setProductName] = useState('');
  const [eventValue, setEventValue] = useState('');
  const [dataToRegister, setDataToRegister] = useState([]);
  const [googleRecaptchaVerifiedKey, setGoogleRecaptchaVerifiedKey] = useState('');
  const formRef = useRef(null);
  const [fileUploadsDataOnMultiPagesForms, setFileUploadsDataOnMultiPagesForms] = useState([]);
  const [loading, setLoading] = useState({});

  return (
    <formsContainerContext.Provider
      value={{
        shouldShowThankYouComp, // after submit
        setShouldShowThankYouComp,
        title,
        dataToRegister,
        setDataToRegister,
        formRef,
        fileUploadsDataOnMultiPagesForms,
        setFileUploadsDataOnMultiPagesForms,
        googleRecaptchaVerifiedKey,
        setGoogleRecaptchaVerifiedKey,
        loading,
        setLoading,
        productName,
        setProductName,
        eventValue,
        setEventValue,
      }}
    >
      {children}
    </formsContainerContext.Provider>
  );
}
