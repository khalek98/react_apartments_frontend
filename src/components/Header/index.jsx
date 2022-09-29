import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import RentalModal from '../RentalModal';
import { AlertSignIn } from '../AlertModal/';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

import { selectIsAuth, signOut } from '../../redux/Slices/auth';

import {
  AppBar,
  Button,
  Container,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Stack,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
// import MenuIcon from '@mui/icons-material/Menu';

import styles from './Header.module.scss';

const iconsParams = {
  width: { md: '35px', xs: '30px' },
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isAuth = useSelector(selectIsAuth);
  const { signIn } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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
      navigate('/', { replace: true });
    }
    setAnchorEl(null);
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
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Stack direction="row">
              {/* <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon sx={{ height: '100%', ...iconsParams }} />
              </IconButton> */}
              <Typography
                component={RouterLink}
                to="/"
                className={styles.logo}
                variant="h6"
                noWrap
              >
                <HomeWorkIcon /> Aparts
              </Typography>
            </Stack>
            <Stack height={40} direction="row" spacing={1}>
              {isAuth ? (
                <>
                  {!pathname.includes('/profile') && (
                    <Button
                      color="warning"
                      variant="contained"
                      onClick={handleShow}
                    >
                      Здати в оренду +
                    </Button>
                  )}
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenMenu}
                    color="inherit"
                  >
                    <AccountCircle
                      sx={{
                        height: {
                          xs: '30px',
                          md: '35px',
                        },
                        ...iconsParams,
                      }}
                    />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                  >
                    <RouterLink
                      onClick={handleCloseMenu}
                      to="/profile"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <MenuItem>Мій профіль</MenuItem>
                    </RouterLink>
                    <MenuItem onClick={onClickLogout}>Вийти</MenuItem>
                  </Menu>
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
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <RentalModal open={open} setOpen={setOpen} />
      <SignIn showSignIn={showSignIn} toggleDrawer={toggleDrawer} />
      <SignUp showSignUp={showSignUp} toggleDrawer={toggleDrawer} />

      {showAlert && signIn && (
        <AlertSignIn message={'Авторизація пройшла успішно'} />
      )}
    </>
  );
};

export default Header;
