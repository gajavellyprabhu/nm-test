// noinspection JSValidateTypes

import React from 'react';
// import "./style.scss";
import { Autocomplete, Box, InputAdornment, Icon, TextField } from '@mui/material';
import ImageRenderer from 'subComponents/ImageRenderer';
import style from '../index.module.scss';

const CountryCodeSelector = (props) => {
  const {
    // defaultCountry,
    code,
    setCode,
    countries,
    // setCountries,
    // t,
    isPopupOpen,
    setIsPopupOpen,
    inputRef,
  } = props;
  const handleRenderOptions = (props, option, index, index2) => {
    return (
      <Box
        component="li"
        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
        {...props}
        id={option.countryCode}
        // key={props?.['data-option-index'] ?? props?.key}
        value={option.countryCode}
        key={index?.index}
      >
        <span
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            width: 100,
            alignItems: 'center',
          }}
        >
          <img
            loading="lazy"
            width="24"
            src={option.flag}
            srcSet={option.flag}
            alt={option.countryName}
            style={{
              marginRight: 8,
            }}
          />
          +{option.countryCode}
        </span>
        {option.countryName}
      </Box>
    );
  };
  const handleFilterOptions = (options, params) => {
    const answer = options.filter((item) => {
      const { countryName, countryCode } = item;
      const toLowerInputValue = params?.inputValue?.toLowerCase();
      const toLowerCountryName = countryName?.toLowerCase();
      const toLowerCountryCode = countryCode?.toLowerCase();
      if (
        toLowerCountryName.includes(toLowerInputValue) ||
        toLowerCountryCode.includes(toLowerInputValue)
      ) {
        return item;
      } else {
        return false;
      }
    });
    return answer;
  };
  const handleRenderInput = (params) => {
    // console.log('params', params);
    const currentCountryImage = countries.find((item) => {
      const { countryCode } = item;
      return countryCode === params?.inputProps?.value;
    });
    // console.log('noha currentCountryImage', currentCountryImage);
    return (
      <TextField
        {...params}
        variant="outlined"
        label=""
        className={style['phone_list']}
        inputProps={{
          ...params.inputProps,
          autoComplete: 'new-password',
          'data-cy': 'input-field-select-country-code',
        }}
        InputProps={{
          ...params.InputProps,
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{ display: 'flex', height: '56px', maxHeight: '100%' }}
            >
              <img
                loading="lazy"
                width="24"
                src={currentCountryImage?.flag}
                srcSet={currentCountryImage?.flag}
                alt="icon plus"
              />
              <span className={style['plus_icon']}>+</span>
            </InputAdornment>
          ),
        }}
      />
    );
  };
  return (
    <div className={style['CountryCodeSelector']}>
      <Autocomplete
        id="country-select-demo"
        sx={{ width: 110 }}
        options={countries}
        autoHighlight
        className="CustomDropdown"
        disableClearable
        disabledItemsFocusable
        open={isPopupOpen}
        // open
        onOpen={() => setIsPopupOpen(true)}
        onClose={() => setIsPopupOpen(false)}
        onChange={(_, selectedOption) => {
          return setCode(selectedOption.countryCode);
        }}
        // onKeyDown={(e) => {
        //   console.log('tocheck2 e.target', e.target.id);
        //   return setCode(e.target?.value);
        // }}
        // onKey
        value={code}
        // disablePortal
        // componentsProps={{ popper: { anchorEl: inputRef?.current } }}
        getOptionLabel={(option) => option.countryCode}
        // MenuProps={{
        //   PopoverClasses: { root: style['custom-forms-popover'] },
        // }}
        ListboxProps= {{
          'data-cy': 'ul-field-country-code'
        }}
        slotProps={{
          popper: {
            className: style['custom-forms-popover'],
            ...(!!inputRef?.current && { style: { width: inputRef?.current?.clientWidth } }),
            ...(!!inputRef?.current && { anchorEl: inputRef?.current }),
            // anchorEl: inputRef?.current,
            // placement: 'auto',
            // translate: 'no',

            // translate: 'unset !important',
          },
        }}
        popupIcon={
          <Icon className={style['drop-down-icon-auto']}>
            <ImageRenderer icon="/images/Chevrons_down.svg" width="12" className="dropdown-icon" />
          </Icon>
        }
        filterOptions={handleFilterOptions}
        renderOption={handleRenderOptions}
        renderInput={handleRenderInput}
      />
    </div>
  );
};

export default CountryCodeSelector;
