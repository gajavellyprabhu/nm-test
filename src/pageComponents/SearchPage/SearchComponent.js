import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
// import SitecoreIcon from 'components/Shared/components/SitecoreIcon';
import { Autocomplete, TextField, InputAdornment, debounce, IconButton } from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useLazyQuery } from '@apollo/client';
import { Placeholder, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useMediaQuery } from '@mui/material';
import ListingResult from './ListingResult';
import { useSearchPageContext } from './Context';
// import LoadingComponent from './LoadingComponent';
// import NoResultcomp from './NoResultcomp';
import dataQuery from './query.graphql';
import dataQuery2 from './results.graphql';
import TitleComponent from 'subComponents/TitleComponent';
import Button from 'subComponents/Button';
import GlobalStructure from 'subComponents/GlobalStructure';
import { useI18n } from 'next-localization';
import ImageRenderer from 'subComponents/ImageRenderer';
// import filtersQuery from './results.graphql';
import styles from './styles.module.scss';
import ButtonArrow from 'subComponents/ButtonArrow';
import NoResultcomp from './NoResultcomp';
import TextComponent from 'subComponents/TextComponent';

const initialSearchProps = {
  totalPages: 0,
  results: [],
  facets: [],
  pageInfo: '',
};

const SearchComponent = (props) => {
  const { fields, i18n, rendering } = props;
  const { page, setPage, listingFilters } = useSearchPageContext();
  const { t, locale } = useI18n();
  const { sitecoreContext } = useSitecoreContext();
  const { route } = sitecoreContext;
  const { fields: routeFields } = route;
  const { title: routetitle, titleTag } = routeFields;

  const {
    resultsCountText,
    resultsNotFoundText,
    resultsNotFoundTitle,
    pageSize,
    quicklinkTitle,
    quicklinks,
    headingTag,
    rootItem,
    sortOrder,
    fieldsEqual,
    facetOn,
    searchPlaceholder,
    suggestionPageSize,
    autosuggestCharLimit,
  } = fields;
  const PageSizeLimit = pageSize?.value ?? 10;

  const charactersSearchLimit = autosuggestCharLimit?.value ?? 5;

  const suggestionPageSizeLimit = suggestionPageSize?.value ?? 5;

  const isMobile = useMediaQuery('(max-width:769px)');

  const shouldRenderTitle = !!routetitle?.value;
  const shouldRenderQuicklinkTitle = !!quicklinkTitle?.value;
  const shouldRenderQuicklinks = !!quicklinks?.length;
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shouldShowListingResults, setShouldShowListingResults] = useState(false);
  const [isNewSearchFilter, setIsNewSearchFilter] = useState(false);
  const [isSearchTermPreDefined, setIsSearchTermPreDefined] = useState(false);
  const [noResultSearchTerm, setNoResultSearchTerm] = useState('');
  const [searchedSearchTerm, setSearchedSearchTerm] = useState('');
  const [fetchedSuggestedResult, setFetchedSuggestedResult] = useState(initialSearchProps);
  const [fetchedSuggestedResultInput, setFetchedSuggestedResultInput] =
    useState(initialSearchProps);

  const [shouldUpdateFacets, setShouldUpdateFacets] = useState(true);

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [fetchedSuggestedAutoCompleteSentence, setFetchedSuggestedAutoCompleteSentence] =
    useState('');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isSearchTermMoreThanThreeCharacters, setIsSearchTermMoreThanThreeCharacters] =
    useState(false);
  const filteredFilterTabsArray =
    fetchedSuggestedResult?.facets?.[0]?.values?.filter((item) => item?.count > 0) ?? [];
  filteredFilterTabsArray?.length > 1 &&
    filteredFilterTabsArray?.unshift({
      item: { title: { value: t('Text_All') } },
      count: fetchedSuggestedResult?.totalPages,
      isAll: true,
    });
  const [getSearchSuggestionsData] = useLazyQuery(
    dataQuery,
    {
      fetchPolicy: 'network-only',
      variables: {
        sortOrder: sortOrder?.fields?.facet?.fields?.field?.value,
        filterSource: JSON.parse(fieldsEqual?.fields?.value?.value),
        fieldsBoosting: JSON.parse(fieldsEqual?.fields?.fieldsBoosting?.value),
        facetOn: facetOn?.fields?.facet?.fields?.field?.value,
        rootItem: rootItem?.id,
        limit: suggestionPageSizeLimit,
        // offset: (Math.abs((isNewSearchFilter ? 1 : page) - 1) * suggestionPageSizeLimit).toString(),
        language: locale(),
      },
      onCompleted: (data) => {
        const { results, facets } = data?.search;
        const { totalCount, pageInfo } = results;
        if (!!results?.items?.length) {
          setFetchedSuggestedResultInput({
            totalPages: totalCount,
            results: results,
            facets: facets,
            pageInfo: pageInfo,
          });
          if (!!results?.items?.length && !isFirstLoad) {
            // fix later-on
            setIsPopUpOpen(true);
          } else {
            setNoResultSearchTerm(searchTerm);
            // setShouldShowListingResults(false);
          }
        } else {
          setFetchedSuggestedResultInput(initialSearchProps);
        }
        setIsLoading(false);
        setIsFirstLoad(false);
      },
    },
    []
  );
  const [getSearchSuggestedSearchInput, { previousData }] = useLazyQuery(
    dataQuery2,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        setFetchedSuggestedAutoCompleteSentence('');
        // const { total, results, facets, pageInfo } = data?.search;
        const { results, facets } = data?.search;
        const { totalCount, pageInfo } = results;
        if (!!!results?.items?.length) {
          setNoResultSearchTerm(searchTerm);
          setShouldShowListingResults(false);
          setIsLoading(false);
        }
        setFetchedSuggestedResult((preValue) => ({
          totalPages: !!listingFilters ? preValue?.totalPages : totalCount,
          results:
            // isMobile && previousData
            //   ? isNewSearchFilter
            //     ? results
            //     : preValue?.results?.concat(results)
            //   : results,
            results,
          // facets: !!listingFilters ? preValue?.facets : facets,
          facets: shouldUpdateFacets ? facets : preValue?.facets,
          pageInfo: pageInfo,
        }));
        if (!!results?.items?.length) {
          setShouldShowListingResults(true);
          setIsPopUpOpen(false);
        }
        setShouldUpdateFacets(false);
        setIsLoading(false);
      },
    },
    []
  );
  const [getSearchAutoCompleteData] = useLazyQuery(
    dataQuery,
    {
      fetchPolicy: 'network-only',
      variables: {
        sortOrder: sortOrder?.fields?.facet?.fields?.field?.value,
        filterSource: JSON.parse(fieldsEqual?.fields?.value?.value),
        fieldsBoosting: JSON.parse(fieldsEqual?.fields?.fieldsBoosting?.value),
        facetOn: facetOn?.fields?.facet?.fields?.field?.value,
        // limit: suggestionPageSizeLimit,
        limit: 10,
        rootItem: rootItem?.id,
        // offset: (Math.abs(page - 1) * selectedPageSize).toString(), // adding math.abs
        language: locale(),
      },
      onCompleted: (data) => {
        const { results, facets } = data?.search;
        const { totalCount, pageInfo } = results;
        if (!!results?.items?.length) {
          const targetedKeyword = results?.items?.find((item) => {
            const sentence = item?.item?.title?.value?.toLowerCase();
            // const sentence = 'new mura';

            const regex = new RegExp(`^${searchTerm?.toLowerCase()?.trim()}`);
            if (regex.test(sentence)) {
              // return { ...item, title: { value: 'new mura' } };
              return item;
            } else {
              return;
            }
          });
          // const targetedKeyword = { title: { value: 'new mura' } };
          isSearchTermMoreThanThreeCharacters &&
            setFetchedSuggestedAutoCompleteSentence({
              title: { value: targetedKeyword?.item?.title?.value?.toLowerCase() },
            });
          // setFetchedSuggestedAutoCompleteSentence(targetedKeyword?.title);
          // if (!!results?.items?.length && !shouldShowListingResults) {
          // }
        }
      },
    },
    []
  );
  useEffect(() => {
    let keyword = getParam();
    if (!!keyword) {
      setIsSearchTermPreDefined(true);
      setSearchTerm(keyword);
      setSearchedSearchTerm(keyword);
      if (keyword?.length > charactersSearchLimit) {
        setIsSearchTermMoreThanThreeCharacters(true);
      }
    }
  }, []);

  useEffect(() => {
    setFetchedSuggestedAutoCompleteSentence('');
    if (isSearchTermPreDefined) {
      handleFetchSuggestedSearchInputDebounced(searchTerm);
      return handleFetchSearchTermSuggestions();
    }
    if (searchTerm?.length > charactersSearchLimit) {
      handleFetchSuggestedSearchInputDebounced(searchTerm);
      setIsSearchTermMoreThanThreeCharacters(true);
    } else {
      setIsSearchTermMoreThanThreeCharacters(false);
      // setShouldShowListingResults(false);
      setIsPopUpOpen(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    shouldShowListingResults && handleFetchSearchTermSuggestions();
  }, [page]);
  useEffect(() => {
    if (typeof listingFilters === 'number') {
      setPage(1);
      handleFetchSearchTermSuggestions();
    }
  }, [listingFilters]);

  const getParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => {
        return searchParams.get(prop);
      },
    });
    return params.keyword;
  };

  const handleFetchSearchTermSuggestions = (searchParamTerm) => {
    // setIsLoading(true);
    setIsPopUpOpen(false);
    isNewSearchFilter && setPage(1);
    getSearchSuggestedSearchInput({
      variables: {
        keyword: searchParamTerm ?? searchedSearchTerm,
        rootItem: rootItem?.id,
        facetOn: facetOn?.fields?.facet?.fields?.field?.value,
        filterSource: [
          JSON.parse(fieldsEqual?.fields?.value?.value)?.[0],
          {
            name: 'tags',
            value: filteredFilterTabsArray?.[listingFilters]?.value ?? '',
          },
        ],
        fieldsBoosting: JSON.parse(fieldsEqual?.fields?.fieldsBoosting?.value),
        limit: PageSizeLimit,
        offset: (Math.abs((isNewSearchFilter ? 1 : page) - 1) * PageSizeLimit).toString(),
        language: locale(),
      },
    });
    setIsSearchTermPreDefined(false);
  };
  const handleFetchSearchTermSuggestionsDebounced = useCallback(
    debounce(handleFetchSearchTermSuggestions, 300),
    []
  );

  const handleFetchSuggestedSearchInput = (searchTermProp) => {
    setIsPopUpOpen(false);
    const debes = JSON.parse(fieldsEqual?.fields?.value?.value)?.map((item) => {
      // if (item?.name === sortOrderProp?.fields?.facet?.fields?.field?.value) {
      if (item?.name === 'title') {
        return { ...item, value: `contains:${searchTermProp}` };
      } else {
        return item;
      }
    });
    getSearchAutoCompleteData({
      variables: {
        // keyword: searchTerm,
        // rootItem: rootItem?.id,
        // language: locale(),
        filterSource: debes,
      },
    });
    getSearchSuggestionsData({
      variables: {
        keyword: searchTermProp,
      },
    });
  };
  const handleFetchSuggestedSearchInputDebounced = useCallback(
    debounce(handleFetchSuggestedSearchInput, 300),
    []
  );

  // const handleFilterOptions = (options) => {
  //   const optionsLength = options?.length;
  //   if (optionsLength > 5) {
  //     let output = options.slice(0, 6);
  //     output.push({
  //       isViewAll: true,
  //       number: optionsLength - 6,
  //     });
  //     return output;
  //   } else {
  //     return options;
  //   }
  // };
  // const handleFilterOptions = (options) => {
  //   const optionsLength = options?.length;
  //   if (optionsLength >= 1) {
  //     let output = options.slice(0, 3);
  //     output.push({ isViewAll: true, number: optionsLength - 3 });
  //     return output;
  //   } else {
  //     return options;
  //   }
  // };

  // const handleRenderInput = (params) => {
  //   return (
  //     <TextField
  //       {...params}
  //       placeholder={t('Text_SearchSNB')}
  //       variant="outlined"
  //       InputProps={{
  //         ...params?.InputProps,
  //         onKeyDown: (e) => {
  //           if (e.key === 'Enter') {
  //             e.stopPropagation();
  //             return handleFetchSearchTermSuggestions();
  //           }
  //         },
  //         startAdornment: (
  //           <>
  //             <InputAdornment position="start">
  //               <IconButton>
  //                 <ImageRenderer icon="ico_32_search_green" renderSVG className="search-icon" />
  //               </IconButton>
  //             </InputAdornment>
  //           </>
  //         ),
  //         endAdornment: (
  //           <>
  //             <InputAdornment position="end">
  //               <IconButton
  //                 onClick={() => setSearchTerm('')}
  //                 className={clsx(!isSearchTermMoreThanThreeCharacters && 'hidden')}
  //               >
  //                 {!isMobile ? (
  //                   <ImageRenderer icon="closeIcon" renderSVG className="clear-icon" />
  //                 ) : (
  //                   <ImageRenderer icon="Close-full-x" renderSVG className="search-icon" />
  //                 )}
  //               </IconButton>
  //               <Button
  //                 className={clsx(
  //                   'button-primary',
  //                   'search-button',
  //                   !isSearchTermMoreThanThreeCharacters && 'button-disabled'
  //                 )}
  //                 isButton
  //                 onClick={handleFetchSearchTermSuggestions}
  //                 text={t('label_search')}
  //               />
  //             </InputAdornment>
  //           </>
  //         ),
  //       }}
  //     />
  //   );
  // };
  // const handleRenderOption = ({ props, option, inputValue }) => {
  //   const { isViewAll, listingTitle, listingSummary, url } = option;
  //   const shouldRenderLink = !!url?.url;
  //   if (!!isViewAll) {
  //     return (
  //       <li {...props} className="view-all-container" onClick={handleFetchSearchTermSuggestions}>
  //         <Button className={clsx('button-hyperlink icon-arrow right')}>
  //           {t('Text_ViewAllResults')}
  //         </Button>
  //         <div className="results">
  //           {t('Text_Results')?.replace('{0}', fetchedSuggestedResult?.totalPages)}
  //         </div>
  //       </li>
  //     );
  //   }
  //   const shouldRenderListingTitle = !!listingTitle?.value;
  //   const shouldRenderListingSummary = !!listingSummary?.value;
  //   const matches = match(listingTitle?.value, inputValue, {
  //     insideWords: true,
  //   });
  //   const parts = parse(listingTitle?.value, matches);
  //   return (
  //     shouldRenderLink &&
  //     shouldRenderListingTitle && (
  //       <Fragment key={props?.key}>
  //         <div className="top-arrow" id={props?.key} />
  //         <li {...props} className="single-tab">
  //           <a className="result-container" href={url?.url}>
  //             <div>
  //               {parts.map((part, i) => {
  //                 const { text, highlight } = part;
  //                 return (
  //                   <span key={i} className={clsx('search-result-title', highlight && 'highlight')}>
  //                     {text}
  //                   </span>
  //                 );
  //               })}
  //             </div>
  //             {shouldRenderListingSummary && (
  //               <TitleComponent title={listingSummary} className="search-result-text" />
  //             )}
  //           </a>
  //         </li>
  //       </Fragment>
  //     )
  //   );
  // };
  const handlePaste = (event) => {
    event.preventDefault(); // Prevent the default paste behavior
  };

  const handleRenderInput = (params) => {
    return (
      <TextField
        {...params}
        placeholder={searchPlaceholder?.value}
        variant="outlined"
        onPaste={handlePaste} // Prevent pasting into the input field
        onClick={() => {
          if (
            searchTerm?.length > charactersSearchLimit &&
            !!fetchedSuggestedResultInput?.results?.items?.length
          ) {
            setIsPopUpOpen(true);
          }
        }}
        InputProps={{
          ...params?.InputProps,
          onKeyDown: (e) => {
            if (e.key === 'Enter') {
              e.stopPropagation();
              if (!isSearchTermMoreThanThreeCharacters) return;
              if (isSearchTermMoreThanThreeCharacters) {
                setSearchedSearchTerm(searchTerm);
                setPage(1);
                setShouldUpdateFacets(true);
                handleFetchSearchTermSuggestionsDebounced(searchTerm);
              }
            }

            const pattern = /^(?:[a-zA-Z0-9 \'ء-ي]+)?$/;
            const test = e.key?.match(pattern);
            if (!test) {
              e.preventDefault();
            }
          },
          startAdornment: (
            <InputAdornment position="start">
              <ImageRenderer
                icon="./images/iso_search_yellow.svg"
                renderSVG
                className={styles['search-icon']}
              />
              <TextComponent
                field={fetchedSuggestedAutoCompleteSentence?.title}
                className={styles['suggested-text']}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setSearchTerm('')}
                className={clsx(!isSearchTermMoreThanThreeCharacters && styles['hidden'])}
              >
                <ImageRenderer
                  icon="/images/ico_search_x.svg"
                  renderSVG
                  className={styles['clear-icon']}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  };

  const handleRenderOption = ({ props, option, inputValue }) => {
    const { isViewAll } = option;
    const { link } = fields;

    if (isViewAll) {
      return (
        link && (
          <li
            {...props}
            className={clsx(styles['view-all-container'], styles['search-part'])}
            onClick={() => {
              if (searchTerm?.length > charactersSearchLimit) {
                setSearchedSearchTerm(searchTerm);
                handleFetchSearchTermSuggestions(searchTerm);
              }
            }}
          >
            <ButtonArrow label={t('btn_find_out_more')} />
            <div className={styles['results']}>
              {fetchedSuggestedResultInput?.totalPages} {t('label_results')}
            </div>
          </li>
        )
      );
    }

    const { title, description, tags, url } = option?.item;
    const shouldRenderLink = !!url;
    const shouldRenderTitle = !!title?.value;

    if (shouldRenderLink && shouldRenderTitle) {
      const matches = match(title?.value, inputValue, { insideWords: true });
      const parts = parse(title?.value, matches);
      const shouldRenderTag = !!tags?.targetItems?.[0]?.title?.value;

      return (
        <li {...props} className={styles['single-tab']} key={props.id}>
          <a className={styles['result-container']} href={url} aria-label={title?.value}>
            <div>
              {parts?.map((part, i) => {
                const shouldRenderText = !!part?.text;
                return (
                  <span key={i}>
                    {shouldRenderText && (
                      <span
                        className={clsx(
                          styles['search-result-title'],
                          part?.highlight && styles['highlight']
                        )}
                      >
                        {part?.text}
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
            {shouldRenderTag && (
              <span className={styles['search-result-subtitle']}>
                {tags?.targetItems?.[0]?.title?.value}
              </span>
            )}
            <TitleComponent title={description} className={styles['search-result-text']} />
          </a>
        </li>
      );
    }

    return null;
  };

  const handleFilterOptions = (options) => {
    const optionsLength = options?.length;
    if (optionsLength >= 1) {
      let output = options.slice(0, 3);
      output.push({ isViewAll: true, number: optionsLength - 3 });
      return output;
    } else {
      return options;
    }
  };

  return (
    <>
      <GlobalStructure
        className={clsx(styles[`SearchComponent`], styles['GlobalSearchBox'])}
        props={props}
        componentName={`SearchComponent`}
        // isFullWidth
        isNoPadding
        anchorId={props?.rendering?.uid}
      >
        <div className={styles['search-parent-container']}>
          <div className={styles['background-black']} />
          {shouldRenderTitle && (
            <TitleComponent
              headingTag={titleTag}
              className={styles['search-title']}
              field={routetitle}
            />
          )}
          <div className="search-container component-costum-sub">
            <div className="search-container-sub">
              {/* <Autocomplete
                sx={{ width: '100%' }}
                freeSolo
                disablePortal
                open={isPopUpOpen}
                options={fetchedSuggestedResult?.results}
                getOptionLabel={(option) => option?.listingTitle?.value ?? ''}
                popupIcon={<></>}
                inputValue={searchTerm ?? ''}
                onClose={() => {
                  setIsPopUpOpen(false);
                }}
                filterOptions={(options) => handleFilterOptions(options)}
                onInputChange={(e) => {
                  setShouldShowListingResults(false);
                  setSearchTerm(e?.target?.value);
                }}
                renderInput={(params) => handleRenderInput(params)}
                renderOption={(props, option, { inputValue }) =>
                  handleRenderOption({ props, option, inputValue })
                }
              /> */}
              <div className={styles['search-parent-container-Two']}>
                <div className={styles['search-container']}>
                  <div className={styles['search-container-sub']}>
                    <Autocomplete
                      sx={{ width: '100%' }}
                      freeSolo
                      disablePortal
                      open={isPopUpOpen}
                      inputValue={searchTerm ?? ''}
                      onClose={() => setIsPopUpOpen(false)}
                      onOpen={() => {
                        if (
                          searchTerm?.length > charactersSearchLimit &&
                          !!fetchedSuggestedResultInput?.results?.items?.length
                        ) {
                          setIsPopUpOpen(true);
                        }
                      }}
                      options={fetchedSuggestedResultInput?.results?.items ?? []}
                      getOptionLabel={(option) => option?.title?.value ?? ''}
                      popupIcon={<></>}
                      filterOptions={(options) => handleFilterOptions(options)}
                      onInputChange={(e) => {
                        setSearchTerm(e?.target?.value);
                      }}
                      renderInput={(params) => handleRenderInput(params)}
                      renderOption={(props, option, { inputValue }) =>
                        handleRenderOption({ props, option, inputValue })
                      }
                    />
                    <Button
                      onClick={() => {
                        if (isSearchTermMoreThanThreeCharacters) {
                          setSearchedSearchTerm(searchTerm);
                          setPage(1);
                          setShouldUpdateFacets(true);
                          handleFetchSearchTermSuggestions(searchTerm);
                        }
                      }}
                      isButton={true}
                      text={t('label_search')}
                      className={clsx(
                        'search-button',
                        !isSearchTermMoreThanThreeCharacters && styles['button-disabled']
                      )}
                    ></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!shouldShowListingResults && !isPopUpOpen ? (
          <div className="quick-links-container  component-costum-sub">
            {shouldRenderQuicklinkTitle && (
              <TitleComponent className="quick-title" field={quicklinkTitle} />
            )}
            {shouldRenderQuicklinks &&
              quicklinks?.map((item, i) => {
                const { fields, url } = item;
                const { listingTitle } = fields;
                const shouldRenderLink = !!url;
                const shouldRenderTitle = !!listingTitle?.value;
                return (
                  shouldRenderLink &&
                  shouldRenderTitle && (
                    <a
                      className="quick-tab-container"
                      href={url}
                      key={i}
                      aria-label={listingTitle?.value}
                    >
                      <TitleComponent className="quick-tab-title" title={listingTitle} />
                      <ImageRenderer icon="ico_arrow_right" renderSVG className="quick-icon" />
                    </a>
                  )
                );
              })}
          </div>
        ) : !shouldShowListingResults ? (
          <div className="empty-space" />
        ) : (
          <></>
        )}
        {shouldShowListingResults && (
          <>
            <ListingResult
              {...{
                data: fetchedSuggestedResult,
                searchTerm: searchedSearchTerm,
                t,
                PageSizeLimit,
                isMobile,
                filteredFilterTabsArray,
                setIsNewSearchFilter,
                resultsCountText,
              }}
            />
          </>
        )}
      </GlobalStructure>

      {!shouldShowListingResults && !isLoading && !isFirstLoad && (
        <>
          <NoResultcomp
            {...{
              resultsNotFoundText,
              resultsNotFoundTitle,
              searchTerm: noResultSearchTerm,
            }}
          />
          <Placeholder name="Murabba-no-result" {...{ rendering }} />
        </>
      )}
      {/* {isLoading && <LoadingComponent />} */}
    </>
  );
};

export default SearchComponent;
