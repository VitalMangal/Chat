const apiPath = '/api/v1';

export default {
  usersPath: () => apiPath,
  loginPath: () => [apiPath, 'login'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
};