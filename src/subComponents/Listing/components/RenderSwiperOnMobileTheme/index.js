import React from "react";
import { Swiper } from "swiper/react";
import "swiper/css";
import RenderedItems from "../RenderedItems";
import clsx from "clsx";
import { getLangDir } from "helpers";
import { useListingComponentContext } from "../../context/ListingComponentContext";

const RenderSwiperOnMobileTheme = (props) => {
  const {
    itemsContainerClass,
    isMobileLayout,
    stickyComponentClass,
    swiperProps,
    i18n,
    loadAll,
  } = useListingComponentContext();
  return (
    <div className="component-sub-content padding-one-side-mobile">
      <div className={clsx(itemsContainerClass)}>
        {isMobileLayout && (
          <Swiper
            onReachEnd={loadAll}
            dir={`${getLangDir(i18n.language)}`}
            {...(!!swiperProps && { ...swiperProps })}
          >
            <RenderedItems isSwiper={true} />
          </Swiper>
        )}
        {/* {!isMobileLayout && renderedItems} */}
        <div className={clsx("bottom-remove-fix", `${stickyComponentClass}`)} />
      </div>
    </div>
  );
};
export default RenderSwiperOnMobileTheme;
