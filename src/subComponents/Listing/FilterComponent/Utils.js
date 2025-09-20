import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { useListingComponentContext } from '../context/ListingComponentContext';
import { useQuery } from '@apollo/client';
import { useI18n } from 'next-localization';

const useCustomFunctions = () => {
  const { t } = useI18n();
  const {
    allFilters,
    selectedFilters,
    setSelectedFilters,
    setLimit,
    selectedPageSize,
    setPage,
    isSingleFilter,
    hideAllSection,
  } = useListingComponentContext();
  const handleChangeFilters = (target) => {
    const isFilterSelected = selectedFilters?.some((item) => item.value === target.value);

    const filterCategoryArray = allFilters?.map((item) => {
      const isTabFromThisSection = item.items?.some((item) => item.value === target.value);
      if (isTabFromThisSection) {
        return item.filterCategory;
      }
    });
    const filterCategory = filterCategoryArray.filter(Boolean).join(', ');
    if (!!isSingleFilter) {
      setLimit(Number(selectedPageSize)); // initial state
      setPage(1); // initial state
      return setSelectedFilters([{ ...target, filterCategory }]);
    }
    if (isFilterSelected) {
      const filterRemovedFromSelectedFilters = selectedFilters?.filter(
        (item) => item?.value !== target.value
      );
      return setSelectedFilters(filterRemovedFromSelectedFilters);
    }

    setSelectedFilters((preValues) => [...preValues, { ...target, filterCategory }]);
  };

  const getFiltersSelectOptions = (rawData, shouldAddAllText) => {
    let options = [];
    const label = '';
    rawData?.map((item, i) => {
      const { name, values } = item;
      const filterCategory = name;
      const filterType = '';
      // TODO double check with BE the actual types
      // const includeLabelinOptions = filterType === "Dropdown";
      let selectOptions = [];
      values?.map((_item, i) => {
        const { item, value } = _item;
        const categoryName = item?.categoryName;
        // const categoryName = null;
        // selectOptions = [...selectOptions, { value: isComputedField ? displayValue?.value : id, label: displayText?.value }]
        if (!!categoryName?.value) {
          selectOptions = [...selectOptions, { value: value, name: categoryName?.value }];
        }
      });
      return options.push({
        displayLabel: name,
        type: filterType,
        items: shouldAddAllText
          ? [{ name: t('Text_All'), value: `` }, ...selectOptions]
          : selectOptions,
        filterCategory,
      });
      // options.push(
      //   includeLabelinOptions
      //     ? {
      //         [filterCategory]: {
      //           values: [{ value: '', label: label }, ...selectOptions],
      //           type: filterType,
      //           displayLabel: label,
      //         },
      //       }
      //     : {
      //         [filterCategory]: {
      //           values: selectOptions,
      //           type: filterType,
      //           displayLabel: label,
      //         },
      //       }
      // );
    });
    return options;
  };

  const getSortingOptions = (rawData) => {
    //   const filterKey = "sorting";
    const rawSortingData = rawData?.sorting;
    const defaultLabel = rawSortingData?.title?.value;
    const children = rawSortingData?.children?.results;
    //   let selectOptions = [];
    let sortingOptions = [{ value: '', label: defaultLabel }];
    children?.map((singleSort, index) => {
      const { label, sortingField } = singleSort;
      // const filterKey = singleSort?.searchField?.value
      sortingOptions.push({
        // value: `${searchField?.value}:${isDesc?.value?.toString()}`,
        value: `${sortingField?.value}`,
        label: label?.value,
      });
      // singleSort?.datasource?.targetItem?.children?.map((child, index) => {
      //     const { label, searchField, isDesc } = child
      //     sortingOptions.push({ value: `${searchField?.value}:${isDesc?.value}`, label: label?.value })
      //     selectOptions = [...selectOptions, { value: `${searchField?.value}:${isDesc?.value}`, label: label?.value }]
      // })
      // return { value: '', label: label }, ...selectOptions] }
    });
    return sortingOptions;
  };

  const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const handleMultipleFilterChange = (
    filters,
    filterKey,
    setFilters,
    event,
    e,
    setPageFromPagination
  ) => {
    setPageFromPagination(1);
    const isFilterValueEmpty = isEmpty(event);
    const selector = `[data-group='${filterKey}']`;
    const value = e?.target?.value?.toLowerCase();

    document.querySelectorAll(selector).forEach((item) => {
      if (item?.value?.toLowerCase() === value) {
        if (item.checked) {
          return setFilters(
            multipleFilterHandler(filters, filterKey, event, isFilterValueEmpty, e)
          );
        } else {
          removeSingleValue(filters, filterKey, value, setFilters);
        }
      }
    });
  };

  const removeSingleFilter = (
    filters,
    filterName,
    filterValue,
    setFilters,
    setPageFromPagination
  ) => {
    setPageFromPagination(1);
    const selector = `[data-group='${filterName}']`;
    let newFilters = filters;
    const isComputedField = filterName.indexOf('computed') > -1;
    const currentFilterValue = filters?.filter((element) => element.value === filterValue);
    let filterAlreadyChecked =
      currentFilterValue?.filter(
        (element) => element?.label?.toLowerCase() === filterValue?.toLowerCase()
      ).length > 0 || false;
    document.querySelectorAll(selector).forEach((item) => {
      if (
        item?.checked &&
        ((isComputedField && item?.value?.toLowerCase() === filterValue?.toLowerCase()) ||
          (!isComputedField && item?.value?.toLowerCase() === filterValue?.toLowerCase()))
      ) {
        item.checked = false;
      }
    });
    removeSingleValue(filters, filterName, filterValue, setFilters);
  };

  const removeSingleValue = (filters, filterKey, value, setFilters) => {
    if (filters) {
      let newFilters = JSON.parse(JSON.stringify(filters))
        .map((filter) => {
          if (filter?.name === filterKey) {
            const modifiedFilter = filter;
            const currentValues = modifiedFilter?.value?.replace('in:', '')?.split(',');
            const newValues = currentValues
              ?.filter((singleValue) => {
                return singleValue === value ? false : true;
              })
              ?.join(',');
            if (newValues.length === 0) {
              return null;
            } else {
              // modifiedFilter.value = `in:${newValues}`
              modifiedFilter.value = newValues;
            }
            return modifiedFilter;
          } else {
            return filter;
          }
        })
        ?.filter((element) => {
          return element !== null;
        });
      newFilters = [...newFilters];
      setFilters(newFilters.length > 0 ? newFilters : null);
    } else {
      setFilters(null);
    }
  };

  const isFilterSelected = (filters, filterKey, options, currentvalue) => {
    const currentFilter = filters?.find((element) => element.name === filterKey);

    let isSelected = false;

    if (currentFilter && currentvalue) {
      if (currentvalue) {
        isSelected = currentFilter?.value?.toLowerCase().indexOf(currentvalue.toLowerCase()) > -1;
      }
    } else if (!currentFilter && !currentvalue) {
      isSelected = true;
    }

    return isSelected;
  };

  const multipleFilterHandler = (filters, filterKey, filterValue, clearFilter = false, e) => {
    const value = filterValue?.toLowerCase();
    let newFilters = [];
    if (filters) {
      const currentFilterValue = filters?.find((element) => element.name === filterKey);
      const otherFilters = filters?.filter((element) => element.name !== filterKey);
      // newFilters = [...otherFilters, {
      //     name: filterKey,
      //     value: `in:${[...(currentFilterValue?.value?.replace("in:", "")?.split(",") || []), value].join(",")}`
      // }]
      newFilters = [
        ...otherFilters,
        {
          name: filterKey,
          value: `${[
            ...(currentFilterValue?.value?.replace('in:', '')?.split(',') || []),
            value,
          ].join(',')}`,
          operator: 'IN',
        },
      ];
    } else {
      // newFilters = [{ name: filterKey, value: `in:${value}` }]
      newFilters = [{ name: filterKey, value: `${value}`, operator: 'IN' }];
    }

    if (clearFilter) {
      return newFilters.length > 0 ? [...newFilters] : null;
    }

    return newFilters;
  };

  const handleFilterChange = (filters, filterKey, setFilters, event) => {
    const isFilterValueEmpty = isEmpty(event);
    setFilters(filterHandler(filters, filterKey, event, isFilterValueEmpty));
    const elt = document.querySelector('.scroll-to-hidden-line');

    if (!!elt && !isInViewport(elt)) {
      elt?.scrollIntoView({
        block: 'start',
        inline: 'start',
        behavior: 'smooth',
      });
    }
  };

  const getFilterIndex = (filters, filterKey) => {
    let index = null;
    if (filters !== null) {
      for (let i = 0; i < filters.length; i++) {
        if (filters[i]?.name === filterKey) {
          index = i;
        }
      }
    }
    return index;
  };

  const getFilter = (filters, filterKey) => {
    let filter = null;
    if (filters !== null) {
      for (let i = 0; i < filters.length; i++) {
        if (filters[i]?.name === filterKey) {
          filter = filters[i];
        }
      }
    }
    return filter;
  };

  const handleAlphabetChange = (filters, filterKey, setFilters, event, e) => {
    const isFilterValueEmpty = isEmpty(event);
    const alphabetFilter = filters?.find((filter) => filter?.name === filterKey);
    if (alphabetFilter) {
      if (
        e.target.getAttribute('data-letter')?.toLowerCase() ===
        alphabetFilter?.value.split('*', 1)[0]
      ) {
        setFilters(
          filters?.length > 1 ? filters?.filter((element) => element?.name !== filterKey) : null
        );
      } else {
        setFilters(filterAlphabetHandler(filters, filterKey, event, isFilterValueEmpty, e));
      }
    } else {
      setFilters(filterAlphabetHandler(filters, filterKey, event, isFilterValueEmpty, e));
    }
  };

  const filterAlphabetHandler = (filters, filterKey, filterValue, clearFilter = false, e) => {
    const value = filterValue?.toLowerCase();

    let oldFilters = [];

    if (filters) {
      oldFilters = filters.filter((element) => element.name !== filterKey);
    }

    if (clearFilter) {
      return oldFilters.length > 0 ? [...oldFilters] : null;
    }

    return [
      ...oldFilters,
      {
        name: filterKey,
        value: value + '*',
      },
    ];
  };

  const filterHandler = (filters, filterKey, filterValue, clearFilter = false, e) => {
    const value = filterValue?.toLowerCase();

    let oldFilters = [];

    if (filters) {
      oldFilters = filters.filter((element) => element.name !== filterKey);
    }

    if (clearFilter) {
      return oldFilters.length > 0 ? [...oldFilters] : null;
    }

    return [
      ...oldFilters,
      {
        name: filterKey,
        value: value,
      },
    ];
  };

  const useFetchFilterData = (filtersQuery, language, filterSource, sortingSource) => {
    const {
      loading: loadingFilters,
      error: filterError,
      data: filtersData,
    } = useQuery(filtersQuery, {
      variables: {
        language: language,
        filtersRootItem: filterSource,
        sortingRootItem: sortingSource?.id,
      },
      onCompleted: (data) => {
        return data;
      },
    });
    return filtersData;
  };

  const getFilterLabel = (singleChosenValue, filterKey, selectOptions) => {
    if (!selectOptions && !singleChosenValue) {
      return <div>empty</div>;
    }
    let result = singleChosenValue;
    !!selectOptions &&
      selectOptions.forEach((element, index) => {
        Object.keys(element).forEach((elementFilterKey, index) => {
          const isCurrentFilter = elementFilterKey === filterKey;
          if (isCurrentFilter) {
            const selectData = element[elementFilterKey]?.values;
            const isComputedField = filterKey.indexOf('computed') > -1;
            const actualFilterValue = singleChosenValue?.toLowerCase();
            selectData?.forEach((element) => {
              if (element?.value?.toLowerCase() === actualFilterValue) {
                result = element?.label;
              }
            });
          }
        });
      });

    return result;
  };

  const resetCheckBoxes = (setFilters, filterName, setPageFromPagination) => {
    setFilters(null);
    const selector = `[type= checkbox]`;
    document.querySelectorAll(selector).forEach((item) => {
      item.checked = false;
    });
    setPageFromPagination(1);
  };

  const resetAllFilters = (
    setSearchable,
    keyword,
    setKeyword,
    setFilters,
    rawData,
    getRef,
    setRef,
    setPageFromPagination
  ) => {
    const elt = document.querySelector('.scroll-to-hidden-line');

    if (!!elt && !isInViewport(elt)) {
      elt?.scrollIntoView({
        block: 'start',
        inline: 'start',
        behavior: 'smooth',
      });
    }
    setKeyword('');
    setSearchable('');
    setFilters(null);
    setPageFromPagination(1);
  };
  return {
    handleChangeFilters,
    getFiltersSelectOptions,
    getSortingOptions,
    isInViewport,
    handleMultipleFilterChange,
    removeSingleFilter,
    removeSingleValue,
    isFilterSelected,
    multipleFilterHandler,
    handleFilterChange,
    getFilterIndex,
    getFilter,
    handleAlphabetChange,
    filterAlphabetHandler,
    filterHandler,
    useFetchFilterData,
    getFilterLabel,
    resetCheckBoxes,
    resetAllFilters,
  };
};
export default useCustomFunctions;
