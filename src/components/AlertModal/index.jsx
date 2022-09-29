import { Alert } from '@mui/material';

import styles from './AlertModal.module.scss';

export const AlertSignIn = ({ message }) => {
  return (
    <>
      <Alert className={styles.alert} variant="filled" severity="success">
        {message}
      </Alert>
    </>
  );
};

export const AlertAd = ({ message, postStatus }) => {
  return (
    <>
      <Alert className={styles.alert_ad} severity={postStatus}>
        {message}
      </Alert>
    </>
  );
};
