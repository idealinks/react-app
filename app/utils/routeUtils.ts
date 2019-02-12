import getConfig from 'next/config';

export const getRouteIdFromPath = (path: string, pattern: RegExp) => {
  const match = pattern.exec(path);
  return match ? match[1] : null;
};

export const formatPageRouteWithId = (baseUrl: string) => (
  path: string,
  pattern: RegExp
) => {
  return path.replace(pattern, (match, p1) => `${baseUrl}?id=${p1}`);
};

export const getATagPropsFromData = data => {
  return {
    rel: data.noFollow === true ? 'nofollow' : undefined,
    target: data.openNewWindow === true ? '_blank' : undefined
  };
};

export const getNewsLandingUrl = () => {
  const { publicRuntimeConfig } = getConfig();
  return `/${publicRuntimeConfig.majorLocationAlias}-news`;
};

export const getNewsletterSignupUrl = () => {
  const { publicRuntimeConfig } = getConfig();
  return publicRuntimeConfig.newsletterSignupUrl;
};

export const getLoginUrl = () => {
  return '/user/login/';
};

export const getSubscriptionUrl = () => {
  return '/subscribe/';
};

export const removeTrailingSlash = (value: string) => {
  const trimmedValue = value.trim();
  const lastIndexOfSlash = trimmedValue.lastIndexOf('/');
  const hasTrailingSlash = lastIndexOfSlash === trimmedValue.length - 1;
  return hasTrailingSlash && lastIndexOfSlash > 0
    ? value.substring(0, trimmedValue.length - 1)
    : value;
};
