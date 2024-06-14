const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN ?? 'emptyToken',
  environment: 'production',
};

export default rollbarConfig;
