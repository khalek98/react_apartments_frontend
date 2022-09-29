import { useSelector } from 'react-redux';
import {
  CardActionArea,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';

import styles from './UserAnnouncements.module.scss';

const UserAnnouncements = () => {
  const { userPosts } = useSelector((state) => state.auth);

  return (
    <>
      <Box component={'div'} className={styles.ads_wrapper} maxWidth={'xl'}>
        {userPosts.length > 0 ? (
          userPosts.map(({ imgArr, title, description, price }) => (
            <Card key={title} className={styles.card}>
              <CardActionArea className={styles.card_wrapper}>
                {imgArr.length > 0 ? (
                  <CardMedia
                    component="img"
                    //   height="140"
                    image={imgArr[0]}
                    alt={title}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    image="https://pbs.twimg.com/media/C5OTOt3UEAAExIk?format=jpg&name=small"
                    alt="not found"
                    sx={{ objectFit: 'contain!important' }}
                  />
                )}

                <CardContent>
                  <Typography
                    className={styles.card_title}
                    variant="h6"
                    component="h4"
                  >
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
          ))
        ) : (
          <Typography variant="h4">
            У Вас поки що немає створених об'яв
          </Typography>
        )}
      </Box>
    </>
  );
};

export default UserAnnouncements;
