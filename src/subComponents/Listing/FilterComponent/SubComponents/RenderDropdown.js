import SitecoreIcon from "components/Shared/components/SitecoreIcon";
import React from "react";
import Select, { components } from "react-select";
import useCustomFunctions from "../Utils";
import { useListingComponentContext } from "../../context/ListingComponentContext";

const RenderDropdown = ({ filterKey, index, values, displayLabel }) => {
  const { filters, setFilters, setRef, t, setPageFromPagination } =
    useListingComponentContext();
  const { handleFilterChange } = useCustomFunctions();
  const selectData = values;
  const isComputedField = filterKey.indexOf("computed") > -1;
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
      // primary25: '#F8F2EB',
      // primary: '#55142d',
      fontFamily: "var(--theme-font)",
    },
  });

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {/* <img src={filterCarret} /> */}
        <SitecoreIcon
          className="share"
          icon={
            props.selectProps.menuIsOpen
              ? "ico_32_chevron_up_green"
              : `ico_32_chevron_down_white`
          }
          alt="add-icon"
        />
      </components.DropdownIndicator>
    );
  };
  const currentFilter = filters?.filter(
    (element) => element.name === filterKey
  );
  const currentFilterValue = currentFilter?.map((item) => ({
    value: item.value,
    label: item.name,
  }));
  const selectedOption =
    selectData?.filter((element) => {
      const actualFilterValue = currentFilterValue?.[0]?.value?.toLowerCase();
      // if (isComputedField) {
      //     if (actualFilterValue) {
      //         return element.label.toLowerCase() === (actualFilterValue || '')
      //     } else {
      //         return element.value.toLowerCase() === (currentFilterValue?.[0]?.label.toLowerCase() || '')
      //     }
      // } else {
      return element.value?.toLowerCase() === (actualFilterValue || "");
      // }
    }) || selectData[0];

  return (
    <div className="dropdown" key={index}>
      <div className="dropdown-label">{displayLabel}</div>
      <Select
        key={index}
        ref={setRef(filterKey)}
        onChange={(e) => {
          setPageFromPagination(1);
          handleFilterChange(filters, filterKey, setFilters, e?.value);
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
    </div>
  );
};

export default RenderDropdown;
