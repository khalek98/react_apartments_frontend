import { nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import { useState } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addNewApart } from '../../redux/Slices/apartSlice';
import Search from '../Search';

const RentalModal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const [formTitle, setFormTitle] = useState('');
  const [formTextarea, setFormTextarea] = useState('');
  const [formPrice, setFormPrice] = useState(0);
  const [formImgArr, setFormImgArr] = useState([]);
  const [formLocation, setFormLocation] = useState([]);

  const handleClose = () => setShow(false);
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

    axios.post('http://localhost:4000/aparts', formData);
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
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Заповнiть опис</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Заголовок</Form.Label>
              <Form.Control
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
                  value={formPrice}
                  type="number"
                  onChange={(e) => setFormPrice(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Посилання на URL-адресу зображення</Form.Label>

              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">url</InputGroup.Text>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={(e) => setFormImgArr([`${e.target.value}`])}
                />
                {/* <Button variant="primary">+</Button> */}
              </InputGroup>

              {/* <Button
                variant="outline-primary"
                onCLick={() => setCountAddImage((count) => count + 1)}
              >
                + Додати ще
              </Button> */}
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
