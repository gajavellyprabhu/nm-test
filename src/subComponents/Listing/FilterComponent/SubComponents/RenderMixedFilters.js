import React from "react";
import RenderDynamicInputFilter from "./RenderDynamicInputFilter";
import RenderDropdown from "./RenderDropdown";
import RenderTabs from "./RenderTabs";
import RenderCheckbox from "./RenderCheckbox";
import clsx from "clsx";
import { useListingComponentContext } from "../../context/ListingComponentContext";

const RenderMixedFilters = () => {
  const { rawData, t, isSeperatedFilters, allFilters } =
    useListingComponentContext();
  // const allFilters = getFiltersSelectOptions(rawData);
  // if (isSeperatedFilters) {
  //   let checboxes = [];
  //   let dropdowns = [];
  //   let tabs = [];
  //   let inputs = [];

  //   allFilters?.map((item) => {
  //     item?.items?.map((_item) => {
  //       const { type } = allFilters;
  //       if (type === "Checkbox" || type === "Checkboxlist") {
  //         checboxes.push(item);
  //       }
  //       if (type === "Dropdown") {
  //         dropdowns.push(item);
  //       }
  //       if (type === "Tab") {
  //         tabs.push(item);
  //       }
  //       if (type === "Input") {
  //         inputs.push(item);
  //       }
  //     });
  //   });
  //   return (
  //     <div
  //       className={clsx(
  //         `wrap-filters`,
  //         isSeperatedFilters && "isSeperatedFilters"
  //       )}
  //     >
  //       <div className="inputs-wrap-filters">
  //         {inputs?.map((element, index) => {
  //           return Object.keys(element).map((filterKey, index) => {
  //             const { values, type, displayLabel } = element[filterKey];
  //             return (
  //               <RenderDynamicInputFilter
  //                 key={index}
  //                 {...{
  //                   displayLabel,
  //                   filterKey,
  //                   index,
  //                 }}
  //               />
  //             );
  //           });
  //         })}
  //       </div>
  //       <div className="inner-filters">
  //         <div className="filter-title-mobile flex-align-item-center">
  //           {t("Text_Filters")}
  //         </div>

  //         <div className="dropdown-wrap-filters">
  //           {dropdowns?.map((element, index) => {
  //             return Object.keys(element).map((filterKey, index) => {
  //               const { values, type, displayLabel } = element[filterKey];
  //               return (
  //                 <RenderDropdown
  //                   key={index}
  //                   {...{
  //                     filterKey,
  //                     index,
  //                     values,
  //                     displayLabel,
  //                   }}
  //                 />
  //               );
  //             });
  //           })}
  //         </div>
  //         <div className="tabs-wrap-filters">
  //           {tabs?.map((element, index) => {
  //             return Object.keys(element).map((filterKey, index) => {
  //               const { values, type, displayLabel } = element[filterKey];
  //               return (
  //                 <RenderTabs
  //                   key={index}
  //                   {...{
  //                     filterKey,
  //                     index,
  //                     values,
  //                   }}
  //                 />
  //               );
  //             });
  //           })}
  //         </div>
  //         <div className="checboxes-wrap-filters">
  //           {checboxes?.map((element, index) => {
  //             return Object.keys(element).map((filterKey, index) => {
  //               const { values, type, displayLabel } = element[filterKey];
  //               return (
  //                 <RenderCheckbox
  //                   key={index}
  //                   {...{
  //                     filterKey,
  //                     index,
  //                     values,
  //                   }}
  //                 />
  //               );
  //             });
  //           })}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // } else {
  // old methos
  return allFilters?.map((item, i) => {
    const { type, displayLabel } = item;
    if (type === "Dropdown") {
      return (
        <RenderDropdown
          key={i}
          {...{
            values: item?.items,
            displayLabel,
          }}
        />
      );
    } else if (type === "Checkbox" || type === "Checkboxlist") {
      return (
        <RenderCheckbox
          key={i}
          {...{
            values: item?.items,
          }}
        />
      );
    } else if (type === "Tab") {
      return (
        <RenderTabs
          key={i}
          {...{
            values: item?.items,
          }}
        />
      );
    } else if (type === "Input") {
      return (
        <RenderDynamicInputFilter
          key={i}
          {...{
            displayLabel,
          }}
        />
      );
    } else {
      return <></>;
    }
  });
  // }
};

export default RenderMixedFilters;
