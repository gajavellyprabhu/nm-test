import styles from './styles.module.scss';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material';
import { useListingComponentContext } from 'subComponents/Listing/context/ListingComponentContext';
import ImageRenderer from 'subComponents/ImageRenderer';
import TextComponent from 'subComponents/TextComponent';

// Made for filters components or tabs Components.
// For filters the data come from the graphql and we pass it as 'allFilters' prop. The 'handleChangeFilter' prop handles the change in filter.
// For tabs component the data comes from a data source and we pass it as 'items' props. The 'handleTabChange' prop handles the tab change

const BasicSelect = (props) => {
  const { items, handleTabChange, shouldOnClearCapture, facetOnTag } = props;
  const { allFilters, handleChangeFilter } = useListingComponentContext();
  const isFiltersSource = !!allFilters && allFilters?.length > 0;
  const shouldRenderItems = !!items && items?.length > 0;

  const [openDropdown, setOpenDropdown] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const initialItem = isFiltersSource ? allFilters?.[0]?.items?.[0] : items?.[0];
  const [dropdownItem, setDropdownItem] = useState(initialItem);

  const handleChange = (event) => {
    const item = isFiltersSource
      ? allFilters?.[0]?.items?.find((item) => item?.value === event?.target?.value)
      : items?.find((item) => item?.fields?.title?.value === event?.target?.value);
    setDropdownItem(item);
  };

  useEffect(() => {
    // make sure all filters is loaded so that the initial state of dropdown item will be set to a valid default value
    if (isFiltersSource && !!allFilters?.[0]?.items?.[0] && !isLoaded) {
      setDropdownItem(allFilters?.[0]?.items?.[0]);
      setIsLoaded(true);
    }

    if (shouldRenderItems && !!items?.[0] && !isLoaded) {
      setDropdownItem(items?.[0]);
      setIsLoaded(true);
    }
  }, [allFilters]);

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
  return (
    dropdownItem && (
      <Box className={styles['dropdown-box']}>
        <FormControl fullWidth>
          <ThemeProvider theme={theme}>
            <Select
              SelectDisplayProps={{
                'aria-label': isFiltersSource
                  ? dropdownItem?.name
                  : dropdownItem?.fields?.title?.value,
              }}
              aria-labelledby={
                isFiltersSource ? dropdownItem?.name : dropdownItem?.fields?.title?.value
              }
              aria-label={isFiltersSource ? dropdownItem?.name : dropdownItem?.fields?.title?.value}
              open={openDropdown}
              className={clsx(styles['height-42'], styles[`dropdown-wrap`])}
              value={isFiltersSource ? dropdownItem?.value : dropdownItem?.fields?.title?.value}
              onChange={(e) => handleChange(e)}
              onClick={(e) => {
                setOpenDropdown((prev) => !prev);
              }}
              IconComponent={() => null}
              displayEmpty
            >
              {isFiltersSource
                ? allFilters?.map((item, i) => {
                    const { items, filterCategory } = item;
                    return items?.map((_item, _i) => {
                      const { name, value } = _item;
                      return (
                        <MenuItem
                          aria-label={name || value}
                          className="pop-over-styles"
                          value={value}
                          name={name}
                          key={_i}
                          onClick={() => {
                            handleChangeFilter({ filterCategory, value });
                            //   setActiveTab(_i);
                            setDropdownItem(_item);
                          }}
                          {...(!!shouldOnClearCapture && {
                            onClickCapture: () => {
                              handleChangeFilter({ filterCategory, value });
                              //   setActiveTab(_i);
                              setDropdownItem(_item);
                            },
                          })}
                        >
                          {name || value}
                        </MenuItem>
                      );
                    });
                  })
                : items?.map((_item, _i) => {
                    const { title } = _item?.fields;
                    return (
                      <MenuItem
                        aria-label={title?.value}
                        className="pop-over-styles"
                        value={title?.value}
                        name={title?.value}
                        key={_i}
                        onClick={() => {
                          setDropdownItem(_item);
                          handleTabChange(_i);
                        }}
                        {...(!!shouldOnClearCapture && {
                          onClickCapture: () => {
                            setDropdownItem(_item);
                            handleTabChange(_i);
                          },
                        })}
                      >
                        {title?.value}
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
    )
  );
};
export default BasicSelect;
