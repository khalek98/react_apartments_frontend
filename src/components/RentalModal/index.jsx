import { nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import { useRef, useState } from 'react';
import { Button, Modal, Form, InputGroup, CloseButton } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addNewApart } from '../../redux/Slices/apartSlice';
import Search from '../Search';

import styles from './RentalModal.module.scss';

const RentalModal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const [formTitle, setFormTitle] = useState('');
  const [formTextarea, setFormTextarea] = useState('');
  const [formPrice, setFormPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState('');
  const [formImgArr, setFormImgArr] = useState([]);
  const [formLocation, setFormLocation] = useState([]);
  const inputFileRef = useRef(null);

  const handleClose = () => setShow(false);
  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const files = e.target.files;
      let newImgArr = [];

      Object.values(files).forEach((file) => {
        newImgArr.push(`http://localhost:4000/uploads/${file.name}`);
        formData.append('multiple_images', file);
      });
      setFormImgArr(newImgArr);

      await axios.post('http://localhost:4000/upload', formData);
    } catch (error) {
      console.warn(error);
      alert('Failed upload file...');
    }
  };
  const handleDeleteImg = (i) => {
    setFormImgArr((state) => {
      const oldArr = [...state];
      const remove = oldArr.splice(i, 1);
      return oldArr;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      id: nanoid(),
      title: formTitle,
      description: formTextarea,
      price: +formPrice,
      imgArr: formImgArr,
      location: formLocation,
    };

    axios.post(`${process.env.REACT_APP_API_URL}/aparts`, formData);
    dispatch(addNewApart(formData));

    setFormTitle('');
    setFormTextarea('');
    setFormPrice(0);
    setFormImgArr([]);
    setFormLocation([]);
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form className={styles.modal_form} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Заповнiть опис</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Заголовок</Form.Label>
              <Form.Control
                required
                value={formTitle}
                placeholder="Здаю в оренду 2к квартиру"
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Опис</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                value={formTextarea}
                onChange={(e) => setFormTextarea(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Цiна</Form.Label>
              <InputGroup>
                <InputGroup.Text>UAH</InputGroup.Text>
                <Form.Control
                  required
                  value={formPrice}
                  type="number"
                  onChange={(e) => setFormPrice(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3 d-flex flex-column">
              {/* <div>
                <Form.Label>Посилання на URL-адресу зображення</Form.Label>

                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    url
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                  />
                  <Button variant="primary">+</Button>
                </InputGroup>
              </div> */}

              {/* <Button
                variant="outline-primary"
                onCLick={() => setCountAddImage((count) => count + 1)}
              >
                + Додати ще
              </Button> */}

              <Form.Label>Завантажити зображення</Form.Label>

              <div className="d-flex">
                <Button
                  className={styles.button_download}
                  onClick={() => inputFileRef.current.click()}
                  variant="primary"
                  size="large"
                >
                  Download
                </Button>

                <div className={styles.images_group}>
                  {formImgArr.map((imgUrl, i) => (
                    <div className={styles.images_group_item} key={i}>
                      <div
                        className={styles.button_close}
                        onClick={() => handleDeleteImg(i)}
                      >
                        <span></span>
                        <span></span>
                      </div>
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
            </Form.Group>

            <Search setFormLocation={setFormLocation} />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Закрити
            </Button>

            <Button variant="primary" type="submit">
              Здати в оренду
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default RentalModal;
