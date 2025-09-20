import React from "react";
import { useListingComponentContext } from "../../context/ListingComponentContext";

const RenderedLoadmore = () => {
  const {
    loadMorePagination,
    hasNext,
    shouldHideLoadAllButton,
    paginatedItems,
    isLoadAll,
    t,
    loadAll,
    loadMore,
  } = useListingComponentContext();
  return loadMorePagination && hasNext ? (
    !shouldHideLoadAllButton && paginatedItems?.length > 0 && (
      <div className="load-button-wrap">
        <div
          className="button button-primary"
          onClick={() => {
            if (isLoadAll) {
              loadAll();
            } else {
              loadMore();
            }
          }}
        >
          {isLoadAll ? t("Text_LoadAll") : t("Text_LoadMore")}
        </div>
      </div>
    )
  ) : (
    <></>
  );
};

export default RenderedLoadmore;
