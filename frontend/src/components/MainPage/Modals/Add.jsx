import React, { useEffect, useState, useRef } from 'react';
import * as formik from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { useGetChannelsQuery, useAddChannelMutation } from '../../../redux';
import filter from '../../../leo-profanity';

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
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { Formik } = formik;
  const { data, error, refetch } = useGetChannelsQuery();
  //нужна обработка ошибок, но как ее выполнить?
  const channelsNames = data.map((channel) => channel.name);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

 //реализовать обработку ошибок и время загрузки
  const [
    addChannel,
    { data: response, error: addUserError, isLoading: isAddingUser },
  ] = useAddChannelMutation();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try{
      const filtered = filter.clean(values.name)
      const resp = await addChannel({name: filtered});
      setActiveChannelId(resp.data.id);
      closeModal();
      setIsLoading(false);
      toast.success(t('modal.add.added'));
    } catch (err) {
    //Обработка ошибок либо тут, либо через мидлвару
      console.log(err);
      setIsLoading(false);
      toast.error(t('modal.add.errors.notAdded'));
    }
  };

  return (
    <Modal show aria-labelledby="contained-modal-title-vcenter" centered >
      <Modal.Header closeButton onHide={closeModal}>
        <Modal.Title>{t('modal.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={getSchema(channelsNames)}
          onSubmit={handleSubmit}
          initialValues={{
            name: '',
          }}
        >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
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
            <Form.Label htmlFor="name" visuallyHidden>{t('modal.add.label')}</Form.Label>
            <Form.Control.Feedback type="invalid">{!!errors.name ? t(`modal.add.errors.${errors.name}`) : null}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group  className="mt-2 d-flex justify-content-end">
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
