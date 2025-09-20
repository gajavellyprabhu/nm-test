import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';

export const Default = (props) => {
  // const styles = `${props.params.GridParameters ?? ''} ${props.params.Styles ?? ''}`.trimEnd();
  const rowStyles = [
    props.params.Styles1,
    props.params.Styles2,
    props.params.Styles3,
    props.params.Styles4,
    props.params.Styles5,
    props.params.Styles6,
    props.params.Styles7,
    props.params.Styles8,
  ];
  const enabledPlaceholders = props.params.EnabledPlaceholders.split(',');
  const id = props.params.RenderingIdentifier;

  return (
    <>
      {enabledPlaceholders?.map((ph, index) => {
        const phKey = `row-${ph}-{*}`;
        // const phStyles = `${rowStyles[+ph - 1] ?? ''}`.trimEnd();

        return <Placeholder key={index} name={phKey} rendering={props.rendering} />;
      })}
    </>
  );
};
