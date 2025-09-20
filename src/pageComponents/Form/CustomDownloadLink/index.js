import React from 'react';
// import "./index.scss";
import styles from './index.module.scss';
// import clsx from 'clsx';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import ErrorComponent from '../ErrorComponent';
// import { useConditions } from '../FormFieldHook';
// import { useI18n } from 'next-localization';
import TextComponent from 'subComponents/TextComponent';
import ImageRenderer from 'subComponents/ImageRenderer';
// import SitecoreIcon from "components/Shared/components/SitecoreIcon";
// import CountryCodeSelector from "./countryCodeSelector";

const CustomDownloadLink = (props) => {
  // const { t } = useI18n();
  const { field, errors } = props;
  const { model } = field;
  const { label, text, link, subLabel } = model;

  return (
    <>
      <div className={styles['CustomDownloadLink']}>
        <TextComponent field={{ value: label }} className={styles['entry_title']} />

        <TextField
          variant="outlined"
          className={styles['entry_upload']}
          value={text}
          readOnly={true}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <a href={link} target="_blank" aria-label={text}>
                  <IconButton
                    sx={{ padding: 0 }}
                    disableTouchRipple
                    disableFocusRipple
                    disableRipple
                    className={styles['delete_icon_wrapper']}
                  >
                    <ImageRenderer
                      icon="/images/external_CTA.svg"
                      width="54"
                      className={styles['delete_icon']}
                      // renderSVGInImageTag
                    />
                  </IconButton>
                </a>
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
      </div>
      <ErrorComponent {...{ errors, subLabel }} />
    </>
  );
};

export default CustomDownloadLink;
