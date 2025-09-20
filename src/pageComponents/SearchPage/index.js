import React from 'react';
import GlobalSearchComponent from '../SearchPage/SearchComponent';
// import dataQuery from './categories.graphql';
// import filtersQuery from './results.graphql';
import dynamic from 'next/dynamic';
import { SearchPageContextProvider } from './Context';
// import { GlobalSearchBoxComponentContextProvider } from 'subComponents/Listing/context/GlobalSearchBoxComponentContext';

const ApolloCachingClient = dynamic(() => import('subComponents/ApolloCachingClient'), {
  // ssr: false,
});

export const GlobalSearch = (props) => {
  // const { params, fields } = props;
  // // const { itemsPerRow, background, disableSwiperOnMobile } = params;
  // const { disablePagination, rootItem, pageSize, sortOrder, fieldsEqual, facetOn } = fields;
  // // const dataQuery = {};
  // const contentToPass = {
  //   //
  //   // please do not remove any commented Properties
  //   //
  //   // displayComponent: SingleFAQ,
  //   // isLoadAll: true,
  //   // shouldLoadAllMobile: true,
  //   loadMorePagination: true,
  //   // isSingleFilter: true,
  //   // hideAllSection: false,
  //   // variables: {},
  //   shouldAddAllText: true,
  //   dataQuery,
  //   filtersQuery,
  //   rootItem,
  //   facetOn: facetOn?.fields?.facet?.fields?.field?.value,
  //   // pageSize: { value: 1 },
  //   pageSize,
  //   sortingSource: sortOrder,
  //   filterSource: JSON.parse(fieldsEqual?.fields?.value?.value),
  // };
  // console.log('filterSource?.fields?.value?.value', filterSource);
  return (
    <ApolloCachingClient>
      <SearchPageContextProvider>
        <GlobalSearchComponent {...{ ...props }} />
      </SearchPageContextProvider>
    </ApolloCachingClient>
  );
};
