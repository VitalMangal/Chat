import React from 'react';
import {
  ButtonToolbar,
  Button,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

const RenderChannels = ({
  channels, openModal, activeChannelId, setActiveChannelId,
}) => {
  const { t } = useTranslation();

  return (
    <ButtonToolbar vertical="true" id="channels-box" aria-label="" className="flex-column mb-3 px-2 text-truncate h-100 overflow-auto">
      {channels.map((channel) => {
        const btnClasses = cn('w-100', 'rounded-0', 'text-start', 'text-truncate');
        const buttonVariant = (channel.id === activeChannelId ? 'secondary' : 'light');
        if (!channel.removable) {
          return (
            <ButtonGroup className="d-flex" key={channel.id}>
              <Button
                type="button"
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
          <Dropdown as={ButtonGroup} id="dropdown" className="d-flex" key={channel.id}>
            <Button
              type="button"
              variant={buttonVariant}
              className={btnClasses}
              onClick={() => setActiveChannelId(channel.id)}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
            <Dropdown.Toggle split className="flex-grow-0" variant={buttonVariant}>
              <span className="visually-hidden">{t('channels.management')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="1" onClick={() => openModal('remove', channel)}>{t('channels.remove')}</Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={() => openModal('rename', channel)}>{t('channels.rename')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
      })}
    </ButtonToolbar>
  );
};

export default RenderChannels;
