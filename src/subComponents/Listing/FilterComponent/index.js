/* eslint-disable quotes */
import React, { useEffect } from "react";
import "./styles.scss";
import AlphabeticalFilter from "./SubComponents/AlphabeticalFilter";
import RenderFilters from "./SubComponents/RenderFilters";
import useCustomFunctions from "./Utils";
import { useListingComponentContext } from "../context/ListingComponentContext";

const FilterComponent = (props) => {
  const { onlySorting } = props;
  const {
    setFilters,
    layout,
    filters,
    toggleFilterMenu,
    setForceHideFilters,
    rawData,
  } = useListingComponentContext();
  const { handleFilterChange } = useCustomFunctions();

  // const isDesktopLayout = useMediaQuery("(min-width:768px)");

  useEffect(() => {
    if (toggleFilterMenu) {
      document.body.classList.add("body-overflow-hidden");
    } else {
      document.body.classList.remove("body-overflow-hidden");
    }
  }, [toggleFilterMenu]);

  useEffect(() => {
    // this is used to hide filters when we have only one filter,
    // and this filter will be selected by default
    const rawDataResults = rawData?.filters?.children?.results;
    if (
      rawDataResults?.length === 1 &&
      rawDataResults?.[0]?.datasource?.targetItem?.children?.results?.length ===
        1
    ) {
      setForceHideFilters(true);
      handleFilterChange(
        filters,
        rawDataResults?.[0]?.searchField?.value,
        setFilters,
        rawDataResults?.[0]?.datasource?.targetItem?.children?.results?.[0]
          ?.displayValue?.value
      );
    }
  }, [rawData]);

  // const rawData = {}
  if (!!layout?.isAlphabeticalFilter) {
    return <AlphabeticalFilter />;
  } else {
    return <RenderFilters {...{ onlySorting }} />;
  }
};

const SortingFilter = () => {
  const renderFilterProps = {
    onlySorting: true,
  };

  return <FilterComponent {...renderFilterProps} />;
};

export { FilterComponent, SortingFilter };
// export default withTranslation()(FilterComponent);
