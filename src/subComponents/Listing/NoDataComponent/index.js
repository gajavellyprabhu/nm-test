import React from 'react';
import { withTranslation } from 'react-i18next';

import noData from 'assets/images/NoData/noData.svg';

import './styles.scss';

const NoDataComponent = ({ t }) => {
  return (
    <div className="NoDataComponent">
      <img className="noDataImage" alt={t('Search.NoDataText')} src={noData} />
      <strong className="loaderText">{t('Search.NoData')}</strong>
      <span className="noDataText">{t('Search.NoDataText')}</span>
    </div>
  );
};

export default withTranslation()(NoDataComponent);
