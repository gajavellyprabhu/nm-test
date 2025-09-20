import React from 'react';
// import "./index.scss";
// import clsx from 'clsx';
// import { IconButton } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import ImageRenderer from 'subComponents/ImageRenderer';
// import ErrorComponent from '../ErrorComponent';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { useConditions } from '../FormFieldHook';
// import arLocale from 'date-fns/locale/ar-SA'; // Import Arabic locale
// import { withTranslation } from 'react-i18next';
// import { getLangDir } from 'helpers';

const CustomDatePicker = (props) => {
  // const { field, onChange, errors, tracker, isValid, value, pattern, i18n, t } = props;
  // const { model, valueField } = field;
  // const {
  //   cssClass,
  //   itemId,
  //   maxLength,
  //   minLength,
  //   validationDataModels,
  //   name,
  //   placeholderText,
  //   title,
  //   selected,
  //   subLabel,
  // } = model;
  // const isDisabledFromCss = cssClass?.includes('disabled');
  // const [isYearPopupOpen, setIsYearPopupOpen] = useState(false);
  // const [fieldIsDisabled, fieldShow, handleChangeCB, conditionSettings] = useConditions(props);
  // const isError = !!errors?.length;
  // const validate = (newValue) => {
  //   if (model?.required && !newValue) {
  //     return {
  //       valid: false,
  //       message: `${model?.title} ${t('IsRequired')}`,
  //     };
  //   }
  //   if (newValue) {
  //     if (isNaN(newValue)) {
  //       return {
  //         valid: false,
  //         message: `${t('InvalidDateFormat')}`,
  //       };
  //     }
  //     let valid = true;
  //     const transformed = stringToDate(dateToString(newValue));
  //     if (model?.min && transformed < stringToDate(model?.min)) {
  //       valid = false;
  //     }
  //     if (model?.max && transformed > stringToDate(model?.max)) {
  //       valid = false;
  //     }
  //     if (!valid) {
  //       return {
  //         valid: false,
  //         message: `${model?.title} ${t('IsOutOfRange')}`,
  //       };
  //     }
  //   }

  //   return {
  //     valid: true,
  //     message: null,
  //   };
  // };

  // const handleOnChange = (newValue) => {
  //   handleChangeCB(conditionSettings);
  //   const vR = validate(newValue);
  //   onChange(valueField?.name, dateToString(newValue), vR?.valid, vR?.valid ? [] : [vR?.message]);
  // };

  // const stringToDate = (input) => {
  //   if (!input) return null;
  //   if (input?.length > 10) {
  //     return new Date(input?.substring(0, 10));
  //   }
  //   return new Date(input);
  // };

  // function dateToString(date) {
  //   const newDate = new Date(date);
  //   if (!date) {
  //     return '';
  //   } else {
  //     return `${newDate?.getFullYear()}-${toTwo(newDate?.getMonth() + 1)}-${toTwo(
  //       newDate?.getDate()
  //     )}`;
  //     // return `${toTwo(newDate?.getDate())}-${toTwo(
  //     //   newDate?.getMonth() + 1
  //     // )}-${newDate?.getFullYear()}`;
  //   }
  // }

  // const toTwo = (input) => {
  //   if (input < 10) return `0${input}`;
  //   return `${input}`;
  // };

  // const useStyles = makeStyles(() => ({
  //   iconButton: {
  //     // Define your default styles for the icon button
  //     // For example, you can set the icon color and size
  //     color: 'black',
  //     fontSize: '24px',
  //     transition: 'color 0.3s',
  //     width: '24px',
  //     height: '24px',
  //     display: 'flex',
  //     alignItems: 'center',
  //     position: 'relative',
  //     '&:hover': {
  //       '& svg path': {
  //         fill: 'var(--primary3Color-fix)',
  //       },
  //       border: '1px solid var(--primary3Color-fix)',
  //       borderRadius: '5px',
  //     },
  //     '&:focus': {
  //       outline: 'none',
  //       border: 'none',
  //       borderRadius: '5px',
  //       background: 'var(--gradient1)',
  //       '& svg path': {
  //         fill: 'var(--primary4Color-fix) !important',
  //       },
  //     },
  //   },
  // }));
  // const classes = useStyles();
  // const dayOfWeekFormatter = (dayOfWeek, _long) => {
  //   return; // Format day of week as three-letter abbreviation
  // };

  // const handleRenderLeftArrowIcon = (props) => {
  //   return (
  //     <IconButton
  //       {...props}
  //       className={classes.iconButton}
  //       disableRipple
  //       disableTouchRipple
  //       disableFocusRipple
  //     >
  //       <ImageRenderer icon="calendar_arrow_left" renderSVG className="navigation-icon-days" />
  //     </IconButton>
  //   );
  // };
  // const handleRenderRightArrowIcon = (props) => (
  //   <IconButton
  //     {...props}
  //     className={classes.iconButton}
  //     disableRipple
  //     disableTouchRipple
  //     disableFocusRipple
  //   >
  //     <ImageRenderer icon="calendar_arrow_right" className="navigation-icon-days" renderSVG />
  //   </IconButton>
  // );
  // const handleRenderSwitchViewIcon = (props) => {
  //   return (
  //     <IconButton
  //       disableRipple
  //       disableTouchRipple
  //       disableFocusRipple
  //       {...props}
  //       className={clsx(classes.iconButton, props?.className, isYearPopupOpen && 'icon-dropdown')}
  //     >
  //       <ImageRenderer
  //         icon="calender_arrow_downsvg"
  //         renderSVG
  //         className={clsx('navigation-icon-picker')}
  //       />
  //     </IconButton>
  //   );
  // };
  // const handleRenderOpenPickerIcon = (props) => {
  //   return (
  //     <ImageRenderer
  //       {...props}
  //       icon="calendar_icon"
  //       renderSVG
  //       className={clsx('navigation-icon-days')}
  //     />
  //   );
  // };
  // const handleRenderOpenPickerButton = (props) => {
  //   return (
  //     <IconButton
  //       {...props}
  //       disableRipple
  //       disableTouchRipple
  //       disableFocusRipple
  //       className={clsx(props.className, 'calendar-icon')}
  //     >
  //       {props.children}
  //     </IconButton>
  //   );
  // };
  return (
    // <div className="CustomDatePicker">
    //   <LocalizationProvider
    //     dateAdapter={AdapterDateFns}
    //     {...(getLangDir(i18n.language) === 'rtl' && {
    //       adapterLocale: arLocale,
    //     })}
    //   >
    //     <DatePicker
    //       placeholder={placeholderText}
    //       disabled={isDisabledFromCss || fieldIsDisabled}
    //       onViewChange={(value) => {
    //         setIsYearPopupOpen(value === 'year');
    //       }}
    //       error={isError}
    //       slotProps={{
    //         textField: {
    //           variant: 'standard',
    //           fullWidth: true,
    //           InputLabelProps: { className: 'green-label-body2' },
    //           error: isError,
    //         },
    //         popper: { className: 'popper-calendar', placement: 'bottom-end' },
    //         day: { className: 'custom-day' },
    //         switchViewButton: {
    //           className: 'navigator-icon-wrapper',
    //           disableRipple: true,
    //           disableTouchRipple: true,
    //         },
    //         nextIconButton: { className: 'navigator-icon-wrapper' },
    //         previousIconButton: { className: 'navigator-icon-wrapper' },
    //       }}
    //       showDaysOutsideCurrentMonth
    //       dayOfWeekFormatter={dayOfWeekFormatter}
    //       slots={{
    //         leftArrowIcon: handleRenderLeftArrowIcon,
    //         rightArrowIcon: handleRenderRightArrowIcon,
    //         switchViewIcon: handleRenderSwitchViewIcon,
    //         openPickerIcon: handleRenderOpenPickerIcon,
    //         openPickerButton: handleRenderOpenPickerButton,
    //       }}
    //       yearsPerRow={3}
    //       {...{
    //         id: valueField.id,
    //         name: valueField.name,
    //         value: stringToDate(value),
    //         onChange: (e) => handleOnChange(e),
    //         onFocus: () => tracker.onFocusField(field, value),
    //         onBlur: () => tracker.onBlurField(field, value, errors),
    //       }}
    //       minDate={stringToDate(model?.min)}
    //       maxDate={stringToDate(model?.max)}
    //       className={clsx(cssClass, 'green-parent-body2', fieldShow)}
    //       label={title}
    //       disableHighlightToday
    //     />
    //   </LocalizationProvider>
    //   <ErrorComponent {...{ errors, subLabel }} />
    // </div>
    <></>
  );
};

export default CustomDatePicker;
