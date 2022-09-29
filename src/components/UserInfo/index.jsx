import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUpdateUser } from '../../redux/Slices/auth';

import {
  TextField,
  DialogContent,
  DialogActions,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormHelperText,
  IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const UserInfo = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [patchStatus, setPatchStatus] = useState('hold');
  const [changedData, setChangedData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (user) {
      setChangedData({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '',
      });
      setValue('firstName', user.firstName);
      setValue('lastName', user.lastName);
      setValue('email', user.email);
    }
    // eslint-disable-next-line
  }, [user]);

  const onChangeInputs = (e, field) => {
    setChangedData({ ...changedData, [field]: e.target.value });
  };

  const submitForm = async () => {
    setPatchStatus('loading');

    const { password, ...objWithoutPassword } = changedData;
    const params =
      changedData.password.length > 0
        ? { ...changedData }
        : { ...objWithoutPassword };

    const data = await dispatch(fetchUpdateUser(params));

    try {
      if (!data.payload) {
        console.log('Помилка аутентифікації');
      }

      if (!!data.payload && 'token' in data.payload) {
        setPatchStatus('success');
        window.localStorage.setItem('token', data.payload.token);
      } else {
        throw new Error('Данні вказано не вірно');
      }
    } catch (err) {
      patchStatus('error');
      console.log(err);
    } finally {
      setShowPassword(false);
      setPatchStatus('hold');
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(submitForm)}>
      <DialogContent sx={{ display: 'grid', rowGap: 2 }}>
        <TextField
          InputLabelProps={{ shrink: true }}
          value={changedData.firstName}
          onInput={(e) => onChangeInputs(e, 'firstName')}
          autoComplete="given-name"
          name="firstName"
          fullWidth
          label="Ім'я"
          error={Boolean(errors.firstName?.message)}
          helperText={errors.firstName?.message}
          {...register('firstName', {
            required: "Поле обов'язкове",
            validate: (value) => {
              if (value.length < 2) return 'Введіть більше ніж 2 символи';
            },
          })}
        />
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={changedData.lastName}
          onInput={(e) => onChangeInputs(e, 'lastName')}
          label="Прізвище"
          name="lastName"
          autoComplete="family-name"
          error={Boolean(errors.lastName?.message)}
          helperText={errors.lastName?.message}
          {...register('lastName', {
            required: "Поле обов'язкове",
            validate: (value) => {
              if (value.length < 2) return 'Введіть більше ніж 2 символи';
            },
          })}
        />
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={changedData.email}
          onInput={(e) => onChangeInputs(e, 'email')}
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
        <FormControl sx={{ m: 1, marginLeft: 0 }} fullWidth variant="outlined">
          <InputLabel
            htmlFor="outlined-adornment-password"
            error={Boolean(errors.password?.message)}
          >
            Пароль
          </InputLabel>
          <OutlinedInput
            margin="dense"
            value={changedData.password}
            onInput={(e) => onChangeInputs(e, 'password')}
            fullWidth
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
              validate: (value) => {
                if (value.length > 0 && value.length < 8) {
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
      </DialogContent>
      <DialogActions>
        <LoadingButton
          type="submit"
          disabled={patchStatus === 'error' || patchStatus === 'success'}
          endIcon={<SaveIcon />}
          loading={patchStatus === 'loading'}
          loadingPosition="end"
          variant="contained"
        >
          Змінити данні
        </LoadingButton>
      </DialogActions>
    </form>
  );
};

export default UserInfo;
