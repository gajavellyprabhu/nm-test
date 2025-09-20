import React from 'react';
// import "./index.scss";
import styles from './index.module.scss';
import { FormHelperText } from '@mui/material';

const ErrorComponent = (props) => {
  const { errors, subLabel, 'data-cy':dataCY } = props;
  const isPlaceholderText = !!subLabel;
  const isErrors = !!errors?.length;
  return isErrors ? (
    <div className={styles["ErrorComponent"]}>
      {errors?.map((item, i) => (
        <FormHelperText error key={i} className={styles["error-text"]} data-cy={dataCY? dataCY : 'error'}>
          {item}
        </FormHelperText>
      ))}
    </div>
  ) : (
    isPlaceholderText && (
      <div className={styles["ErrorComponent"]}>
        <FormHelperText className={styles["helper-text"]} data-cy={dataCY? dataCY : 'helper-text'}>{subLabel}</FormHelperText>
      </div>
    )
  );
};

export default ErrorComponent;
