import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useGetChannelsQuery } from '../../../store/index.js';

import getModal from './Modals/index.js';
import ChannelsToolbar from './ChannelsToolbar.jsx';

const renderModal = (modalInfo, activeChannelId, setActiveChannelId, closeModal) => {
  if (!modalInfo.type) {
    return null;
  }
  const Component = getModal(modalInfo.type);
  return (
    <Component
      modalInfo={modalInfo}
      activeChannelId={activeChannelId}
      setActiveChannelId={setActiveChannelId}
      closeModal={closeModal}
    />
  );
};

const ChannelsComponent = ({ activeChannelId, setActiveChannelId }) => {
  const { t } = useTranslation();
  const { data = [], error } = useGetChannelsQuery();

  useEffect(() => {
    if (error) {
      toast.error(t('channels.error'));
    }
  }, [error, t]);

  const [modalInfo, setModalInfo] = useState({ type: null, channel: null });

  const openModal = (type, channel = null) => setModalInfo({ type, channel });
  const closeModal = () => setModalInfo({ type: null, channel: null });

  return (
    <>
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('channels.channels')}</b>
          <Button onClick={() => openModal('add')} variant="light" className="p-0 text-primary btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
            <span className="visually-hidden">+</span>
          </Button>
        </div>
        <ChannelsToolbar
          channels={data}
          openModal={openModal}
          activeChannelId={activeChannelId}
          setActiveChannelId={setActiveChannelId}
        />
      </div>
      {renderModal(modalInfo, activeChannelId, setActiveChannelId, closeModal)}
    </>
  );
};

export default ChannelsComponent;
