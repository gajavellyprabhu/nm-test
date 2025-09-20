import React, { useState } from 'react';
import { ListingComponentContextProvider } from 'subComponents/Listing/context/ListingComponentContext';
import FAQListing from '../FAQsListing/FAQListing';
import dataQuery from './query.graphql';
import filtersQuery from './filter.graphql';
import dynamic from 'next/dynamic';

const ApolloCachingClient = dynamic(() => import('subComponents/ApolloCachingClient'), {
  // ssr: false,
});

export const FAQsListing = (props) => {
  const { params, fields } = props;
  // const { itemsPerRow, background, disableSwiperOnMobile } = params;
  const { disablePagination, rootItem, pageSize, sortOrder, fieldsEqual, facetOn } = fields;
  // const dataQuery = {};
  const contentToPass = {
    //
    // please do not remove any commented Properties
    //
    // displayComponent: SingleFAQ,
    // isLoadAll: true,
    // shouldLoadAllMobile: true,
    loadMorePagination: true,
    // isSingleFilter: true,
    // hideAllSection: false,
    // variables: {},
    shouldAddAllText: true,
    dataQuery,
    filtersQuery,
    rootItem,
    facetOn: facetOn?.fields?.facet?.fields?.field?.value,
    // pageSize: { value: 1 },
    pageSize,
    sortingSource: sortOrder,
    filterSource: JSON.parse(fieldsEqual?.fields?.value?.value),
  };
  return (
    <ApolloCachingClient>
      <ListingComponentContextProvider {...{ ...contentToPass }}>
        <FAQListing {...{ ...props }} />
      </ListingComponentContextProvider>
    </ApolloCachingClient>
    // <></>
  );
};
