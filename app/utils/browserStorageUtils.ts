import Cookies from 'js-cookie';

export const getUserId = () => {
  let uuid = null;
  const profile = localStorage.getItem('janrainCaptureProfileData');
  if (profile) {
    uuid = JSON.parse(profile).uuid;
  }
  if (!uuid) {
    uuid = Cookies.get('janrainUuid');
  }
  return uuid;
};

export const getUserFullName = () => {
  return Cookies.get('userFullName');
};
