import React, { useState } from 'react';
import clsx from 'clsx';
import TitleComponent from 'subComponents/TitleComponent';
import styles from './styles.module.scss';
import { FormsContainerContextProvider } from './FormsContainerContext';
import TextComponent from 'subComponents/TextComponent';
import GlobalStructure from 'subComponents/GlobalStructure';
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';

export const Default = (props) => {
  const { fields, params, i18n, rendering } = props;
  const { Styles } = params;
  const { shortDescription, title, titleTag } = fields;
  const shouldRenderTitle = !!title?.value;
  const shouldRenderShortDescription = !!shortDescription?.value;
  const [shouldShowThankYouComp, setShouldShowThankYouComp] = useState(false);

  return (
    <FormsContainerContextProvider
      {...{ shouldShowThankYouComp, setShouldShowThankYouComp, title }}
    >
      <GlobalStructure
        className={clsx(styles['FormsContainer'])}
        props={props}
        componentName={`FormsContainer`}
        i18n={i18n}
        paddingClass={Styles}
        anchorId={props?.rendering?.uid}
      >
        <div
          className={clsx(styles['form-container'])}
          data-cy={shouldShowThankYouComp ? 'form-success' : null}
        >
          {!shouldShowThankYouComp && (
            <div className={clsx(styles['content-title-text-wrapper'])}>
              <div className={clsx(styles['content-container'])}>
                {shouldRenderTitle && (
                  <TitleComponent headingTag={titleTag} field={title} className={styles['title']} />
                )}
                {shouldRenderShortDescription && (
                  <TextComponent field={shortDescription} className={styles['text']} />
                )}
              </div>
            </div>
          )}
          <div className={clsx(styles['form-wrapper'], shouldShowThankYouComp && styles['expand'])}>
            <Placeholder
              name="murabba-form"
              {...{ rendering }}
              // modifyComponentProps={(props) => ({ isStandAloneForm, ...props })}
            />
          </div>
        </div>
      </GlobalStructure>
    </FormsContainerContextProvider>
  );
};
