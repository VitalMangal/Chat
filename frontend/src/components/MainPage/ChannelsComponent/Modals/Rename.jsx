import React, { useEffect, useRef, useState } from 'react';
import * as formik from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetChannelsQuery, useRenameChannelMutation } from '../../../../redux/index.js';

import filter from '../../../../assets/leo-profanity.js';

const getSchema = (channels) => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'length')
      .max(20, 'length')
      .required('required')
      .notOneOf(channels, 'notUnique'),
  });
  return schema;
};

const Rename = ({ modalInfo, closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { Formik } = formik;

  const { data } = useGetChannelsQuery();
  const channelsNames = data.map((channel) => channel.name);

  const [renameChannel] = useRenameChannelMutation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const renameSubmit = async (values) => {
    setIsLoading(true);
    try {
      const filtered = filter.clean(values.name);
      await renameChannel({ id: modalInfo.channel.id, body: { name: filtered } });
      closeModal();
      setIsLoading(false);
      toast.success(t('modal.rename.renamed'));
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error(t('modal.rename.errors.notRenamed'));
    }
  };

  return (
    <Modal show aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton onHide={closeModal}>
        <Modal.Title>{t('modal.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={getSchema(channelsNames)}
          onSubmit={renameSubmit}
          initialValues={{
            name: modalInfo.channel.name,
          }}
        >
          {({
            handleSubmit, handleChange, values, touched, errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  required
                  ref={inputRef}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  id="name"
                  isInvalid={touched.name && !!errors.name}
                  type="text"
                  disabled={isLoading}
                />
                <Form.Label htmlFor="name" visuallyHidden>{t('modal.rename.label')}</Form.Label>
                <Form.Control.Feedback type="invalid">{errors.name ? t(`modal.rename.errors.${errors.name}`) : null}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-2 d-flex justify-content-end">
                <Button
                  className="me-2"
                  variant="secondary"
                  onClick={closeModal}
                  disabled={isLoading}
                >
                  {t('modal.rename.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                >
                  {t('modal.add.send')}
                </Button>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
