import React from 'react';
import loader from 'assets/images/loader/loader.gif'
import { withTranslation } from 'react-i18next';

import './styles.scss';

const LoadingPagination = ({ t, minimalVariation }) => {
    return (
        <div className={`loading-pagination ${minimalVariation && 'minimalVariation'}`}>
            < img className="loader" src={loader} />
            {!minimalVariation && <span className="loaderText">{t('Search.Loading')}</span>
            }
        </div >
    )
}

export default withTranslation()(LoadingPagination);
