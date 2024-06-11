import { useStorageGetItem } from '../hooks';

export default (headers) => {
  const userData = JSON.parse(useStorageGetItem());
  const { token } = userData;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};
