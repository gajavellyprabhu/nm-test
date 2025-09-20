import React from 'react';
import GlobalStructure from 'subComponents/GlobalStructure';
import styles from './styles.module.scss';
export const Default = (props) => {
  const { params } = props;
  const { Styles } = params;
  return (
    <div>
      <GlobalStructure paddingClass={Styles}>
        <img src="../../../public/images/error404.svg" alt="error404" />

        <div>
          <h1 className={styles['title']}>
            We’re sorry, but we can’t find the page that you’re looking for
          </h1>
          <p className={styles['description']}>
            It may no longer exist, changed location, or is temporarily unavailable. Please consider
            one of the links below
          </p>
          <a href="/">Go to the Home page</a>
        </div>
      </GlobalStructure>
    </div>
  );
};
