import React from "react";
import { RichText, Text } from "@sitecore-jss/sitecore-jss-react";
import ResponsiveImage from "components/Shared/components/ResponsiveImage";
import { useListingComponentContext } from "../../context/ListingComponentContext";

const NoDataBlock = () => {
  const { fields } = useListingComponentContext();
  const { messageTitle, messageDescription, messageIcon } = fields;
  const shouldRenderMessageTitle = !!messageTitle?.value;
  const shouldRenderMessageDescription = !!messageDescription?.value;
  const shouldRenderMessageIcon = !!messageIcon?.value?.src;
  const isNoDataField =
    shouldRenderMessageTitle ||
    shouldRenderMessageDescription ||
    shouldRenderMessageIcon;

  return isNoDataField ? (
    <div className="no-data-message-wrapper">
      {shouldRenderMessageIcon && (
        <ResponsiveImage className="no-data-icon" field={messageIcon} />
      )}
      {shouldRenderMessageTitle && (
        <h1 className="no-data-title">
          <Text field={messageTitle} />
        </h1>
      )}
      {shouldRenderMessageDescription && (
        <RichText className="no-data-desc" field={messageDescription} />
      )}
    </div>
  ) : (
    <span className="no-data-desc">{t("Text_NoData")}</span>
  );
};
export default NoDataBlock;
