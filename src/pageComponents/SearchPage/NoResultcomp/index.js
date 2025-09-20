import React from 'react';
import styles from './styles.module.scss';
import ImageRenderer from 'subComponents/ImageRenderer';
import TextComponent from 'subComponents/TextComponent';
import TitleComponent from 'subComponents/TitleComponent';
import GlobalStructure from 'subComponents/GlobalStructure';

const NoResultcomp = (props) => {
  const { resultsNotFoundText, resultsNotFoundTitle, searchTerm } = props;
  // const shouldRenderNoResultImage = !!noResultImage?.value?.src;
  const shouldRenderResultsNotFoundText = !!resultsNotFoundText?.value;
  const shouldRenderResultsNotFoundTitle = !!resultsNotFoundTitle?.value;
  return (
    <GlobalStructure
      className={styles['NoResultcomp']}
      defaultPaddingClass={'default-padding-no-result'}
    >
      <div className={styles['NoResultcomp']}>
        <ImageRenderer
          icon={'images/no_result_icon_folder.svg'}
          className={styles['no-result-image']}
        />
        <div className={styles['no-result-content-container']}>
          {shouldRenderResultsNotFoundTitle && (
            <TitleComponent
              className={styles['no-result-title']}
              field={{
                value: resultsNotFoundTitle?.value?.replace('{0}', `${searchTerm?.toUpperCase()}`),
              }}
            />
          )}
          {shouldRenderResultsNotFoundText && (
            <TextComponent field={resultsNotFoundText} className={styles['no-result-text']} />
          )}
        </div>
      </div>
    </GlobalStructure>
  );
};

export default NoResultcomp;
