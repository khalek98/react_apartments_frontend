import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';

import RentalModal from '../RentalModal';

import styles from './Header.module.scss';

const Header = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  return (
    <>
      <div className={styles.root}>
        <Container>
          {/* <img src="#" alt="logo" /> */}
          <Button variant="warning" onClick={handleShow}>
            Здати в оренду +
          </Button>
        </Container>
      </div>
      <RentalModal show={show} setShow={setShow} />
    </>
  );
};

export default Header;
