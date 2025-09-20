import React from 'react';
import { ListingComponentContextProvider } from 'subComponents/Listing/context/ListingComponentContext';
import NewsListingComponent from './NewsListingComponent';
import dataQuery from './query.graphql';
import filtersQuery from './filter.graphql';
import dynamic from 'next/dynamic';

const ApolloCachingClient = dynamic(() => import('subComponents/ApolloCachingClient'), {
  // ssr: false,
});

export const NewsListing = (props) => {
  const { fields } = props;
  // const { itemsPerRow, background, disableSwiperOnMobile } = params;
  const { rootItem, pageSize, sortOrder, fieldsEqual, facetOn } = fields;
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
    variables: {
      sortDesc:
        fields?.sortOrder?.fields?.direction?.fields?.Value?.value?.toLowerCase() === 'descending',
    },
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

  // debugger;
  // console.log('filterSource?.fields?.value?.value', filterSource);
  return (
    <ApolloCachingClient>
      <ListingComponentContextProvider {...{ ...contentToPass }}>
        <NewsListingComponent {...{ ...props }} />
      </ListingComponentContextProvider>
    </ApolloCachingClient>
    // <></>
  );
};
