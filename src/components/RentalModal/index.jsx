import { nanoid } from '@reduxjs/toolkit';
import axios from '../../axios';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewApart } from '../../redux/Slices/apart';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormHelperText,
  IconButton,
  FormLabel,
  FormGroup,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

import Search from '../Search';

import styles from './RentalModal.module.scss';

const RentalModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
  });

  const [formDataObj, setFormDataObj] = useState({
    id: nanoid(),
    title: '',
    description: '',
    price: +'',
    imgArr: [],
    location: {
      longitude: '',
      latitude: '',
    },
  });
  const inputFileRef = useRef(null);
  const [postStatus, setPostStatus] = useState('hold');
  const [loadFiles, setLoadFiles] = useState(false);

  const onChangeInputs = (prop, value) => {
    setFormDataObj({
      ...formDataObj,
      [prop]: value,
    });
  };

  const handleClose = () => setOpen(false);
  const handleChangeFile = async (e) => {
    setLoadFiles(true);
    if (e.target.files.length <= 0) return;

    try {
      const formData = new FormData();
      const files = e.target.files;
      let newImgArr = [];

      Object.values(files).forEach((file) => {
        newImgArr.push(`${process.env.REACT_APP_API_URL}/uploads/${file.name}`);
        formData.append('multiple_images', file);
      });

      await axios
        .post(`/upload`, formData)
        .then((res) => res.status === 200 && setLoadFiles(false))
        .then(() => setFormDataObj({ ...formDataObj, imgArr: newImgArr }));
    } catch (error) {
      console.log(error);
      alert('Failed upload file...');
    } finally {
      setLoadFiles(false);
    }
  };
  const handleDeleteImg = (i) => {
    setFormDataObj((state) => {
      const oldImgArr = state.imgArr;
      oldImgArr.splice(i, 1);
      return { ...state, imgArr: oldImgArr };
    });
  };

  const submitForm = async (e) => {
    console.log(e);
    setPostStatus('loading');

    try {
      await axios
        .post(`/aparts`, formDataObj)
        .then((res) => res.status === 200)
        .then(() => setPostStatus('success'))
        .then(dispatch(addNewApart(formDataObj)));
    } catch (error) {
      console.error(error);
      const {
        response: { data },
      } = error;
      data &&
        data.forEach((err) =>
          console.log(`${err.param.toUpperCase()}: `, err.msg),
        );
      setPostStatus('error');
    } finally {
      setTimeout(() => setOpen(false), 2500);
      setTimeout(() => {
        setPostStatus('hold');
        reset();
        setFormDataObj({
          id: nanoid(),
          title: '',
          description: '',
          price: +'',
          imgArr: [],
          location: {
            longitude: '',
            latitude: '',
          },
        });
      }, 3500);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <DialogTitle>Заповнiть даннi</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Controller
              control={control}
              name="title"
              rules={{
                required: "Обов'язкове поле",
                validate: (value) => {
                  if (value && value.length < 5) {
                    return 'Мiнiмальна довжина заголовку 5 символiв';
                  }
                  return true;
                },
              }}
              render={({ field }) => {
                return (
                  <TextField
                    disabled={
                      postStatus === 'error' || postStatus === 'success'
                    }
                    id="demo-helper-text-aligned"
                    label="Заголовок"
                    placeholder="Здам 2к квартиру..."
                    onChange={(e) => {
                      field.onChange(e);
                      onChangeInputs('title', e.target.value);
                    }}
                    value={field.value}
                    fullWidth
                    margin="normal"
                    error={!!errors.title?.message}
                    helperText={errors?.title?.message}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="description"
              rules={{
                required: "Обов'язкове поле",
                validate: (value) => {
                  if (value && value.length < 10) {
                    return 'Мiнiмальна довжина заголовку 10 символи';
                  }
                  return true;
                },
              }}
              render={({ field }) => {
                return (
                  <TextField
                    disabled={
                      postStatus === 'error' || postStatus === 'success'
                    }
                    id="demo-helper-text-aligned"
                    label="Опис об'яви"
                    placeholder="Опишiть деталi: що поруч, iнраструктуру, поверх i т.д."
                    multiline
                    minRows={3}
                    onChange={(e) => {
                      field.onChange(e);
                      onChangeInputs('description', e.target.value);
                    }}
                    value={field.value}
                    fullWidth
                    margin="normal"
                    error={!!errors.description?.message}
                    helperText={errors?.description?.message}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="price"
              rules={{
                required: "Обов'язкове поле",
                validate: (value) => {
                  if (value && value <= 0) {
                    return 'Мiнiмальне значення "1"';
                  }
                  return true;
                },
              }}
              render={({ field }) => {
                return (
                  <FormControl fullWidth margin="normal">
                    <InputLabel shrink error={!!errors.price?.message}>
                      Цiна
                    </InputLabel>
                    <OutlinedInput
                      disabled={
                        postStatus === 'error' || postStatus === 'success'
                      }
                      onChange={(e) => {
                        const transformValue = +e.target.value.replace(
                          /[^0-9]/g,
                          '',
                        );
                        field.onChange(transformValue);
                        onChangeInputs('price', transformValue);
                      }}
                      value={field.value}
                      error={!!errors.price?.message}
                      // helperText={errors?.price?.message}
                      inputMode="numeric"
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">ГРН</InputAdornment>
                      }
                      label="Цiна"
                    />
                    <FormHelperText error={!!errors?.price?.message}>
                      {errors?.price?.message}
                    </FormHelperText>
                  </FormControl>
                );
              }}
            />

            <FormGroup style={{ marginBottom: 15 }}>
              <FormLabel style={{ marginBottom: 15 }}>
                Завантажити зображення
              </FormLabel>
              <div className={styles.images_wrapper}>
                <LoadingButton
                  disabled={postStatus === 'error' || postStatus === 'success'}
                  className={styles.button_download}
                  onClick={() => inputFileRef.current.click()}
                  variant="contained"
                  loading={loadFiles}
                >
                  Завантажити
                </LoadingButton>

                <div className={styles.images_group}>
                  {formDataObj.imgArr.map((imgUrl, i) => (
                    <div className={styles.images_group_item} key={i}>
                      <button
                        disabled={
                          postStatus === 'error' || postStatus === 'success'
                        }
                        className={styles.button_remove}
                        onClick={() => handleDeleteImg(i)}
                      >
                        <span></span>
                        <span></span>
                      </button>
                      <img src={imgUrl} alt="upload img-info apartment" />
                    </div>
                  ))}
                </div>
              </div>

              <input
                ref={inputFileRef}
                type="file"
                multiple
                onChange={handleChangeFile}
                hidden
              />
            </FormGroup>

            <Search
              onChangeInputs={onChangeInputs}
              register={register}
              errors={errors}
            />
          </DialogContent>

          <DialogActions>
            <Stack spacing={2} direction="row" marginBottom={1}>
              <Button className={styles.button_close} onClick={handleClose}>
                Закрити
              </Button>
              <LoadingButton
                type="submit"
                disabled={postStatus === 'error' || postStatus === 'success'}
                endIcon={<SendIcon />}
                loading={postStatus === 'loading'}
                loadingPosition="end"
                variant="contained"
              >
                Здати в оренду
              </LoadingButton>
            </Stack>
          </DialogActions>
        </form>

        {/* {postStatus === 'success' && (
          <DialogTitle>
            Успiшно <DoneAllIcon color="success" />
          </DialogTitle>
        )} */}
      </Dialog>

      {postStatus === 'success' && (
        <Alert className={styles.alert_ad} severity={postStatus}>
          Об'яву успішно додано!
        </Alert>
      )}
      {postStatus === 'error' && (
        <Alert className={styles.alert_ad} severity={postStatus}>
          Упс. Щось пішло не так...
        </Alert>
      )}
    </>
  );
};

export default RentalModal;
