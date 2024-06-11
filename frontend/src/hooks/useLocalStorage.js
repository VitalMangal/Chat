const defaultIdentifier = 'userData';

const useStorageGetItem = (identifier = defaultIdentifier) => localStorage.getItem(identifier);

const useStorageSetItem = (data, identifier = defaultIdentifier) => (
  localStorage.setItem(identifier, JSON.stringify(data)));

const useStorageRemoveItem = (identifier = defaultIdentifier) => (
  localStorage.removeItem(identifier));

export { useStorageGetItem, useStorageSetItem, useStorageRemoveItem };
