import Carousel from 'react-bootstrap/Carousel';

import styles from './ApartBlock.module.scss';

const ApartBlock = ({ imgArr, title, description, price }) => {
  return (
    <div className={styles.root}>
      {imgArr.length > 0 ? (
        <Carousel>
          {imgArr.map((img, i) => {
            return (
              <Carousel.Item key={`item-${i}`}>
                <img
                  className={`d-block w-100 ${styles.image}`}
                  src={img}
                  alt={title}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : (
        <img
          className={`d-block w-100 ${styles.image}`}
          src="https://pbs.twimg.com/media/C5OTOt3UEAAExIk?format=jpg&name=small"
          alt="not found"
        />
      )}
      <div className={styles.bottom_wrap}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.descr}>
          {description.length > 250
            ? `${description.slice(0, 250)}...`
            : description}
        </p>
        <div className={styles.price}>{price}UAH</div>
      </div>
    </div>
  );
};

export default ApartBlock;
