import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import styles from './ApartBlock.module.scss';

const ApartBlock = ({ imgArr, title, description, price }) => {
  return (
    <div className={styles.root}>
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