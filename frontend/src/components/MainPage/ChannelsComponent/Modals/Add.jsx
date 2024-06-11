import React, {
  useEffect, useRef, useContext,
} from 'react';
import { Formik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useGetChannelsQuery, useAddChannelMutation } from '../../../../store/index.js';
import DataContext from '../../../../context/DataContext.js';

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

const Add = ({ setActiveChannelId, closeModal }) => {
  const { filter } = useContext(DataContext);
  const { t } = useTranslation();

  const { data, isLoading } = useGetChannelsQuery();
  const [addChannel, { error }] = useAddChannelMutation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(t('modal.add.errors.notAdded'));
    }
  }, [error, t]);

  const channelsNames = data.map((channel) => channel.name);

  const addSubmit = async (values, actions) => {
    const filtered = filter.clean(values.name);
    const resp = await addChannel({ name: filtered });
    setActiveChannelId(resp.data.id);
    closeModal();
    toast.success(t('modal.add.added'));
    actions.resetForm();
  };

  return (
    <Modal show aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton onHide={closeModal}>
        <Modal.Title>{t('modal.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={getSchema(channelsNames)}
          onSubmit={addSubmit}
          initialValues={{
            name: '',
          }}
        >
          {({
            handleSubmit, handleChange, values, touched, errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Control
                  required
                  ref={inputRef}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  isInvalid={touched.name && !!errors.name}
                  type="text"
                  disabled={isLoading}
                />
                <Form.Label visuallyHidden>{t('modal.add.label')}</Form.Label>
                <Form.Control.Feedback type="invalid">{errors.name ? t(`modal.add.errors.${errors.name}`) : null}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-2 d-flex justify-content-end">
                <Button
                  className="me-2"
                  variant="secondary"
                  onClick={closeModal}
                  disabled={isLoading}
                >
                  {t('modal.add.cancel')}
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

export default Add;

/*
const addSubmit = (values, actions) => {
  const filtered = filter.clean(values.name);
  addChannel({ name: filtered })
    .unwrap()
    .then((payload) => {
      setActiveChannelId(payload.id);
      closeModal();
      toast.success(t('modal.add.added'));
      actions.resetForm();
    })
    .catch(() => {
      actions.setSubmitting(false);
      toast.error(t('modal.add.errors.notAdded'));
    });
};
*/
