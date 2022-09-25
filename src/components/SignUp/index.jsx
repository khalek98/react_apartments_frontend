import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  Grid,
  FormHelperText,
  Link,
  Container,
  CssBaseline,
  Drawer,
  InputAdornment,
  IconButton,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { fetchSignUp, setSignIn } from '../../redux/Slices/auth';

// eslint-disable-next-line
import styles from './SignUp.module.scss';

const SignUp = ({ showSignUp, toggleDrawer }) => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm();

  const onSubmit = (e) => async (value) => {
    e.preventDefault();
    const data = await dispatch(fetchSignUp(value));

    if (!data.payload) {
      alert('Помилка при реєстрації');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }

    setShowPassword(false);
    toggleDrawer('signUp', false)(e);
    reset({ firstName: '', lastName: '', email: '', password: '' });

    dispatch(setSignIn());
  };

  const toggleAndClearErrors = (trigger, open) => (e) => {
    toggleDrawer(trigger, open)(e);
    clearErrors();
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={showSignUp}
        onClose={(e) => toggleAndClearErrors('signUp', false)(e)}
      >
        <IconButton
          aria-label="close"
          onClick={(e) => toggleAndClearErrors('signUp', false)(e)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box className={styles.box_wrapper}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e) => {
                // toggleDrawer('signUp', false)(e);
                handleSubmit(onSubmit(e))(e);
              }}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Ім'я"
                    autoFocus
                    error={Boolean(errors.firstName?.message)}
                    helperText={errors.firstName?.message}
                    {...register('firstName', {
                      required: "Поле обов'язкове",
                      validate: (value) => {
                        if (value.length < 2)
                          return 'Введіть більше ніж 2 символи';
                      },
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Прізвище"
                    name="lastName"
                    autoComplete="family-name"
                    error={Boolean(errors.lastName?.message)}
                    helperText={errors.lastName?.message}
                    {...register('lastName', {
                      required: "Поле обов'язкове",
                      validate: (value) => {
                        if (value.length < 2)
                          return 'Введіть більше ніж 2 символи';
                      },
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Ел. пошта"
                    name="email"
                    autoComplete="email"
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
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* <TextField
                    required
                    fullWidth
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', {
                      required: "Поле обов'язкове",
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message: 'Пароль має складатись мінімум з однієї цифри',
                      },
                    })}
                    autoComplete="new-password"
                  /> */}
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
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Зареєструватися
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={(e) => {
                      toggleAndClearErrors('signUp', false)(e);
                      setTimeout(() => {
                        toggleAndClearErrors('signIn', true)(e);
                      }, 300);
                    }}
                  >
                    Вже маєте акаунт? Увійти
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Drawer>
    </>
  );
};

export default SignUp;
