import { AD_VIEWPORT_SIZES } from '../../app/components/GoogleAdSlot/GoogleAdSlot';

export const truncateByWordCount = (
  value: string,
  wordCount: number,
  append = '...'
) => {
  const pattern = new RegExp(`^(?:\\S+\\s){${wordCount - 1}}(\\S+)`, 'gm');
  const matches = pattern.exec(value);
  const match = matches ? matches[0] : undefined;
  const isMatchSameAsValue = match === value;
  return match && !isMatchSameAsValue ? `${match}${append}` : value;
};

export const getAdCutpoint = () => {
  if (!isBrowser()) {
    return 'large';
  }
  if (window.innerWidth >= AD_VIEWPORT_SIZES.LARGE[0]) {
    return 'large';
  }
  if (
    window.innerWidth >= AD_VIEWPORT_SIZES.MEDIUM[0] &&
    window.innerWidth < AD_VIEWPORT_SIZES.LARGE[0]
  ) {
    return 'medium';
  }
  return 'small';
};

export const isBrowser = () => typeof window !== 'undefined';
