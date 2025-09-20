import SitecoreIcon from "components/Shared/components/SitecoreIcon";
import TitleComponent from "components/Shared/components/Title";
import React, { Fragment } from "react";
import Sticky from "react-stickynode";
import clsx from "clsx";
import useCustomFunctions from "../Utils";
import { useListingComponentContext } from "../../context/ListingComponentContext";

const RenderTabs = ({ values }) => {
  const {
    t,
    expandedMobileMenu,
    setExpandedMobileMenu,
    selectedTabText,
    dataCompleted,
    filterRef,
    stickyComponentClass,
    isMobileLayout,
    selectedFilters,
  } = useListingComponentContext();
  const { handleChangeFilters } = useCustomFunctions();
  const expandIcon = `icon_chevron_down`;
  const collapsedIcon = `icon_chevron_up`;

  return (
    <Fragment>
      {!isMobileLayout && (
        <div className="tabs-container flex-it flex-wrap">
          {values &&
            values.map((singleData, index) => {
              const currentValue = singleData.value;
              const isSelected = selectedFilters?.some(
                (item) => item.value === singleData.value
              );
              return (
                <div
                  className="parent-tab"
                  key={index}
                  onClick={() => {
                    // if (!isSelected) {
                    //   handleResetPageLimit(); // debes
                    //   // for single selections
                    //   handleFilterChange(
                    //     // debes
                    //     filters,
                    //     // filterKey,
                    //     setFilters,
                    //     currentValue
                    //   );

                    //   // for multiple selections
                    //   // setFilters(
                    //   //   multipleFilterHandler(
                    //   //     filters,
                    //   //     filterKey,
                    //   //     currentValue,
                    //   //     true
                    //   //   )
                    //   // );
                    // } else {
                    //   removeSingleValue(
                    //     filters,
                    //     // filterKey,
                    //     currentValue,
                    //     setFilters
                    //   );
                    // }
                    handleChangeFilters(singleData);
                  }}
                >
                  <div className={clsx("single-tab", isSelected && "selected")}>
                    <div className="tab-label">
                      {values?.label?.toLowerCase() ===
                      t("Text_All")?.toLowerCase()
                        ? t("Text_All")
                        : singleData?.label}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {isMobileLayout && (
        <div
          ref={filterRef}
          className={clsx(`filter-mobile`, expandedMobileMenu && "show-menu")}
        >
          <div
            className={clsx(
              "reserve-filter-height",
              `filter-${stickyComponentClass}`
            )}
          ></div>
          {dataCompleted && (
            <Sticky top={100} bottomBoundary={`.${stickyComponentClass}`}>
              <div
                className={`AccordionMobileSelector`}
                onClick={() => {
                  setExpandedMobileMenu((prev) => !prev);
                }}
              >
                <div className="acc-wrap flex-it flex-justify-center flex-align-item-center">
                  <TitleComponent
                    className="acc-text"
                    title={{ value: selectedTabText }}
                  />
                </div>
                <div className="menu-arrow flex-it flex-align-item-center flex-justify-center">
                  <SitecoreIcon
                    icon={expandedMobileMenu ? collapsedIcon : expandIcon}
                  />
                </div>
              </div>
              <div className="accm-items">
                <div className="auto">
                  {/* start */}
                  <div className="tabs-container flex-it flex-wrap">
                    {values &&
                      values.map((singleData, index) => {
                        // const currentValue = singleData.value;
                        // const currentLabel = singleData.label;
                        const isSelected = selectedFilters?.some(
                          (item) => item.value === singleData.value
                        );
                        // const shouldRenderTab =
                        //   singleData?.label?.toLowerCase() ===
                        //     t("Text_All")?.toLowerCase() || !!singleData?.value;

                        return (
                          <div
                            className={clsx(
                              `parent-tab`,
                              isSelected && "selected"
                            )}
                            key={index}
                            onClick={() => {
                              // debugger;
                              // setSelectedTabText((prev) =>
                              //   currentLabel === "" ||
                              //   currentLabel?.toLowerCase() ===
                              //     t("Text_All")?.toLowerCase()
                              //     ? t("Text_All")
                              //     : currentLabel
                              // );

                              // setExpandedMobileMenu((prev) => !prev);

                              // if (!isSelected) {
                              //   handleResetPageLimit();
                              //   // for single selections
                              //   // setFilters(
                              //   handleFilterChange(
                              //     filters,
                              //     // filterKey,
                              //     setFilters,
                              //     currentValue
                              //   );
                              // );

                              // for multiple selections
                              //   setFilters(
                              //     multipleFilterHandler(
                              //       filters,
                              //       filterKey,
                              //       currentValue,
                              //       true
                              //     )
                              //   );

                              // handleFilterChange(filters, filterKey, setFilters, currentValue)
                              // for multi selections
                              // multipleFilterHandler(filters,filterKey,currentValue,true)
                              // } else {
                              //   removeSingleValue(
                              //     filters,
                              //     // filterKey,
                              //     currentValue,
                              //     setFilters
                              //   );
                              // }
                              handleChangeFilters(singleData);
                            }}
                          >
                            <div className={clsx("single-tab")}>
                              <div className="tab-label">
                                {values?.label?.toLowerCase() ===
                                t("Text_All")?.toLowerCase()
                                  ? t("Text_All")
                                  : singleData?.label}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  {/* end */}
                </div>
              </div>
            </Sticky>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default RenderTabs;
