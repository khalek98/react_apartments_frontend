import { Dialog, DialogTitle, IconButton, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AnnouncementItem from './AnnouncementItem';
import { useSelector } from 'react-redux';

import styles from './UserAnnouncements.module.scss';

const UserAnnouncements = () => {
  const { items } = useSelector((state) => state.apart);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open
        // open={open} onClose={handleClose}
      >
        <DialogTitle className={styles.dialog_ads__title} component="h4">
          Особисті публікації
          <IconButton
            aria-label="close"
            // onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={styles.ads_wrapper}>
          {items.map((item) => (
            <AnnouncementItem key={item.title} {...item} />
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserAnnouncements;
