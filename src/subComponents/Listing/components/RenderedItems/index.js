import React from "react";
import { SwiperSlide } from "swiper/react";
import { useListingComponentContext } from "../../context/ListingComponentContext";

const RenderedItems = (props) => {
  const { isGridView, displayComponent, dataToRender, displayComponentProps } =
    useListingComponentContext();
  const SwiperSliderWrapper = ({ children }) => {
    return <SwiperSlide>{children}</SwiperSlide>;
  };
  return dataToRender?.map((item, index) => {
    const ComponentToDisplay = displayComponent;
    const ComponentToRender = () => (
      <ComponentToDisplay
        key={`Component_to_display_${index}`}
        item={item}
        isGridView={isGridView}
        index={`item_listing_${index}`}
        index2={index}
        length={dataToRender?.length}
        {...(!!displayComponentProps && { ...displayComponentProps })}
      />
    );
    return !!props?.isSwiper ? (
      <SwiperSliderWrapper key={index}>
        <ComponentToRender />
      </SwiperSliderWrapper>
    ) : (
      <ComponentToRender key={index} />
    );
  });
};

RenderedItems.displayName = "SwiperSlide";
export default RenderedItems;
