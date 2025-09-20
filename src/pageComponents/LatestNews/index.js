import React from 'react';
import dataQuery from './query.graphql';
import dynamic from 'next/dynamic';
import LatestNewsComponent from './LatestNewsComponent';
import { ListingComponentContextProvider } from 'subComponents/Listing/context/ListingComponentContext';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
const ApolloCachingClient = dynamic(() => import('subComponents/ApolloCachingClient'), {
  // ssr: false,
});

export const LatestNews = (props) => {
  const { sitecoreContext } = useSitecoreContext();
  const { itemId } = sitecoreContext?.route;
  const { fields } = props;

  const { disablePagination, rootItem, pageSize, sortOrder, fieldsEqual, facetOn } = fields;

  let filter = fieldsEqual?.fields?.value?.value;
  if (!!itemId) {
    filter = filter?.replace('notin:', `notin:${itemId?.replaceAll('-', '')}`);
  }

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
    // variables: {
    sortDesc:
      fields?.sortOrder?.fields?.direction?.fields?.Value?.value?.toLowerCase() === 'descending',
    // },
    shouldAddAllText: true,
    dataQuery,
    // filtersQuery,
    rootItem,
    facetOn: facetOn?.fields?.facet?.fields?.field?.value,
    // pageSize: { value: 1 },
    pageSize,
    sortingSource: sortOrder,
    filterSource: JSON.parse(filter),
  };
  return (
    <ApolloCachingClient>
      <ListingComponentContextProvider {...{ ...contentToPass }}>
        <LatestNewsComponent {...{ ...props }} />
      </ListingComponentContextProvider>
    </ApolloCachingClient>
  );
};
