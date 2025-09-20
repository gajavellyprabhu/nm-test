import React, { useContext, createContext, useState, useEffect } from 'react';
import { useRef } from 'react';
import { useGlobalContext } from 'globalContext/context';
import useDynamicRefs from 'subComponents/Listing/FilterComponent/DynamicRefs';
import { useQuery as ApolloQuery } from '@apollo/client';
import isEmpty from 'lodash/isEmpty';
import useCustomFunctions from 'subComponents/Listing/FilterComponent/Utils';
import { useI18n } from 'next-localization';

const PAGE_SIZE = 9;
const VIEW_TYPES = { listView: 'listView', gridView: 'gridView' };

const GlobalSearchBoxComponentContext = createContext({
  dataCompleted: false,
  setDataCompleted: () => {},
  filters: null,
  setActualFilters: () => {},
  searchable: '',
  setSearchable: () => {},
  page: 1,
  setPage: () => {},
  firstLoad: true,
  setFirstLoad: () => {},
  paginatedItems: [],
  setPaginatedItems: () => {},
  shouldHideLoadAllButton: false,
  setShouldHideLoadAllButton: () => {},
  setFilters: () => {},
  limit: null,
  setLimit: () => {},
  isGridView: null,
  setIsGridView: () => {},
  sorting: null,
  setSorting: () => {},
  selectedPageSize: PAGE_SIZE,
  handleResetPageLimit: () => {},
  getRef: () => {},
  setRef: () => {},
  keyword: '',
  setKeyword: () => {},
  toggleFilterMenu: false,
  setToggleFilterMenu: () => {},
  filterRef: null,
  expandedMobileMenu: false,
  setExpandedMobileMenu: () => {},
  forceHideFilters: false,
  setForceHideFilters: () => {},
  allFilters: undefined,
  setAllFilters: () => {},
  inputs_tabs: [],
  setInputs_tabs: () => {},
  selectedTabText: '',
  setSelectedTabText: () => {},
  rawData: null,
  setRawData: () => {},
  setPageFromPagination: () => {},
  totalCount: null,
  setTotalCount: () => {},
  hasNext: null,
  setHasNext: () => {},
  pageCount: null,
  setPageCount: () => {},
  dataToRender: null,
  setDataToRender: () => {},
  handleChangeFilter: () => {},
  t: () => {},
  loadMore: () => {},
  isSearchTermMoreThanThreeCharacters: false,
  setIsSearchTermMoreThanThreeCharacters: () => {},
});

export function useGlobalSearchBoxComponentContext() {
  return useContext(GlobalSearchBoxComponentContext);
}

