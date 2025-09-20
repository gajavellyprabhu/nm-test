import React, { useState, useContext, createContext } from 'react';

const searchPageContext = createContext({
  page: 1,
  setPage: () => {},
  setPageFromPagination: () => {},
  listingFilters: '',
  setListingFilters: () => {},
});

export function useSearchPageContext() {
  return useContext(searchPageContext);
}

export function SearchPageContextProvider({ children }) {
  const [page, setPage] = useState(1);
  const [listingFilters, setListingFilters] = useState('');
  const setPageFromPagination = (i) => {
    setPage(i);
  };
  return (
    <searchPageContext.Provider
      value={{
        page,
        setPage,
        setPageFromPagination,
        listingFilters,
        setListingFilters,
      }}
    >
      {children}
    </searchPageContext.Provider>
  );
}
