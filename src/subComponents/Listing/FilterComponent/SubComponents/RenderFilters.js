import React, { Fragment } from "react";
import RenderSorting from "./RenderSorting";
import RenderMixedFilters from "./RenderMixedFilters";
import { isEmpty } from "lodash";
import RenderSelectedFilters from "./RenderSelectedFilters";
import clsx from "clsx";
import { useListingComponentContext } from "../../context/ListingComponentContext";

const RenderFilters = (props) => {
  const { onlySorting } = props;

  const { rawData, toggleFilterMenu } = useListingComponentContext();
  const hasFilterDataLoaded = !isEmpty(rawData);

  // const shouldShowFilterMobile =
  //   isMobile && toggleFilterMenu ? "d-flex" : "d-none";
  // const shouldShowFilterDesktop = !toggleFilterMenu ? "d-flex" : "d-none";

  // const designLayout = layout.design;
  if (onlySorting) {
    return <RenderSorting />;
  }
  return (
    hasFilterDataLoaded && (
      // BELOW CODE is for expand collapse functionality
      // <>
      //             <div className={`${shouldShowFilterMobile} filterMenu section`}
      //                 // {...customClick()}
      //                 onClick={() => setToggleFilterMenu(!toggleFilterMenu)}
      //             >
      //                 <span>{t('label_filters')}</span>
      //                 <SitecoreIcon className="share" icon="filterMobile" alt="closeFilterMobile" />
      //             </div>
      //             <div className={`FiltersContainer section ${isMobile && shouldShowFilterDesktop}`}>
      //                 <div className="d-md-none closeIcon"
      //                     onClick={() => setToggleFilterMenu(!toggleFilterMenu)}
      //                 >
      //                     <span>{t('label_filters')}</span>
      //                     <SitecoreIcon className="share" icon="closeFilterMobile" alt="closeFilterMobile" />
      //                 </div>
      //                 <div className="inputSelectContainer">
      //                     <div className="filters-title">{t('label_filters')}</div>
      //                     {(designLayout === 3) && renderSelectDropDowns(rawData, filters, setFilters, getRef, setRef, t, setPageFromPagination)}
      //                     {(designLayout === 2 || designLayout === 1) && renderCheckboxes(rawData, filters, setFilters, getRef, setRef, t, setPageFromPagination)}
      //                     {layout.showSearchBox && renderInputFilter(keyword, setKeyword, t, setPageFromPagination)}
      //                 </div>
      //             </div>
      //         </>
      <Fragment>
        <div
          className={clsx(
            `FiltersContainer section`,
            toggleFilterMenu && "open-menu-filter"
          )}
        >
          <div className="filters-container">
            <RenderMixedFilters />
            {/* {layout.showSorting && <RenderSorting />}
            {layout.showSearchBox && <RenderInputFilter />}
            {layout.showTriggers && <RenderFilterTriggers />} */}
          </div>
          {/* mobile version */}
          <RenderSelectedFilters />
        </div>
      </Fragment>
    )
  );
};

export default RenderFilters;
