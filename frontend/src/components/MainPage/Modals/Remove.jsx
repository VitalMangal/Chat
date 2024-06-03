import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { useRemoveChannelMutation } from '../../../redux/index.js'

import routes from '../../../routes.js';

const defaultChannelId = '1';

//не работает по нажатию клавиши Enter
const Remove = ({ modalInfo, setActiveChannelId, closeModal }) => {
  const { t } = useTranslation();
   //реализовать обработку ошибок и время загрузки
   const [
    removeChannel,
    { data: response, error: addUserError, isLoading: isAddingUser },
  ] = useRemoveChannelMutation();

  const handleSubmit = async (e) =>  {
    //нужна обработка ошибок, но как ее выполнить?
    e.preventDefault();
    await removeChannel(modalInfo.channel.id).unwrap();
    setActiveChannelId(defaultChannelId);
    closeModal();
  };

  return (
    <Modal show aria-labelledby="contained-modal-title-vcenter" centered >
      <Modal.Header closeButton onHide={closeModal}>
        <Modal.Title>{t('modal.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p className="lead">{t('modal.remove.body')}</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group  className="mt-2 d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={closeModal}>{t('modal.remove.cancel')}</Button>
            <Button type="submit" variant="danger">{t('modal.remove.send')}</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;