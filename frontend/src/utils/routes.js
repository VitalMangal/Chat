const apiPath = '/api/v1';

export default {
  usersPath: () => apiPath,
  messagesPath: () => [apiPath, 'messages'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
};
