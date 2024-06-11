import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useRemoveChannelMutation } from '../../../../store/index.js';

const Remove = ({ modalInfo, closeModal }) => {
  const { t } = useTranslation();
  const [removeChannel, { isLoading, error }] = useRemoveChannelMutation();

  const channelId = modalInfo.channel.id;

  useEffect(() => {
    if (error) {
      toast.error(t('modal.remove.notRemoved'));
    }
  }, [error, t]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await removeChannel(channelId);
    closeModal();
    toast.success(t('modal.remove.removed'));
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