export function GlobalSearchBoxComponentContextProvider(props) {
  const { locale, t } = useI18n();
  const i18n = { language: locale() };
  //
  const { getFiltersSelectOptions, handleFilterChange } = useCustomFunctions();
  const {
    shouldLoadAllMobile,
    children,
    dataQuery,
    variables,
    layout,
    scrollToRef,
    stickyComponentClass,
    fields,
    filtersQuery,
    loadMorePagination,
    rootItem,
    pageSize,
    sortingSource,
    filterSource,
    fieldsEqual,
    facetOn,
    shouldAddAllText,
  } = props;
  // console.log('rootItem', rootItem);

  const { isMobileLayout } = useGlobalContext();
  //
  // listing comp
  const [dataCompleted, setDataCompleted] = useState(false);
  const [filters, setActualFilters] = useState(null);
  const [searchable, setSearchable] = useState('');
  const [page, setPage] = useState(1);
  const [firstLoad, setFirstLoad] = useState(true);
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [shouldHideLoadAllButton, setShouldHideLoadAllButton] = useState(false);
  const selectedPageSize = pageSize?.value || PAGE_SIZE;
  const [limit, setLimit] = useState(Number(selectedPageSize));
  const [isGridView, setIsGridView] = useState(true);
  const [sorting, setSorting] = useState(
    !!sortingSource?.fields ? sortingSource?.fields?.facet?.fields?.field?.value : null
  );
  const [totalCount, setTotalCount] = useState(null);
  const [hasNext, setHasNext] = useState(null);
  const [pageCount, setPageCount] = useState(null);
  const [dataToRender, setDataToRender] = useState(null);

  // filter comp
  const [getRef, setRef] = useDynamicRefs();
  const [keyword, setKeyword] = useState('');
  const [toggleFilterMenu, setToggleFilterMenu] = useState(false);
  const filterRef = useRef(null);
  const [rawData, setRawData] = useState();
  const [expandedMobileMenu, setExpandedMobileMenu] = useState(false);
  const [forceHideFilters, setForceHideFilters] = useState(false);
  const [allFilters, setAllFilters] = useState();
  const [inputs_tabs, setInputs_tabs] = useState([]);
  const [selectedTabText, setSelectedTabText] = useState(t('Text_All'));
  //
  // New Filter states
  //
  const [selectedFilters, setSelectedFilters] = useState(filterSource ?? []);
  const [shouldConcactinate, setShouldConcactinate] = useState(false);
  const [isSearchTermMoreThanThreeCharacters, setIsSearchTermMoreThanThreeCharacters] =
    useState(false);

  //
  // Queries Listing

  const {
    loading: loadingData,
    error: dataError,
    data,
    previousData,
  } = ApolloQuery(
    dataQuery,
    {
      variables: {
        // filter: filters,
        filterSource: selectedFilters,
        // filterSource: [
        //   // ...filterSource?.[0],
        //   // { name: '_templateName', value: 'News Details' },
        //   ...selectedFilters?.map((item) => ({
        //     name: item?.filterCategory,
        //     value: item?.value,
        //   })),
        // ],
        // fieldsEqual: fieldsEqual,
        sortBy: sorting !== '' ? sorting : null,
        rootItem: rootItem?.id,
        offset: (Math.abs(page - 1) * selectedPageSize).toString(), // adding math.abs
        limit: limit,
        facetOn,
        keyword: searchable,
        language: i18n?.language,
        ...(!!variables && variables),
      },
      skip: !!layout?.hideAllSection && !!!filters ? true : false,
      onError: (e) => {},
      onCompleted: (newData) => {
        setDataCompleted(true);
        setPaginatedItems((preValue) => {
          if (shouldConcactinate) {
            return [...preValue, ...newData?.search?.results?.items];
          } else {
            return newData?.search?.results?.items;
          }
        });
        setShouldConcactinate(false);
        return newData;
      },
    },
    []
  );
  useEffect(() => {
    // if (!!data?.search?.results?.length) {
    setTotalCount(data?.search?.results?.totalCount);
    setHasNext(data?.search?.results?.pageInfo?.hasNextPage || false);
    setPageCount(Math.ceil(data?.search?.results?.totalCount / selectedPageSize));
    !isEmpty(paginatedItems) && setDataToRender(paginatedItems);
    // }
  }, [paginatedItems]);

  const paginationProps = {
    pageCount,
    totalCount,
    page,
    filters,
    sorting,
    t,
    setPageFromPagination: (index) => {
      setPage(index);
    },
    scrollToRef,
    stickyComponentClass,
    dataCompleted,
  };
  const handleLoadAll = () => {
    setPaginatedItems([]);
    setLimit(100);
    setPage(0);
  };
  const loadAll = () => {
    if (hasNext) {
      setPaginatedItems([]);
      setLimit(100);
      setPage(1);
      // if (paginatedItems?.length <= selectedPageSize) {
      //   setShouldHideLoadAllButton(true);
      // }
    }
  };

  const handleChangeFilter = (filter) => {
    const { filterCategory, value } = filter;
    const existingIndex = selectedFilters?.findIndex((item) => item?.value === value);

    if (existingIndex !== -1) {
      const newArray = [...selectedFilters];
      !shouldAddAllText &&
        newArray.splice(existingIndex, 1, { ...selectedFilters?.[existingIndex], value: '' });
      setSelectedFilters(newArray);
    } else {
      const newCategoryModified = selectedFilters?.map((item) => {
        if (item?.name === filterCategory) {
          return { ...item, value };
        }
        return item;
      });
      setSelectedFilters(newCategoryModified);
      handleResetPageLimit();
    }
  };
  const loadMore = () => {
    // hasNext
    if (hasNext) {
      setShouldConcactinate(true);
      setPage((page) => page + 1);
    }
  };
  useEffect(() => {
    if (isMobileLayout && shouldLoadAllMobile) {
      handleLoadAll();
    }
  }, [shouldLoadAllMobile, isMobileLayout]);
  // Queries Filters
  if (!!filtersQuery) {
    // query
    const {
      loading: loadingFilters,
      error: filterError,
      data: filterData,
    } = ApolloQuery(filtersQuery, {
      // variables: {
      //   language: i18n.language,
      //   filtersRootItem: filterSource?.id,
      //   sortingRootItem: sortingSource?.id,
      // },
      variables: {
        filterSource,
        // fieldsEqual: fieldsEqual,
        sortBy: sorting !== '' ? sorting : null,
        rootItem: rootItem?.id,
        offset: (Math.abs(page - 1) * selectedPageSize).toString(), // adding math.abs
        limit: limit,
        facetOn: 'category',
        keyword: searchable,
        language: i18n?.language,
        ...(!!variables && variables),
      },
      onCompleted: (data) => {
        return data;
      },
    });
    customUseEffect(() => {
      const targetData = filterData?.search?.facets;
      if (!!targetData?.length) {
        const filterDataCleaned = getFiltersSelectOptions(targetData, shouldAddAllText);
        setAllFilters(filterDataCleaned);
        setRawData(filterData);
        // setSelectedFilters(filterDataCleaned?.items?.[0]);
      }
    }, [filterData]);
  }
  useEffect(() => {
    if (!!allFilters?.length) {
      let duplicatedArray = [];
      allFilters?.forEach((element) => {
        Object.keys(element)?.forEach((filterKey) => {
          const { type } = element[filterKey];
          if (type === 'Tab') {
            duplicatedArray.push(element);
            setInputs_tabs((preValue) => [...preValue, element]);
          }
        });
      });
      if (!!layout?.hideAllSection) {
        const rawDataResults = rawData?.filters?.children?.results;

        handleFilterChange(
          filters,
          rawDataResults?.[0]?.searchField?.value,
          setFilters,
          duplicatedArray?.[0]?.category?.values?.[0]?.value
        );
      }
    }
  }, [allFilters]);

  // useEffect(() => {
  //   if (!!layout?.hideAllSection) {
  //     setSelectedTabText(inputs_tabs?.[0]?.category?.values?.[0]?.label);
  //   }
  // }, [inputs_tabs]);

  // Functions
  const setFilters = (newFilters) => {
    if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
      setPaginatedItems([]);
    }
    setActualFilters(newFilters);
  };

  const handleResetPageLimit = () => {
    setLimit(Number(selectedPageSize));
    if (isMobileLayout && shouldLoadAllMobile) {
      setLimit(100);
    }
    setShouldHideLoadAllButton(false);
    setPage(1);
  };

  const setPageFromPagination = (index) => {
    setPage(index);
  };

  return (
    <GlobalSearchBoxComponentContext.Provider
      value={{
        ...props,
        dataCompleted,
        setDataCompleted,
        filters,
        setActualFilters,
        searchable,
        setSearchable,
        page,
        setPage,
        firstLoad,
        setFirstLoad,
        paginatedItems,
        setPaginatedItems,
        shouldHideLoadAllButton,
        setShouldHideLoadAllButton,
        setFilters,
        limit,
        setLimit,
        isGridView,
        setIsGridView,
        sorting,
        setSorting,
        selectedPageSize,
        handleResetPageLimit,
        getRef,
        setRef,
        keyword,
        setKeyword,
        toggleFilterMenu,
        setToggleFilterMenu,
        filterRef,
        expandedMobileMenu,
        setExpandedMobileMenu,
        forceHideFilters,
        setForceHideFilters,
        allFilters,
        setAllFilters,
        inputs_tabs,
        setInputs_tabs,
        selectedTabText,
        setSelectedTabText,
        rawData,
        setRawData,
        setPageFromPagination,
        totalCount,
        setTotalCount,
        hasNext,
        setHasNext,
        pageCount,
        setPageCount,
        dataToRender,
        setDataToRender,
        loadingData,
        paginationProps,
        isMobileLayout,
        loadAll,
        loadMore,
        selectedFilters,
        setSelectedFilters,
        handleChangeFilter,
        t,
        isSearchTermMoreThanThreeCharacters,
        setIsSearchTermMoreThanThreeCharacters,
      }}
    >
      {children}
    </GlobalSearchBoxComponentContext.Provider>
  );
}
