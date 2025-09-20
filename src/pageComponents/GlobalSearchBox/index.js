import React from 'react';
// import { GlobalSearchBoxComponentContextProvider } from 'subComponents/Listing/context/GlobalSearchBoxComponentContext';
import GlobalSearchBoxComponent from './GlobalSearchBoxComponent';
import dataQuery from './query.graphql';
import dynamic from 'next/dynamic';

const ApolloCachingClient = dynamic(() => import('subComponents/ApolloCachingClient'), {
  // ssr: false,
});

// export const Default = (props) => {
//   return <></>;
// };

export const Default = (props) => {
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
    // loadMorePagination: true,
    // isSingleFilter: true,
    // hideAllSection: false,
    // variables: {},
    shouldAddAllText: true,
    dataQuery,
    // filtersQuery,
    rootItem,
    // facetOn: facetOn?.fields?.facet?.fields?.field?.value,
    // pageSize: { value: 3 },
    pageSize,
    sortingSource: sortOrder,
    filterSource: JSON.parse(fieldsEqual?.fields?.value?.value),
  };
  return (
    <ApolloCachingClient>
      {/* <GlobalSearchBoxComponentContextProvider {...{ ...contentToPass }}> */}
      <GlobalSearchBoxComponent {...{ ...props }} />
      {/* </GlobalSearchBoxComponentContextProvider> */}
    </ApolloCachingClient>
  );
};
