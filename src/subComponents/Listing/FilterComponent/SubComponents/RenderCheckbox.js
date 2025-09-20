import SitecoreIcon from 'components/Shared/components/SitecoreIcon';
import React, { Fragment } from 'react';
import clsx from 'clsx';
import useCustomFunctions from '../Utils';
import { useListingComponentContext } from '../../context/ListingComponentContext';

const RenderCheckbox = ({ filterKey, index, values }) => {
  const { filters, setFilters, setRef, setPageFromPagination } = useListingComponentContext();
  const { handleMultipleFilterChange, isFilterSelected } = useCustomFunctions();
  const selectData = values;
  // const isComputedField = filterKey.indexOf("computed") > -1;
  if (selectData?.length === 1 || selectData?.length === 0) {
    return null;
  }
  return (
    <Fragment key={index}>
      <div className="filter-line-seperator"></div>
      <div className="single-checkbox-container">
        <div className="filter-title">{selectData?.[0].label}</div>
        <div className="filter-data">
          {selectData &&
            selectData?.map((singleData, index) => {
              const fieldValue = singleData.value;

              const isSelected = isFilterSelected(
                // debes
                filters,
                filterKey,
                values,
                fieldValue
              );
              // debugger;
              return (
                <Fragment key={index}>
                  {!!singleData.value && (
                    <div
                      className={clsx('single-filter-value', isSelected && 'isSelectedCheckbox')}
                    >
                      <label className="checkbox-wrapper flex-it flex-align-item-center">
                        <input
                          type="checkbox"
                          data-group={filterKey}
                          ref={setRef(filterKey)}
                          value={fieldValue}
                          onChange={(e) =>
                            handleMultipleFilterChange(
                              // debes
                              filters,
                              filterKey,
                              setFilters,
                              fieldValue,
                              e,
                              setPageFromPagination
                            )
                          }
                        />
                        <span className="checkmark flex-it flex-align-item-center flex-justify-center">
                          <SitecoreIcon
                            className="share"
                            icon={`ico_checkbox_check`}
                            alt="check-icon"
                          />
                        </span>
                        <div className="checkbox-label">{singleData.label}</div>
                      </label>
                    </div>
                  )}
                </Fragment>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
};

export default RenderCheckbox;
