import SitecoreIcon from "components/Shared/components/SitecoreIcon";
import React from "react";
import useCustomFunctions from "../Utils";
import { useListingComponentContext } from "../../context/ListingComponentContext";

const RenderFilterTriggers = () => {
  const {
    setSearchable,
    filters,
    setFilters,
    rawData,
    getRef,
    setRef,
    keyword,
    setKeyword,
    t,
    showSearchButton,
    sorting,
    setSorting,
    setPageFromPagination,
  } = useListingComponentContext();
  const { resetAllFilters } = useCustomFunctions();
  return (
    <div className="filterTriggerContainer">
      {showSearchButton && (
        <button className="submitButton" onClick={() => setSearchable(keyword)}>
          {t("Shared.Search")}
        </button>
      )}
      {/* <img className="resetFilterLogo" src={reset} onClick={() => resetAllFilters(setSearchable, keyword, setKeyword, rawData, getRef, setRef)} /> */}
      {(filters || keyword || sorting) && (
        <SitecoreIcon
          className="resetFilter"
          icon="ico_refresh"
          alt="ico_refresh"
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
        />
      )}
      {/* <img className="resetFilterLogo" src={reset} onClick={() => resetAllFilters(setSearchable, keyword, setKeyword, rawData, getRef, setRef)} /> */}
    </div>
  );
};

export default RenderFilterTriggers;
