import * as browserStorageUtil from './browserStorageUtils';

export const isUserLoggedIn = () => {
  const userId = browserStorageUtil.getUserId();
  return userId && userId != null;
};

export const getUserFullName = () => {
  return browserStorageUtil.getUserFullName();
};

export const getUserId = () => {
  return browserStorageUtil.getUserId();
};
