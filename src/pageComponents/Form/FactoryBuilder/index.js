import React from 'react';
import { createDefaultFieldFactory } from '@sitecore-jss/sitecore-jss-react-forms';
import { customFormFieldsComponents } from '../contstants';

const FactoryBuilder = () => {
  const factory = createDefaultFieldFactory();

  customFormFieldsComponents?.map((item, i) => {
    const { componentsTargeted, ComponentToRender, isVoid } = item;
    return componentsTargeted?.map((item, _i) => {
      const { components, type, fieldProps } = item;
      return components?.map((_item, _i) =>
        factory.setComponent(_item, (props) =>
          isVoid ? <></> : <ComponentToRender {...{ ...fieldProps, ...props, type, key: _i }} />
        )
      );
    });
  });
  return factory;
};

export default FactoryBuilder;
