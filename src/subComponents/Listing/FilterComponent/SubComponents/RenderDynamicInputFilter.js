import SitecoreIcon from "components/Shared/components/SitecoreIcon";
import React from "react";
import useCustomFunctions from "../Utils";
import { useListingComponentContext } from "../../context/ListingComponentContext";

const RenderDynamicInputFilter = ({ displayLabel, filterKey, index }) => {
  const { filters, setFilters, setPageFromPagination, t } =
    useListingComponentContext();
  const { getFilter, handleFilterChange, removeSingleFilter } =
    useCustomFunctions();
  const currenFilter = getFilter(filters, filterKey);
  const currenFilterValue = currenFilter?.value?.replaceAll("*", "") || "";

  return (
    <div key={index} className="wrap-container-search">
      <div className="inputAndSearchContainer search-box">
        <SitecoreIcon
          className="ico-search-box flex-it flex-align-item-center"
          renderSVG
          icon="ico_search"
        />
        <input
          value={currenFilterValue}
          onChange={(e) => {
            setPageFromPagination(1);
            // setKeyword(e.target.value);
            handleFilterChange(
              filters,
              filterKey,
              setFilters,
              `${e?.target?.value}`
            );
          }}
          placeholder={displayLabel || t("Search.Placeholder")}
          className="keyWordSearch"
        />

        {!!currenFilterValue && currenFilterValue !== "" && (
          <SitecoreIcon
            className="ico-search-close flex-it flex-align-item-center"
            renderSVG
            icon="closeIcon"
            onClick={() => {
              setPageFromPagination(1);
              removeSingleFilter(
                filters,
                filterKey,
                currenFilter?.value,
                setFilters,
                setPageFromPagination
              );
              // handleFilterChange(filters, filterKey, setFilters, "");
            }}
          />
        )}

        {/* <img className="searchIcon" src={search} /> */}
        {/* search */}
      </div>
    </div>
  );
};

export default RenderDynamicInputFilter;
