import SitecoreIcon from "components/Shared/components/SitecoreIcon";
import React from "react";
import { useListingComponentContext } from "../../context/ListingComponentContext";

const RenderInputFilter = () => {
  const { keyword, setKeyword, t, setPageFromPagination } =
    useListingComponentContext();
  return (
    <div className="wrap-container-search">
      <div className="inputAndSearchContainer search-box">
        <SitecoreIcon
          className="ico-search-box flex-it flex-align-item-center"
          renderSVG
          icon="ico_search"
        />
        <input
          value={keyword}
          onChange={(e) => {
            setPageFromPagination(1);
            setKeyword(e.target.value);
          }}
          placeholder={t("Search.Placeholder")}
          className="keyWordSearch"
        />

        {!!keyword && keyword !== "" && (
          <SitecoreIcon
            className="ico-search-close flex-it flex-align-item-center"
            renderSVG
            icon="closeIcon"
            onClick={() => {
              setPageFromPagination(1);
              setKeyword("");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RenderInputFilter;
