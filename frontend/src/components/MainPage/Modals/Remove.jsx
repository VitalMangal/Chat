import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';


import routes from '../../../routes.js';

const defaultChannelId = '1';

//не работает по нажатию клавиши Enter
const Remove = ({ modalInfo, setActiveChannelId, closeModal }) => {

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const { token } = userData;
    await axios.delete(routes.changeChannelPath(modalInfo.channel.id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    await setActiveChannelId(defaultChannelId);
    closeModal();
  };

  return (
    <Modal show aria-labelledby="contained-modal-title-vcenter" centered >
      <Modal.Header closeButton onHide={closeModal}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p className="lead">Уверены?</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group  className="mt-2 d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={closeModal}>Отменить</Button>
            <Button type="submit" variant="danger">Удалить</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;