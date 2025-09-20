import Pagination from "components/Shared/components/Pagination";
import React from "react";
import RenderedLoadmore from "../RenderedLoadmore";
import { useListingComponentContext } from "../../context/ListingComponentContext";

const RenderedPagination = () => {
  const { layout, loadMorePagination, paginationProps } =
    useListingComponentContext();
  return !layout?.hidePagination ? (
    loadMorePagination ? (
      <RenderedLoadmore />
    ) : (
      <Pagination {...paginationProps} />
    )
  ) : (
    <></>
  );
};

export default RenderedPagination;
