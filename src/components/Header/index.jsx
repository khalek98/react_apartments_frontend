import { useState } from 'react';
import { Button, Container } from '@mui/material';

import RentalModal from '../RentalModal';

import styles from './Header.module.scss';

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleShow = () => setOpen(true);

  return (
    <>
      <div className={styles.root}>
        <Container>
          <Button color="warning" variant="contained" onClick={handleShow}>
            Здати в оренду +
          </Button>
        </Container>
      </div>
      <RentalModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Header;
