import { getStorageItem } from './localStorageFunctions';

export default (headers) => {
  const userData = JSON.parse(getStorageItem());
  const { token } = userData;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};
