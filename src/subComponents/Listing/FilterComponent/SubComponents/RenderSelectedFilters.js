import SitecoreIcon from "components/Shared/components/SitecoreIcon";
import React from "react";
import clsx from "clsx";
import { useGlobalContext } from "context/GlobalContext";
import useCustomFunctions from "../Utils";
import { useListingComponentContext } from "../../context/ListingComponentContext";

const RenderSelectedFilters = () => {
  const {
    filters,
    setFilters,
    rawData,
    setPageFromPagination,
    setSorting,
    setSearchable,
    keyword,
    setKeyword,
    getRef,
    setRef,
    t,
    setToggleFilterMenu,
  } = useListingComponentContext();
  const {
    getFilterLabel,
    getFiltersSelectOptions,
    removeSingleFilter,
    resetAllFilters,
    resetCheckBoxes,
  } = useCustomFunctions();
  const { isMobileLayout: isMobile } = useGlobalContext();
  const filterKey = "title";
  const selectOptions = getFiltersSelectOptions(rawData);
  let count = 0;
  let filterCount = filters ? Object.keys(filters).length : 0;

  const renderFilter = (
    <div className={clsx(`filters-top-wrap`, `layoutNotFour`)}>
      <div className="top-filters-mobile">
        <div className="text-top flex-it flex-align-item-center">
          {t("Text_FilterNews")}
        </div>
        <div className="close-filter flex-it flex-align-item-center flex-justify-center">
          <SitecoreIcon
            className="close-filter-icon"
            icon="ico_close_white"
            alt="removeFilter"
            renderSVG
            onClick={() => setToggleFilterMenu((prev) => !prev)}
          />
        </div>

        <div className="open-filter flex-it flex-align-item-center flex-justify-center">
          <SitecoreIcon
            className="open-filter-icon"
            icon="ico_32_filter"
            alt="removeFilter"
            renderSVG
            onClick={() => setToggleFilterMenu((prev) => !prev)}
          />
          {/* {!!filters &&
      filters.map((filter, index) => {
        if (filter?.name !== filterKey) {
          filterCount += 1;
        }
      })} */}
          {filterCount > 0 && (
            <div className="nb-of-filter flex-it flex-align-item-center flex-justify-center">
              {filterCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  return (
    <>
      {renderFilter}

      {filters && (
        <div className={clsx("selected-filters")}>
          {!!filters &&
            filters.map((filter, index) => {
              if (filter?.name !== filterKey) {
                count += 1;
                const currrentChosenValues = filter?.value
                  ?.replace("in:", "")
                  ?.split(",");
                return currrentChosenValues?.map((singleChosenValue, index) => {
                  return (
                    <div
                      className="single-selected-filter"
                      key={index}
                      onClick={(e) => {
                        removeSingleFilter(
                          filters,
                          filter?.name,
                          singleChosenValue,
                          setFilters,
                          setPageFromPagination
                        );
                      }}
                    >
                      <div className="single-filter-label">
                        {getFilterLabel(
                          singleChosenValue,
                          filter?.name,
                          selectOptions
                        )}
                      </div>
                      <SitecoreIcon
                        className="close"
                        icon="removeFilter"
                        alt="removeFilter"
                      />
                    </div>
                  );
                });
              }
            })}
          <div className="clear-and-filters flex-it flex-align-item-center flex-align-item-center">
            <div className="selectedFilters">
              ({count} {t("Text_FiltersSelected")})
            </div>
            <div
              className="clear-all"
              onClick={() => {
                setSorting(null);
                resetAllFilters(
                  setSearchable,
                  keyword,
                  setKeyword,
                  setFilters,
                  rawData,
                  getRef,
                  setRef,
                  setPageFromPagination
                );
              }}
            >
              {t("Text_ClearAll")}
            </div>
            {!!filters && (
              <SitecoreIcon
                className="resetFilter-checkbox"
                icon="ico_refresh"
                alt="ico_refresh"
                onClick={() =>
                  resetCheckBoxes(setFilters, "category", setPageFromPagination)
                }
              />
            )}
          </div>
        </div>
      )}
    </>
    // ) : (
    //   <>
    //     <div className={clsx(`filters-top-wrap`)}>
    //       <div
    //         className="top-filters-mobile"
    //         onClick={() => setToggleFilterMenu((prev) => !prev)}
    //       >
    //         {toggleFilterMenu && (
    //           <div className="filter-control close-filter flex-it flex-align-item-center flex-justify-center">
    //             <SitecoreIcon
    //               className="close-filter-icon"
    //               icon="ico_close_white"
    //               alt="removeFilter"
    //               renderSVG
    //               onClick={() => setToggleFilterMenu((prev) => !prev)}
    //             />
    //           </div>
    //         )}
    //         {!toggleFilterMenu && (
    //           <div className="filter-control open-filter flex-it flex-align-item-center flex-justify-center">
    //             <SitecoreIcon
    //               className="open-filter-icon"
    //               icon="ico_32_filter"
    //               alt="removeFilter"
    //               renderSVG
    //               onClick={() => setToggleFilterMenu((prev) => !prev)}
    //             />

    //             {filterCount > 0 && (
    //               <div className="nb-of-filter flex-it flex-align-item-center flex-justify-center">
    //                 {filterCount}
    //               </div>
    //             )}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //     <div className="clear-and-filters">
    //       {filterCount > 0 && (
    //         <div className="btm-filters-wrap flex-it flex-align-item-center flex-justify-between">
    //           <div
    //             className="clear-all"
    //             onClick={() => {
    //               setSorting(null);
    //               resetAllFilters(
    //                 setSearchable,
    //                 keyword,
    //                 setKeyword,
    //                 setFilters,
    //                 rawData,
    //                 getRef,
    //                 setRef,
    //                 setPageFromPagination
    //               );
    //               resetCheckBoxes(setFilters, "category", setPageFromPagination);
    //             }}
    //           >
    //             {t("Text_ResetAllFilters")}
    //             <SitecoreIcon
    //               className="resetFilter-checkbox"
    //               icon="ico_refresh"
    //               alt="ico_refresh"
    //             />
    //           </div>

    //           {isMobile && (
    //             <div
    //               className="show-all-btn button button-primary"
    //               onClick={() => setToggleFilterMenu((prev) => !prev)}
    //             >
    //               {t("Text_ShowResults")}
    //             </div>
    //           )}
    //         </div>
    //       )}
    //     </div>
    //   </>
  );
};

export default RenderSelectedFilters;
