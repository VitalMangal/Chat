const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  changeChannelPath: (id) => [apiPath, 'channels', id].join('/'),
};