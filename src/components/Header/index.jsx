import { useState } from 'react';
import { AppBar, Button, Container, Toolbar, Alert } from '@mui/material';

import RentalModal from '../RentalModal';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, signOut } from '../../redux/Slices/auth';
import { useEffect } from 'react';

const Header = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);
  const { signIn } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const toggleDrawer = (trigger, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    switch (trigger) {
      case 'signIn': {
        setShowSignIn(open);
        break;
      }
      case 'signUp': {
        setShowSignUp(open);
        break;
      }
      default: {
        return;
      }
    }
  };

  const handleShow = () => setOpen(true);

  const onClickLogout = () => {
    if (window.confirm('Ви дійсно бажаєте вийти з аккаунта?')) {
      dispatch(signOut());
      window.localStorage.removeItem('token');
      // navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    if (isAuth) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  }, [isAuth]);

  return (
    <>
      <AppBar className={styles.root} position="static">
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'flex-end', columnGap: '10px' }}>
            {isAuth ? (
              <>
                <Button
                  color="warning"
                  variant="contained"
                  onClick={handleShow}
                >
                  Здати в оренду +
                </Button>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Вийти
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="info"
                  onClick={toggleDrawer('signIn', true)}
                >
                  Увійти
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={toggleDrawer('signUp', true)}
                >
                  Реєстрація
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <RentalModal open={open} setOpen={setOpen} />
      <SignIn showSignIn={showSignIn} toggleDrawer={toggleDrawer} />
      <SignUp showSignUp={showSignUp} toggleDrawer={toggleDrawer} />
      {showAlert && signIn && <AlertModl />}
    </>
  );
};

export default Header;

const AlertModl = () => {
  return (
    <>
      <Alert className={styles.alert} severity="success">
        Авторизація пройшла успішно
      </Alert>
    </>
  );
};
