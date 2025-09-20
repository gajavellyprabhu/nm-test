import SitecoreIcon from "components/Shared/components/SitecoreIcon";
import React from "react";
import Select, { components } from "react-select";
import useCustomFunctions from "../Utils";
import { useListingComponentContext } from "../../context/ListingComponentContext";

const RenderSorting = () => {
  const { rawData, sorting, setSorting, setRef, t, setPageFromPagination } =
    useListingComponentContext();
  const { getSortingOptions } = useCustomFunctions();
  const sortingOptions = getSortingOptions(rawData);
  const selectData = sortingOptions;
  if (selectData?.length === 1) {
    return null;
  }

  const customStyles = {
    control: (base, state) => ({
      ...base,
      boxShadow: "none",
    }),
  };
  const theme = (theme) => ({
    ...theme,
    borderRadius: 0,
    colors: {
      ...theme.colors,
      fontFamily: "var(--theme-font)",
    },
  });

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <SitecoreIcon
          className="share"
          icon="ico_32_chevron_down_green"
          alt="arrow-icon"
        />
      </components.DropdownIndicator>
    );
  };
  let selectedOption = selectData?.[0];
  if (sorting) {
    const foundFilter = selectData?.find((option) => option?.value === sorting);
    if (foundFilter) {
      selectedOption = foundFilter;
    }
  }

  return (
    <Select
      key={"sortingSelect"}
      ref={setRef("sorting")}
      onChange={(e) => {
        setPageFromPagination(1);
        // const filterKey = "sortingKey";
        const sortingValue = e?.value;
        if (sortingValue !== null && sortingValue !== undefined) {
          setSorting(sortingValue);
        } else {
          setSorting(null);
        }
      }}
      value={selectedOption}
      options={selectData}
      defaultValue={selectData?.[0]}
      className="selectFilterContainer"
      classNamePrefix="selectFilter"
      styles={customStyles}
      theme={theme}
      components={{ DropdownIndicator }}
      noOptionsMessage={() => t("Shared.NoOption")}
    />
  );
};

export default RenderSorting;
