import React from "react";
import SitecoreIcon from "components/Shared/components/SitecoreIcon";
import RenderedItems from "../RenderedItems";
import NoDataBlock from "../NoDataBlock";
import { useListingComponentContext } from "../../context/ListingComponentContext";

const RenderedItemsBlock = () => {
  const { loadingData, dataToRender, firstLoad } = useListingComponentContext();
  const hasDataToRender = !!dataToRender?.length;
  return (
    <>
      {loadingData && (
        <div className="loader-full flex-it flex-align-item-center flex-justify-center">
          {<SitecoreIcon renderSVG icon={`ico_loader`} /> || t("Text_Loading")}
        </div>
      )}

      {hasDataToRender || firstLoad ? (
        <RenderedItems />
      ) : (
        !loadingData && <NoDataBlock />
      )}
    </>
  );
};
export default RenderedItemsBlock;
