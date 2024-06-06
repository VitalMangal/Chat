import React, { useState } from 'react';
import {
  ButtonToolbar,
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { useGetChannelsQuery } from '../../../redux/index.js';
import 'react-toastify/dist/ReactToastify.css';

import getModal from './Modals/index.js';

const renderModal = (modalInfo, setActiveChannelId, closeModal) => {
  if (!modalInfo.type) {
    return null;
  }
  const Component = getModal(modalInfo.type);
  return (
    <Component
      modalInfo={modalInfo}
      setActiveChannelId={setActiveChannelId}
      closeModal={closeModal}
    />
  );
};

const ChannelsComponent = ({ activeChannelId, setActiveChannelId }) => {
  const { t } = useTranslation();
  const { data = [], error } = useGetChannelsQuery();

  if (error) {
    toast.error(t('channels.error.message'));
  }

  const [modalInfo, setModalInfo] = useState({ type: null, channel: null });

  const openModal = (type, channel = null) => setModalInfo({ type, channel });
  const closeModal = () => setModalInfo({ type: null, channel: null });

  return (
    <>
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('channels.channels')}</b>
          <button type="button" onClick={() => openModal('add')} className="p-0 text-primary btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
            <span className="visually-hidden">+</span>
          </button>
        </div>
        <ButtonToolbar vertical="true" id="channels-box" aria-label="" className="flex-column mb-3 px-2 text-truncate h-100 overflow-auto">
          {data.map((channel) => {
            const btnClasses = cn('rounded-0', 'text-start', 'text-truncate');
            const buttonVariant = (channel.id === activeChannelId ? 'secondary' : 'light');
            if (!channel.removable) {
              return (
                <ButtonGroup className="w-100" key={channel.id}>
                  <Button
                    variant={buttonVariant}
                    className={btnClasses}
                    onClick={() => setActiveChannelId(channel.id)}
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </Button>
                </ButtonGroup>
              );
            }
            return (
              <ButtonGroup className="w-100 rounded-0" key={channel.id}>
                <Button
                  variant={buttonVariant}
                  className={btnClasses}
                  onClick={() => setActiveChannelId(channel.id)}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>

                <DropdownButton as={ButtonGroup} variant={buttonVariant} title="" id="dropdown">
                  <Dropdown.Item eventKey="1" onClick={() => openModal('remove', channel)}>{t('channels.remove')}</Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={() => openModal('rename', channel)}>{t('channels.rename')}</Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>
            );
          })}
        </ButtonToolbar>
      </div>
      {renderModal(modalInfo, setActiveChannelId, closeModal)}
    </>
  );
};

export default ChannelsComponent;
