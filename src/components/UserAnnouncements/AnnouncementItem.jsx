import {
  CardActionArea,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import styles from './UserAnnouncements.module.scss';

const AnnouncementItem = ({ imgArr, title, description, price }) => {
  return (
    <Card className={styles.card}>
      <CardActionArea className={styles.card_wrapper}>
        <CardMedia
          component="img"
          //   height="140"
          image={imgArr[0]}
          alt={title}
        />
        <CardContent>
          <Typography className={styles.card_title} variant="h6" component="h4">
            {title}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {description.length < 150
              ? description
              : `${description.slice(0, 150)}...`}
          </Typography>
          <Typography variant="h6">{price} ГРН</Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AnnouncementItem;
