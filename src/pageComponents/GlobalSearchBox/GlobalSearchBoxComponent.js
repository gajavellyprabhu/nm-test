import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import GlobalStructure from 'subComponents/GlobalStructure';
import TitleComponent from 'subComponents/TitleComponent';
import Button from 'subComponents/Button';
import styles from './styles.module.scss';
import { Autocomplete, TextField, InputAdornment, IconButton, debounce } from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useGlobalContext } from 'globalContext/context';
import { useI18n } from 'next-localization';
// import { useGlobalSearchBoxComponentContext } from 'subComponents/Listing/context/GlobalSearchBoxComponentContext';
import ImageRenderer from 'subComponents/ImageRenderer';
import ButtonArrow from 'subComponents/ButtonArrow';
import { useLazyQuery } from '@apollo/client';
import dataQuery from './query.graphql';
import TextComponent from 'subComponents/TextComponent';

const GlobalSearchBoxComponent = (props) => {
  const { t, locale } = useI18n();
  const { fields, i18n, variation, params } = props;
  const { Styles } = params;
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const { setSearchOpen } = useGlobalContext();
  const {
    items,
    popularSearchText,
    searchPlaceholder,
    searchTitle,
    quicklinks,
    link,
    autosuggestCharLimit,
    pageSize,
  } = fields;
  const charactersSearchLimit = autosuggestCharLimit?.value ?? 5;
  const suggestionPageSizeLimit = pageSize?.value ?? 3;

  const shouldRenderQuicklinks = !!quicklinks?.length;
  const shouldRenderLink = !!link?.value?.href;
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchedSuggestedResult, setFetchedSuggestedResult] = useState({
    totalCount: 0,
    results: [],
  });
  const [fetchedSuggestedAutoCompleteSentence, setFetchedSuggestedAutoCompleteSentence] =
    useState('');
  const { disablePagination, rootItem, sortOrder, fieldsEqual, facetOn } = fields;

  const [isSearchTermMoreThanThreeCharacters, setIsSearchTermMoreThanThreeCharacters] =
    useState(false);

  // const debounce = (func, delay) => {
  //   let timeoutId;
  //   return function (...args) {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => {
  //       func.apply(this, args);
  //     }, delay);
  //   };
  // };
  const getParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => {
        return searchParams.get(prop);
      },
    });
    return params.keyword;
  };
  useEffect(() => {
    let keyword = getParam();
    if (!!keyword) {
      setSearchTerm(keyword);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array ensures that the effect runs only once

  // const { dataToRender, totalCount, setSearchable } = useGlobalSearchBoxComponentContext();
  const [getSearchSuggestionsData] = useLazyQuery(
    dataQuery,
    {
      fetchPolicy: 'network-only',
      variables: {
        sortOrder: sortOrder?.fields?.facet?.fields?.field?.value,
        filterSource: JSON.parse(fieldsEqual?.fields?.value?.value),
        fieldsBoosting: JSON.parse(fieldsEqual?.fields?.fieldsBoosting?.value),
        facetOn: facetOn?.fields?.facet?.fields?.field?.value,
        limit: suggestionPageSizeLimit,
        rootItem: rootItem?.id,
        // // offset: (Math.abs(page - 1) * selectedPageSize).toString(), // adding math.abs
        // language: locale(),
      },
      onCompleted: (data) => {
        const { results, facets } = data?.search;
        const { totalCount, pageInfo } = results;
        if (!!results?.items?.length) {
          setFetchedSuggestedResult({
            totalCount: totalCount,
            results: results?.items,
            facets: facets,
            pageInfo: pageInfo,
          });
          // if (!!results?.items?.length && !shouldShowListingResults) {
          setIsPopUpOpen(true);
          // }
        }
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

  // useEffect(() => {
  //   console.log('dataToRender', dataToRender);
  //   setIsPopUpOpen(false);
  //   setFetchedSuggestedResult({
  //     totalPages: totalCount,
  //     results: dataToRender,
  //   });
  //   setIsPopUpOpen(true);
  // }, [dataToRender]);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  useEffect(() => {
    setFetchedSuggestedAutoCompleteSentence('');
    if (searchTerm?.length > charactersSearchLimit) {
      handleFetchSuggestedSearchInputDebounced(searchTerm);
      setIsSearchTermMoreThanThreeCharacters(true);
    } else {
      setFetchedSuggestedAutoCompleteSentence('');
      setIsSearchTermMoreThanThreeCharacters(false);
      setIsPopUpOpen(false);
    }
  }, [searchTerm]);

  // useEffect(() => {
  //   console.log('fetchedSuggestedAutoCompleteSentence', fetchedSuggestedAutoCompleteSentence);
  // }, [fetchedSuggestedAutoCompleteSentence]);

  // const getNewSuggestions = () => {
  //   setFetchedSuggestedResult({
  //     totalPages: totalCount,
  //     results: dataToRender,
  //     keyword: searchTerm,
  //   });
  //   if (!!totalCount) {
  //     setIsPopUpOpen(true);
  //   }
  // };
  // const handleDebounceFetch = () => debounce(getSearchSuggestionsData(), 300);

  const handleFetchSuggestedSearchInput = (searchTermProp) => {
    setIsPopUpOpen(false);
    // debounce(setSearchable(searchTerm), getNewSuggestions(), 300);
    const debes = JSON.parse(fieldsEqual?.fields?.value?.value)?.map((item) => {
      // if (item?.name === sortOrder?.fields?.facet?.fields?.field?.value) {
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
        language: locale(),
        // offset: (Math.abs(page - 1) * selectedPageSize).toString(), // adding math.abs
        // sortOrder: sortOrder?.fields?.facet?.fields?.field?.value,
        // filterSource: JSON.parse(fieldsEqual?.fields?.value?.value),
        // facetOn: facetOn?.fields?.facet?.fields?.field?.value,
        // limit: suggestionPageSizeLimit,
        // rootItem: rootItem?.id,
      },
    });
    // variables: {
    //   sortOrder: sortOrder?.fields?.facet?.fields?.field?.value,
    //   filterSource: JSON.parse(fieldsEqual?.fields?.value?.value),
    //   facetOn: facetOn?.fields?.facet?.fields?.field?.value,
    //   limit: suggestionPageSizeLimit,
    //   rootItem: rootItem?.id,
    //   // // offset: (Math.abs(page - 1) * selectedPageSize).toString(), // adding math.abs
    //   // language: locale(),
    // },
    // handleDebounceFetch();
  };
  const handleFetchSuggestedSearchInputDebounced = useCallback(
    debounce(handleFetchSuggestedSearchInput, 300),
    []
  );

  useEffect(() => {
    if (shouldNavigate && shouldRenderLink) {
      window.location.href = link?.value?.href?.concat(`?keyword=${searchTerm ?? ''}`);
    }
  }, [shouldNavigate]);
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
          if (searchTerm?.length > charactersSearchLimit) {
            setIsPopUpOpen(true);
          }
        }}
        InputProps={{
          ...params?.InputProps,
          onKeyDown: (e) => {
            if (e.key === 'Enter') {
              e.stopPropagation();
              if (!isSearchTermMoreThanThreeCharacters) return;

              setShouldNavigate(true);
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
            onClick={() => setShouldNavigate(true)}
          >
            <ButtonArrow label={t('label_find_out_more')} />
            <div className={styles['results']}>
              {fetchedSuggestedResult?.totalCount} {t('label_results')}
            </div>
          </li>
        )
      );
    }

    const { title, description, tags, url } = option?.item;
    const shouldRenderLink = !!url;

    if (shouldRenderLink && !!title?.value) {
      const matches = match(title?.value, inputValue, { insideWords: true });
      const parts = parse(title?.value, matches);
      const shouldRenderTag = !!tags?.targetItems?.[0]?.title?.value;

      return (
        <li {...props} key={props.id} className={styles['single-tab']}>
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

  const closePopup = () => {
    setSearchOpen(false);
    // Restore the body's overflow when closing the popup
    document.body.style.overflow = 'visible';
    document.body.classList.remove('body-overflow-type');
  };

  let finalLink = {
    value: {
      ...link?.value,
      href: `${link?.value?.href}?keyword=${searchTerm}`,
      // querystring: `keyword=${searchTerm}`,
    },
  };

  const renderSearch = () => {
    return (
      <div className={styles['close-wrap']}>
        <span
          className={styles['close-btn-search']}
          onClick={() => closePopup()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              closePopup();
            }
          }}
          tabIndex={0}
        >
          <ImageRenderer icon="/images/close-button-dark.svg" renderSVGInImageTag />
        </span>

        <TitleComponent field={searchTitle} className={styles['title']} />
        <div className={styles['search-parent-container']}>
          <div className={styles['search-container']}>
            <div
              className={clsx(
                styles['search-container-sub'],
                searchTerm?.length > charactersSearchLimit && styles['disabled']
              )}
            >
              <Autocomplete
                sx={{ width: '100%' }}
                freeSolo
                disablePortal
                open={isPopUpOpen}
                onClose={() => setIsPopUpOpen(false)}
                onOpen={() => searchTerm?.length > charactersSearchLimit && setIsPopUpOpen(true)}
                inputValue={searchTerm ?? ''}
                options={fetchedSuggestedResult?.results}
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
              <span onClick={() => (isSearchTermMoreThanThreeCharacters && (document.body.style.overflow = 'visible'))}>
                <Button
                  // link={finalLink}
                  {...(isSearchTermMoreThanThreeCharacters && { link: finalLink })}
                  isButton={true}
                  text={t('label_search')}
                  className={clsx(
                    'search-button',
                    !isSearchTermMoreThanThreeCharacters && styles['button-disabled']
                  )}
                ></Button>
              </span>
            </div>
          </div>
        </div>
        {!isPopUpOpen && shouldRenderQuicklinks && (
          <div className={styles['quick-links-container']}>
            {quicklinks?.map((item, i) => {
              const { fields, url } = item;
              const { title } = fields;
              const shouldRenderLink = !!url;
              const shouldRenderTitle = !!title?.value;
              return (
                shouldRenderLink &&
                shouldRenderTitle && (
                  <a
                    className={styles['quick-tab-container']}
                    href={url}
                    key={i}
                    aria-label={title}
                  >
                    <TitleComponent className={styles['quick-tab-title']} title={title} />
                    <ImageRenderer icon="/images/cio_chevrons_right.svg" renderSVGInImageTag />
                  </a>
                )
              );
            })}
          </div>
        )}
        <TitleComponent field={popularSearchText} className={styles['sub-title']} />
        {!!items && (
          <ul className={clsx(styles['search-links-listing'])}>
            {items?.map((item, i) => {
              return (
                <li key={i}>
                  <span className={clsx('flex-it flex-align-item-center', styles['arrow-link'])}>
                    <ImageRenderer icon="/images/cio_chevrons_right.svg" renderSVGInImageTag />
                  </span>
                  <a
                    aria-label={item?.fields?.link?.value?.text}
                    className={clsx('flex-it flex-align-item-center')}
                    href={item?.fields?.link?.value?.href}
                  >
                    {item?.fields?.link?.value?.text}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };
  return variation === 'variation-search-page' ? (
    <div className={clsx(styles['GlobalSearchBox'], styles[variation])}>
      <div className="component-content">{renderSearch()}</div>
    </div>
  ) : (
    <GlobalStructure
      className={clsx(styles['GlobalSearchBox'], `full-width`, styles[variation])}
      props={props}
      componentName={`GlobalSearchBox`}
      i18n={i18n}
      defaultPaddingClass={'global-search-paddings'}
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      {renderSearch()}
    </GlobalStructure>
  );
};
export default GlobalSearchBoxComponent;
