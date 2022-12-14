import {
  Alert,
  Avatar,
  Box,
  Drawer,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  Container,
  CssBaseline,
  IconButton,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useDispatch } from 'react-redux';
import { fetchAuth, setSignIn } from '../../redux/Slices/auth';

// eslint-disable-next-line
import styles from './SignIn.module.scss';

const SignIn = ({ showSignIn, toggleDrawer }) => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [errorAuth, setErrorAuth] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm();

  const onSubmit = (e) => async (value) => {
    e.preventDefault();

    const data = await dispatch(fetchAuth(value));
    try {
      if (!data.payload) {
        console.log('Помилка аутентифікації');
      }

      if (!!data.payload && 'token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      } else {
        throw new Error('Невірний логін або пароль');
      }

      toggleDrawer('signIn', false)(e);
      reset({ email: '', password: '' });
    } catch (err) {
      setErrorAuth(true);
      console.log(err);
    } finally {
      setShowPassword(false);

      dispatch(setSignIn());
    }
  };

  const errorAuthClear = () => {
    if (errorAuth) setErrorAuth(false);
  };

  const toggleAndClearErrors = (trigger, open) => (e) => {
    toggleDrawer(trigger, open)(e);
    clearErrors();
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={showSignIn}
        onClose={toggleAndClearErrors('signIn', false)}
      >
        <IconButton
          aria-label="close"
          onClick={toggleAndClearErrors('signIn', false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <CssBaseline />
        <Container maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Вхід
            </Typography>
            <Box
              component="form"
              onChange={errorAuthClear}
              onSubmit={(e) => {
                // toggleDrawer('signIn', false)(e);
                handleSubmit(onSubmit(e))(e);
              }}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                type="email"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register('email', {
                  required: "Поле обов'язкове",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/i,
                    message:
                      'Введіть корректний e-mail. Наприклад: example@gmail.com',
                  },
                })}
                label="Ел. пошта"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <FormControl
                sx={{ m: 1, marginLeft: 0 }}
                fullWidth
                variant="outlined"
              >
                <InputLabel
                  required
                  htmlFor="outlined-adornment-password"
                  error={Boolean(errors.password?.message)}
                >
                  Пароль
                </InputLabel>
                <OutlinedInput
                  margin="dense"
                  fullWidth
                  required
                  name="password"
                  label="Пароль"
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((state) => !state)}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  error={Boolean(errors.password?.message)}
                  {...register('password', {
                    required: "Поле обов'язкове",
                    validate: (value) => {
                      if (value.length < 8) {
                        return 'Пароль має складатись мінімум з восьми символів';
                      }
                    },
                  })}
                />
                <FormHelperText
                  error={Boolean(errors.password?.message)}
                  id="component-error-text"
                >
                  {errors.password?.message}
                </FormHelperText>
              </FormControl>
              {errorAuth && (
                <Alert severity="error">Невірний логін або пароль</Alert>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Запам'ятати мене"
              />
              <Button
                // disabled={!isValid}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Увійти
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={(e) => {
                      toggleAndClearErrors('signIn', false)(e);
                      setTimeout(() => {
                        toggleAndClearErrors('signUp', true)(e);
                      }, 300);
                    }}
                  >
                    Зареєструватися
                  </Link>
                </Grid>
              </Grid>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
            </Box>
          </Box>
        </Container>
      </Drawer>
    </>
  );
};

export default SignIn;
