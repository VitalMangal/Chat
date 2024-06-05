import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { useRemoveChannelMutation } from '../../../../redux/index.js';

const defaultChannelId = '1';

const Remove = ({ modalInfo, setActiveChannelId, closeModal }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [removeChannel] = useRemoveChannelMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await removeChannel(modalInfo.channel.id).unwrap();
      setActiveChannelId(defaultChannelId);
      setIsLoading(false);
      closeModal();
      toast.success(t('modal.remove.removed'));
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error(t('modal.remove.notRemoved'));
    }
  };

  return (
    <Modal show aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton onHide={closeModal}>
        <Modal.Title>{t('modal.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.remove.body')}</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mt-2 d-flex justify-content-end">
            <Button
              className="me-2"
              variant="secondary"
              onClick={closeModal}
              disabled={isLoading}
            >
              {t('modal.remove.cancel')}
            </Button>
            <Button
              type="submit"
              variant="danger"
              disabled={isLoading}
            >
              {t('modal.remove.send')}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
