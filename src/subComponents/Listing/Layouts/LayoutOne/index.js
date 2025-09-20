import clsx from "clsx";
import React from "react";
import RenderedItemsBlock from "../../components/RenderedItemsBlock";
import RenderedPagination from "../../components/RenderedPagination";
import { FilterComponent } from "../../FilterComponent";
import RenderSwiperOnMobileTheme from "../../components/RenderSwiperOnMobileTheme";
import { useListingComponentContext } from "../../context/ListingComponentContext";

const LayoutOne = (props) => {
  const { isMobileLayout } = useListingComponentContext();
  return (
    <div className={clsx("layout-0 design-5")}>
      <div className="component-sub-content">
        <div className="top-filters flex-it flex-wrap">
          <FilterComponent />
        </div>
      </div>
      <div className="add-green-layout">
        {isMobileLayout ? (
          <RenderSwiperOnMobileTheme />
        ) : (
          <div className="component-sub-content">
            <div className={clsx("comp-listing flex-it flex-wrap")}>
              <RenderedItemsBlock />
              <div className={clsx("bottom-remove-fix", "sticky-component")} />
            </div>
            <RenderedPagination />
          </div>
        )}
      </div>
    </div>
  );
};

export default LayoutOne;
