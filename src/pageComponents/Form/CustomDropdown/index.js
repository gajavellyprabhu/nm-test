import React, { useEffect, useRef, useState } from 'react';
// import "./index.scss";
import styles from './index.module.scss';
import clsx from 'clsx';
import {
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  FormControlLabel,
  Checkbox,
  Radio,
  FormControl,
  // OutlinedInput,
} from '@mui/material';
import ErrorComponent from '../ErrorComponent';
import HandlePreloadImages from 'subComponents/HandlePreloadImages';
import { useFormsContainerContext } from 'pageComponents/FormsContainer/FormsContainerContext';
import { useConditions } from '../FormFieldHook';
import ImageRenderer from 'subComponents/ImageRenderer';
import { useI18n } from 'next-localization';
import TextComponent from 'subComponents/TextComponent';

const CustomDropdown = (props) => {
  // console.log('CustomDropdown CustomDropdown', props);
  const { productName, setProductName } = useFormsContainerContext();
  const { t } = useI18n();
  const selectRef = useRef(null);
  const { field, onChange, errors, tracker, value, type } = props;
  const { model, valueField } = field;
  const {
    cssClass,
    // itemId,
    // maxLength,
    // minLength,
    // validationDataModels,
    // name,
    placeholder,
    title,
    // conditionSettings,
    items,
    subLabel,
    supportiveText,
    defaultValue,
  } = model;
  const [fieldIsDisabled, fieldShow, handleChangeCB, conditionSettings] = useConditions(props);
  const isDisabledFromCss = cssClass?.includes('disabled');
  // const isCheckboxDropdownVariation = !!cssClass && cssClass?.includes('checkbox-dropdown');
  // const isRadioDropdownVariation = !!cssClass && cssClass?.includes('radio-dropdown');
  // const isCountryDropdown = type === 'country';
  // isCountryDropdown && console.log('debes isCountryDropdown props', props);

  // const isDefaultDropdownVariation = !isCheckboxDropdownVariation && !isRadioDropdownVariation;
  const isError = !!errors?.length;
  const [selected, setSelected] = useState(false);
  // HandlePreloadImages({
  //   icons: [
  //     'ico_oneCheckbox_complete',
  //     'ico_oneCheckbox_empty',
  //     'ico_circle_complete',
  //     'ico_circle_empty',
  //   ],
  // });

  useEffect(() => {
    // !!value && handleChange(value);

    let selectedCountryCode;
    if (!!defaultValue) {
      selectedCountryCode = items?.find((item) => item.value === field?.model?.defaultValue);
      handleOnChange(field, selectedCountryCode?.value, onChange);
    }
  }, []);

  function handleBlur(field, value, errors, newValue, callback) {
    tracker.onBlurField(field, value, errors);
    let valid = true;
    const errorMessages = [];
    if (field.model.required && !newValue) {
      valid = false;
      errorMessages.push(`${field.model.title} is required`);
    }
    callback(field.valueField.name, [newValue], valid, errorMessages);
    setTimeout(() => {
      handleChangeCB(conditionSettings);
    }, [50]);
  }

  function handleOnChange(field, newValue, callback) {
    let valid = true;
    const errorMessages = [];
    if (field.model.required && !newValue) {
      valid = false;
      errorMessages.push(`${field.model.title} is required`);
    }
    const isProductName = field.model.cssClass.includes('product_name');

    if (isProductName && newValue !== productName) {
      setProductName(newValue);
    }

    callback(field.valueField.name, [newValue], valid, errorMessages);
    setTimeout(() => {
      handleChangeCB(conditionSettings);
    }, [50]);
  }
  return (
    <div>
      <FormControl fullWidth className={clsx(styles['CustomDropdown'], fieldShow)}>
        <InputLabel
          disabled={isDisabledFromCss || fieldIsDisabled}
          className={clsx(styles['label-font-size'])}
          id={valueField?.id}
          error={isError}
          shrink
        >
          {`${title}${model?.required ? ' *' : ''}`}
        </InputLabel>
        <Select
          disabled={isDisabledFromCss || fieldIsDisabled}
          fullWidth
          ref={selectRef}
          placeholder={placeholder}
          variant="outlined"
          open={selected}
          label={`${title}${model?.required ? ' *' : ''}`}
          renderValue={(valueTwo) => {
            const foundText = items?.find((item) => item?.value === valueTwo);
            return !!valueTwo ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {!!foundText?.icon && (
                  <div className={styles['country_flag_container']}>
                    <ImageRenderer
                      desktopSrc={{ value: { src: foundText?.icon, width: '24' } }}
                      width="24"
                      // className="dropdown-icon"
                      // renderSVGInImageTag
                      renderLegacyImage
                    />
                  </div>
                )}
                <TextComponent
                  field={{ value: foundText?.text }}
                  className={styles['text_country']}
                />
              </div>
            ) : (
              <>{placeholder}</>
            ); // fix later placeholderText
          }}
          displayEmpty
          error={isError}
          onOpen={() => setSelected(true)}
          onClose={() => setSelected(false)}
          MenuProps={{
            marginThreshold: null,
            disableScrollLock: true,
            slotProps: { paper: { sx: { width: selectRef?.current?.clientWidth } } },
            classes: {
              paper: styles['popover-dropdown'],
              root: styles['popover-root'],
            },
            MenuListProps: {
              'data-cy': 'ul-field-dropdown',
            },
          }}
          IconComponent={({ className }) => {
            return (
              <IconButton
                className={clsx(styles[className], styles['dropdown_arrow'])}
                onClick={() => setSelected(true)}
                disableFocusRipple
                disableRipple
                disableTouchRipple
              >
                <ImageRenderer
                  icon="/images/dropDown_arrow_down.svg"
                  className={clsx(styles['dropdown-icon'], selected && styles['open'])}
                  width="12"
                  height="12"
                />
              </IconButton>
            );
          }}
          notched
          inputProps={{
            id: field.valueField.id,
            className: !!!value?.[0] && styles['empty_placeholder'],
            'data-cy': `input-field-dropdown${model.required ? '-required' : ''}`,
          }}
          {...{
            id: valueField.id,
            className: clsx(
              cssClass,
              fieldShow,
              styles['label-font-size'],
              styles['input-min-height']
            ),
            name: field.valueField.name,
            value: value?.[0] ?? '',
            onChange: (e) => handleOnChange(field, e.target.value, onChange),
            onFocus: () => tracker.onFocusField(field, value),
            onBlur: (e) => handleBlur(field, value, errors, e.target.value, onChange),
          }}
          // MenuProps={{
          //   PopoverClasses: { root: 'custom-forms-popover' },
          // }}
        >
          {items?.map((item, i) => {
            const { itemId, text, value: itemValue, icon } = item;
            const isSelected = itemValue === value || itemValue === value?.[0];
            return (
              <MenuItem
                value={itemValue}
                key={i}
                disableGutters
                disableTouchRipple
                disableRipple
                className={styles['dropdown-menu-item']}
              >
                {/* {isCheckboxDropdownVariation && (
                  <FormControlLabel
                    checked={isSelected}
                    value={itemValue}
                    // id={valueField?.id}
                    className={clsx(isSelected && styles['active'])}
                    control={
                      <Checkbox
                        className={styles['checkbox-mui']}
                        checkedIcon={<ImageRenderer icon="ico_oneCheckbox_complete" />}
                        icon={<ImageRenderer icon="ico_oneCheckbox_empty" />}
                      />
                    }
                    label={text}
                  />
                )}
                {isRadioDropdownVariation && (
                  <FormControlLabel
                    checked={isSelected}
                    value={itemValue}
                    // id={valueField?.id}
                    className={clsx(isSelected && styles['active'])}
                    control={
                      <Radio
                        className={styles['checkbox-mui']}
                        checkedIcon={<ImageRenderer icon="ico_circle_complete" />}
                        icon={<ImageRenderer icon="ico_circle_empty" />}
                      />
                    }
                    label={text}
                  />
                )} */}
                <FormControlLabel
                  checked={isSelected}
                  value={itemValue}
                  // id={valueField?.id}
                  sx={{ maxWidth: selectRef?.current?.clientWidth }}
                  className={clsx(isSelected && styles['active'], styles['default-label'])}
                  control={
                    !!icon ? (
                      <div style={{ width: 32 }}>
                        <ImageRenderer
                          desktopSrc={{ value: { src: icon, width: '24' } }}
                          // className="dropdown-icon"
                          renderLegacyImage
                          width="24"
                        />
                      </div>
                    ) : (
                      <></>
                    )
                  }
                  label={text}
                />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {!!errors?.length ? (
        <ErrorComponent data-cy={'error-field-dropdown'} {...{ errors, subLabel }} />
      ) : (
        <TextComponent field={{ value: supportiveText }} className="form-supportive-text" />
      )}
    </div>
  );
};

export default CustomDropdown;
