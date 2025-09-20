import React, { useState, useRef, Fragment, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import ImageRenderer from 'subComponents/ImageRenderer';
import { useSearchPageContext } from '../Context';
import Pagination from '../Pagination';
import { InView } from 'react-intersection-observer';
import TitleComponent from 'subComponents/TitleComponent';
import styles from './styles.module.scss';
import TextComponent from 'subComponents/TextComponent';
import { useI18n } from 'next-localization';
import ButtonArrow from 'subComponents/ButtonArrow';
import GlobalStructure from 'subComponents/GlobalStructure';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material';
// import Sticky from 'react-sticky-el';
import { dateFormat } from 'src/Helpers/dateTimeHelper';
import { useGlobalContext } from 'globalContext/context';
import Sticky from 'react-stickynode';

const ListingResult = (props) => {
  const {
    data,
    searchTerm,
    isMobile,
    filteredFilterTabsArray,
    // setIsNewSearchFilter,
    PageSizeLimit,
    resultsCountText,
  } = props;
  const { t } = useI18n();
  const isBelowTablet = useMediaQuery('(min-width:1025px)');
  const { listingFilters, setListingFilters, setPage, page } = useSearchPageContext();
  const scrollToRef = useRef(null);
  const { locale } = useGlobalContext();
  const { results } = data;

  const mappedFilteredFilterTabsArray = filteredFilterTabsArray?.filter((item) => item?.count > 0);

  const shouldRenderFilterTabs = filteredFilterTabsArray?.length > 1;

  const pageCount = Math.ceil(
    filteredFilterTabsArray?.[!!listingFilters ? listingFilters : 0]?.count / PageSizeLimit
  );

  //   const { items: allFilters } = items;
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dropdownItem, setDropdownItem] = useState(!!listingFilters ? listingFilters : 0);

  const handleChange = (event) => {
    // const item = filteredFilterTabsArray?.find((item) => {
    //   item?.item?.title?.value === event.target.value;
    // });

    // setDropdownItem(item?.item?.title?.value);
    setDropdownItem(event.target.value);
  };
  // useEffect(() => {
  //   // make sure all filters is loaded so that the initial state of dropdown item will be set to a valid default value
  //   if (!!allFilters?.[0]?.items?.[0] && !isLoaded) {
  //     setDropdownItem(allFilters?.[0]?.items?.[0]);
  //     setIsLoaded(true);
  //   }
  // }, [allFilters]);

  const theme = createTheme({
    components: {
      MuiMenu: {
        styleOverrides: {
          // root: {
          //   maxWidth: 'calc(100% - 50px)!important',
          // },
          paper: {
            border: '1px solid #b28b31',
            borderRadius: '0px',
            maxWidth: 'calc(100% - 54px)!important',
            // left: 24,
          }, // list: {
          //  },
        },
      },
      Select: {
        styleOverrides: {
          rounded: { borderRadius: '0px' },
        },
      },
    },
  });

  // const [isSticky, setSticky] = useState(false);
  // const [scrollPosition, setScrollPosition] = useState(0);

  // const handleScroll = useCallback(
  //   (e) => {
  //     const scrollY = window.scrollY;
  //     const position = document
  //       ?.querySelector('#filter-tabs-container')
  //       ?.getBoundingClientRect()?.top;
  //     // Get the scroll position
  //     setScrollPosition(position);

  //     // Set isSticky based on the scroll position (adjust the value as needed)
  //     setSticky(scrollY > position);
  //   },
  //   [scrollPosition]
  // );
  // useEffect(() => {
  //   // Add scroll event listener
  //   window.addEventListener('scroll', handleScroll);

  //   // Remove event listener on component unmount
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  const firstIndexes = page * PageSizeLimit - PageSizeLimit + 1;
  const pageMaxSize =
    page * PageSizeLimit > data?.results?.totalCount
      ? data?.results?.totalCount
      : page * PageSizeLimit;
  // const firstIndexesValue = firstIndexes === 0 ? 1 : firstIndexes;

  return (
    <GlobalStructure className={styles['listing-search-component']} isFullWidth>
      <div
        className={clsx(
          styles['ListingResult'],
          styles['component-sub-content']
          // isSticky && styles['sticky-side']
        )}
        ref={scrollToRef}
      >
        <TextComponent
          field={{
            value: resultsCountText?.value
              ?.replace('{0}', `${firstIndexes}-${pageMaxSize}`)
              .replace('{2}', `${data?.results?.totalCount}`)
              .replace('{3}', `${searchTerm}`),
          }}
          className={styles['numbers-pagination']}
        />
        <div className={styles['parent-container']}>
          {/* <div className={clsx(styles['filter-tabs-container'], isSticky && styles['sticky'])}> */}
          {shouldRenderFilterTabs && (
            <>
              {!isMobile ? (
                <div
                  // id="filter-tabs-container"
                  className={clsx(styles['filter-tabs-container'])}
                >
                  <Sticky
                    top={isBelowTablet ? 180 : 140}
                    // stickyStyle={{ top: 180 }}
                    // boundaryElement=".debes"
                    bottomBoundary={'.hidden_target_sticky'}
                  >
                    <div className={clsx(styles['filter-tabs-container'])}>
                      {filteredFilterTabsArray?.map((item, i) => {
                        const { count, item: _item } = item;
                        const isSelectedTab = (!!listingFilters ? listingFilters : 0) === i;
                        return (
                          <div
                            tabIndex={0}
                            className={styles['tab-container']}
                            onClick={() => {
                              listingFilters !== i && setListingFilters(i);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.stopPropagation();
                                listingFilters !== i && setListingFilters(i);
                              }
                            }}
                            key={i}
                          >
                            <TextComponent
                              className={clsx(isSelectedTab && styles['active'], styles['tab'])}
                              key={i}
                              field={_item?.title}
                            />
                            <div
                              className={clsx(styles['number'], isSelectedTab && styles['active'])}
                            >
                              [{count}]
                            </div>
                            {isSelectedTab && <div className={styles['underline']} />}
                          </div>
                        );
                      })}
                    </div>
                  </Sticky>
                </div>
              ) : (
                <>
                  {shouldRenderFilterTabs && (
                    <Box className={styles['dropdown-box']}>
                      <FormControl fullWidth>
                        <ThemeProvider theme={theme}>
                          <Select
                            open={openDropdown}
                            className={clsx(styles['height-42'], styles[`dropdown-wrap`])}
                            value={dropdownItem}
                            onChange={(e) => handleChange(e)}
                            onClick={(e) => {
                              setOpenDropdown((prev) => !prev);
                            }}
                            SelectDisplayProps={{ className: styles['active'] }}
                            IconComponent={() => null}
                            displayEmpty
                          >
                            {shouldRenderFilterTabs &&
                              !!filteredFilterTabsArray &&
                              filteredFilterTabsArray?.length > 0 &&
                              filteredFilterTabsArray?.map((item, i) => {
                                const { count, item: _item } = item;
                                const isSelectedTab = (!!listingFilters ? listingFilters : 0) === i;
                                return (
                                  <MenuItem
                                    aria-labelledby={_item?.title}
                                    key={i}
                                    // value={_item?.title?.value}
                                    value={i}
                                    onClick={() => {
                                      listingFilters !== i && setListingFilters(i);
                                    }}
                                    className={styles['menu-item-tab']}
                                  >
                                    <div className={styles['tab-container-popover']}>
                                      <TextComponent
                                        aria-label={_item?.title}
                                        className={clsx(
                                          isSelectedTab && styles['active'],
                                          styles['tab']
                                        )}
                                        field={_item?.title}
                                      />
                                      <div
                                        className={clsx(
                                          styles['number'],
                                          isSelectedTab && styles['active']
                                        )}
                                      >
                                        [{count}]
                                      </div>
                                    </div>
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </ThemeProvider>
                        <div
                          onClick={() => setOpenDropdown((prev) => !prev)}
                          className={clsx(
                            !!openDropdown ? styles['dropdown-open'] : '',
                            styles['select-arrow-wrap']
                          )}
                        >
                          <div
                            className={clsx(
                              styles['select-arrow'],
                              'flex-it flex-justify-center flex-align-item-center'
                            )}
                          >
                            <ImageRenderer
                              width={12}
                              height={12}
                              renderSVG
                              icon={'/images/ico_chevron_down.svg'}
                            />
                          </div>
                        </div>
                      </FormControl>
                    </Box>
                  )}
                </>
              )}
            </>
          )}
          <div className={styles['tabs-container']}>
            {/* <div className={styles['result-title-container']}>
              <div className={styles['result-title']}>{searchTerm}</div>
              <div className={styles['result-number']}>
                {t('Text_Results').replace('{0}', totalPages)}
              </div>
            </div> */}
            {/* <div className={styles['dropdown-container']}>
              <Accordion
                className={clsx(styles['dropdown'])}
                expanded={isAccordionOpen}
                disableGutters
              >
                {accordionItems?.map((item, i) => {
                  const { count, item: _item } = item;
                  const isFirstIndex = i < 1;
                  const shouldRenderValueName = !!_item?.title?.value;
                  return (
                    shouldRenderValueName && (
                      <AccordionSummary
                        key={i}
                        className={clsx(
                          styles['record'],
                          isFirstIndex && styles['accordion-active'],
                          !isFirstIndex && styles['margin-top']
                        )}
                        expandIcon={
                          isFirstIndex && (
                            <ImageRenderer
                              icon="icon_chevron_down"
                              className={styles['select-icon']}
                            />
                          )
                        }
                        onClick={() => {
                          !isFirstIndex ? handleSortAccordionItems(i) : handleToggleAccordion();
                        }}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <p className={styles['text']}>{_item?.title?.value}</p>
                        <div className={clsx(styles['number'])}>({count})</div>
                      </AccordionSummary>
                    )
                  );
                })}
              </Accordion>
            </div> */}
            <div className={styles['cards-container']}>
              <InView threshold={1} triggerOnce>
                {({ ref }) => (
                  <>
                    {results?.items?.map((item, i) => {
                      const { bannerTitle, bannerShortDescription, url, tags, category, date } =
                        item?.item;

                      const targetedTag = tags?.targetItems?.[0]?.title;
                      const targetedCategory = category?.targetItem?.categoryName;

                      const shouldRenderListingSummary = !!bannerShortDescription?.value;
                      const shouldRenderListingTitle = !!bannerTitle?.value;
                      const shouldRenderListingTag = !!targetedTag?.value;
                      const shouldRenderCategory = !!targetedCategory?.value;
                      const shouldRenderLink = !!url;
                      const shouldRenderDate = !!date?.dateFormatted;
                      // const shouldRenderPageSection = !!pageSection;
                      const formattedDate = dateFormat(date?.dateFormatted, locale);
                      return (
                        shouldRenderLink && (
                          <a
                            className={styles['card-container']}
                            href={url}
                            key={i}
                            aria-label={bannerTitle?.value}
                          >
                            <div className={styles['card-sub-container']}>
                              <div className={styles['date-tag-container']}>
                                <div className={styles['date-container']}>
                                  {shouldRenderListingTag && (
                                    <TextComponent field={targetedTag} className={styles['tag']} />
                                  )}
                                  {shouldRenderDate && (
                                    <TextComponent
                                      field={{ value: formattedDate?.['d m y'] }}
                                      className={styles['date']}
                                    />
                                  )}
                                </div>
                                {shouldRenderListingTag && (
                                  <TextComponent
                                    field={targetedCategory}
                                    className={styles['category']}
                                  />
                                )}
                              </div>

                              <div className={styles['content-container']}>
                                {shouldRenderListingTitle && (
                                  <TitleComponent field={bannerTitle} className={styles['title']} />
                                )}
                                {shouldRenderListingSummary && (
                                  <TextComponent
                                    field={bannerShortDescription}
                                    className={clsx(styles[`text`])}
                                  />
                                )}
                              </div>
                              {/* <div className={styles['learn-more']}>
                              {t('btn_find_out_more')}
                              <ImageRenderer icon="images/ico_angle_right.svg" />
                            </div> */}
                              <ButtonArrow label={t('btn_find_out_more')} />
                            </div>
                          </a>
                        )
                      );
                    })}
                    <div className="hidden_target_sticky"></div>
                    <Pagination
                      {...{
                        t,
                        pageCount,
                        scrollToRef,
                      }}
                    />
                  </>
                )}
              </InView>
            </div>
          </div>
        </div>
      </div>
    </GlobalStructure>
  );
};

export default ListingResult;
