import React, { useRef, useEffect, useState } from 'react';
// import "./index.scss";
import clsx from 'clsx';
import { TextField, InputAdornment, Autocomplete, LinearProgress } from '@mui/material';
import ImageRenderer from 'subComponents/ImageRenderer';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import { ValidationDataModels } from '@sitecore-jss/sitecore-jss-react-forms';
import ErrorComponent from '../ErrorComponent';
import { useFormsContainerContext } from 'pageComponents/FormsContainer/FormsContainerContext';
import { useConditions } from '../FormFieldHook';
import styles from './styles.module.scss';
import TextComponent from 'subComponents/TextComponent';
import { useI18n } from 'next-localization';

const SIZE_UNITS = {
  1: 'Bytes',
  1024: 'KB',
  1048576: 'MB',
  1073741824: 'GB',
};
const getFileType = (file) => file.name.split('.').pop() || '';

const CustomFileUpload = (props) => {
  // console.log('CustomFileUpload props', props);
  const { t } = useI18n();
  const { field, onChange, errors, tracker, value } = props;
  const { model, valueField } = field;
  const {
    cssClass,
    // itemId,
    // maxLength,
    // minLength,
    validationDataModels,
    // name,
    title,
    // conditionSettings,
    // selected,
    // fileSizeUnit,
    // maxFileSize,
    // maxFileCount,
    allowedContentTypes,
    // subLabel,
    isMultiple,
    placeholder,
    supportiveText,
  } = model;
  const isDisabledFromCss = cssClass?.includes('disabled');
  const prevValue = useRef(value);
  const isError = !!errors?.length;
  // const { fileUploadsDataOnMultiPagesForms, setFileUploadsDataOnMultiPagesForms } =
  //   useFormsContainerContext();
  const [progress, setProgress] = useState(0);
  const getValidationModel = (validationId) => {
    return validationDataModels?.find((item) => item.itemId === validationId);
  };
  const [fieldIsDisabled, fieldShow, handleChangeCB] = useConditions(props);
  const fileSizeValidator = getValidationModel(ValidationDataModels.FileSizeValidator);
  const fileTypeValidator = getValidationModel(ValidationDataModels.FileTypeValidator);
  const fileCountValidator = getValidationModel(ValidationDataModels.FileCountValidator);

  // useEffect(() => {
  //   // tracker.onFocusField(field, value);
  //   // tracker.onBlurField(field, value, errors);
  //   onChange(valueField?.name, [], errors?.length > 0, errors);
  // }, []);

  useEffect(() => {
    if (prevValue.current && !value && inputRef?.current) {
      inputRef.current.value = '';
    }
  }, [value]);

  const handleDelete = (index) => {
    const newValue = value.filter((_, i) => i !== index);
    // setFileUploadsDataOnMultiPagesForms((prev) => ({
    //   ...prev,
    //   [valueField?.name]: { value: newValue },
    // }));
    onChange(valueField.name, newValue, true, []);
  };

  // const inputContextValue = fileUploadsDataOnMultiPagesForms?.[valueField?.name]?.value;
  // const actualValue = !!inputContextValue ? inputContextValue : value;
  // const actualValue = !!value?.length
  //   ? value?.map((item) => ({ name: item.name }))
  //   : "";
  const actualValue = value;
  // useEffect(() => {
  //   if (!!inputContextValue?.length) {
  //     setTimeout(() => {
  //       onChange(valueField?.name, inputContextValue, errors?.length > 0, errors);
  //     }, 500);
  //   }
  // }, [fileUploadsDataOnMultiPagesForms]);

  const inputRef = useRef(null);
  const handleChange = (rawFiles) => {
    const errors = [];
    const filesMapped = [...Array(rawFiles.length)]?.map((_, i) => rawFiles[i]);
    const files = isMultiple ? [...value, ...filesMapped] : filesMapped;
    if (files?.length === 0 && model?.required) {
      errors.push(`${field.model?.title} is required`);
    }
    // validating by size and type if needed

    if (fileCountValidator && files?.length > model?.maxFileCount) {
      errors.push(
        fileCountValidator.message
          .replace('{0}', model?.maxFileCount.toString())
          .replace('{1}', model?.title)
      );
    }
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        // Use event.target.result to access the file content
      };

      // Update progress bar while reading the file
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          if (percentComplete === 100) return setProgress(0);
          setProgress(percentComplete);
        }
      };
      reader.readAsDataURL(file);

      ///

      const size = file?.size / model?.fileSizeUnit;
      const type = getFileType(file);
      if (fileSizeValidator && size > model?.maxFileSize) {
        errors.push(
          fileSizeValidator.message
            .replace('{0}', model?.maxFileSize.toString())
            .replace('{1}', SIZE_UNITS[model?.fileSizeUnit])
        );
      }
      if (
        fileTypeValidator &&
        !!model?.allowedContentTypes &&
        model?.allowedContentTypes.indexOf(type) < 0
      ) {
        errors.push(
          fileTypeValidator.message.replace('{0}', model?.allowedContentTypes.split(',').join(', '))
        );
      }
    });
    // validating count of files
    // setFileUploadsDataOnMultiPagesForms((prev) => ({
    //   ...prev,
    //   [valueField?.name]: { value: files },
    // }));

    onChange(valueField?.name, errors?.length ? value : files, errors?.length > 0, errors);
  };
  // const handleRenderInput = (params) => {
  //   return (
  //     <TextField
  //       {...params}
  //       label={title}
  //       disabled={isDisabledFromCss || fieldIsDisabled}
  //       error={isError}
  //       InputLabelProps={{ className: 'green-label-body2' }}
  //       // placeholder={t("Text_SearchSNB")}
  //       variant="outlined"
  //       sx={{
  //         ':before': { borderBottom: '1px solid #84bd00' },
  //         // underline when selected
  //         ':after': { borderBottom: '1px solid #84bd00' },
  //         // ":hover": {
  //         //   borderBottom: "2px solid #84bd00",
  //         // },
  //         ':hover:not(.Mui-disabled):before': {
  //           borderBottom: '2px solid #84bd00',
  //         },
  //       }}
  //       type={!!actualValue?.length ? 'file' : 'text'}
  //       InputProps={{
  //         ...params.InputProps,
  //         endAdornment: (
  //           <InputAdornment position="end">
  //             <IconButton
  //               color="primary"
  //               aria-label="upload picture"
  //               component="label"
  //               onClick={() => inputRef?.current?.click()}
  //             >
  //               {/* <ImageRenderer icon="attach" /> */}U
  //             </IconButton>
  //           </InputAdornment>
  //         ),
  //       }}
  //     />
  //   );
  // };
  // const renderTags = (value, getTagProps) => {
  //   const valuesToMap = Array.isArray(value) ? value : Object.values(value);
  //   return valuesToMap?.map((option, index) => (
  //     <Chip
  //       key={index}
  //       label={option.name}
  //       {...getTagProps({ index })}
  //       className="chip-container"
  //       onDelete={() => handleDelete(index)}
  //       deleteIcon={
  //         // <IconButton>
  //         // <ImageRenderer icon="Close-full-x" renderSVG className="close-icon" />
  //         'X'
  //         // </IconButton>
  //       }
  //     />
  //   ));
  // };

  const handleDragEnter = (e) => {
    e.preventDefault();
    // setDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    // setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    // setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    // setDragging(false);
    // console.log('e.dataTransfer.files', e.dataTransfer.files);
    return handleChange(e.dataTransfer.files);
    // const files = Array.from(e.dataTransfer.files);
    // // Handle dropped files
    // console.log('Dropped files:', files);
    // console.log('handleDrop');
  };
  return (
    <div className={styles['fileUploader']}>
      <input
        type="file"
        multiple={isMultiple}
        autoComplete="off"
        ref={(el) => (inputRef.current = el)}
        // className="form-element-fu-input"
        hidden
        id={valueField.id}
        name={valueField.name}
        accept={fileTypeValidator ? allowedContentTypes : undefined}
        onChange={(e) => handleChange(e.target.files)}
        value={''}
      />
      {/* <Autocomplete
        // name={valueField?.name}
        options={[]}
        disableCloseOnSelect
        autoComplete={false}
        placeholder={placeholderText}
        freeSolo
        // filterOptions={(option) => option}
        getOptionLabel={(lbl) => {
          return lbl?.name;
        }}
        className={clsx(styles['CustomFileUpload'], cssClass, 'green-parent-body2', fieldShow)}
        fullWidth
        readOnly
        multiple
        value={(!!actualValue && actualValue) || []}
        renderTags={renderTags}
        renderInput={handleRenderInput}
        onFocus={() => tracker.onFocusField(field, value)}
        onBlur={() => tracker.onBlurField(field, value, errors)}
      /> */}

      <div>
        <TextComponent
          field={{ value: model?.required ? title + ' *' : title }}
          className={clsx(styles['title'], !!errors?.length && styles['error'])}
        />
        <div
          className={clsx(styles['upload-wrapper'], isError && styles['error'])}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onFocus={() => tracker.onFocusField(field, value)}
          onBlur={() => tracker.onBlurField(field, value, errors)}
          onClick={() => inputRef?.current?.click()}
        >
          <div className={styles['content-wrapper']}>
            {!!errors?.length ? (
              <>
                <ImageRenderer
                  icon="/images/upload_fail.svg"
                  width="40"
                  className="dropdown-icon"
                  // renderSVGInImageTag
                />
                <TextComponent field={{ value: errors?.[0] }} className={styles['error_text']} />
              </>
            ) : (
              <>
                {!!!progress ? (
                  <>
                    <ImageRenderer
                      icon="/images/upload_svg.svg"
                      width="40"
                      className={clsx('dropdown-icon', styles['upload_icon'])}
                      // renderSVGInImageTag
                    />
                    <p className={styles['helper_text']}>{placeholder}</p>
                  </>
                ) : (
                  <div>
                    <LinearProgress sx={{ width: '100%' }} variant="determinate" value={progress} />
                    {t('Uploading')}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {/* <ErrorComponent {...{ errors, subLabel }} /> */}
      </div>
      {!!value?.length && (
        <div className={styles['entry_container']}>
          <TextComponent
            field={{ value: t('UploadedDocuments') }}
            className={styles['entry_title']}
          />
          {value?.map((item, i) => {
            const { name, size } = item;

            return (
              <TextField
                variant="outlined"
                className={styles['entry_upload']}
                value={name}
                readOnly={true}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        className={styles['size_text']}
                        disableTouchRipple
                        disableFocusRipple
                        disableRipple
                      >
                        {(size / 1048576).toFixed(2)}MB
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(i)}
                        sx={{ padding: 0 }}
                        disableTouchRipple
                        disableFocusRipple
                        disableRipple
                        className={styles['delete_icon_wrapper']}
                      >
                        <ImageRenderer
                          icon="/images/trash_upload.svg"
                          width="54"
                          className={styles['delete_icon']}
                          // renderSVGInImageTag
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                      >
                      </IconButton> */}
                      <ImageRenderer
                        icon="/images/upload_document.svg"
                        // width="17"
                        className={styles['upload_document']}
                        renderSVGInImageTag
                      />
                    </InputAdornment>
                  ),
                  // onMouseEnter: (e) => e.target.blur(),
                }}
              />
            );
          })}
        </div>
      )}
      <TextComponent field={{ value: supportiveText }} className="form-supportive-text" />
    </div>
  );
};

export default CustomFileUpload;
// upload_fail
// trash_upload
//
