import * as utils from './generalUtils';

const setWindowWidth = width => {
  (global as any).window = {
    innerWidth: width
  };
};

describe('generalUtils', () => {
  describe('truncate()', () => {
    const longValue =
      'Students at St. Theresa of Lisieux Catholic High School helped raise more than 18,000 food and winter clothing items for homeless people in Toronto and around York Region at its annual event.';
    const shortValue =
      'Students at St. Theresa of Lisieux Catholic High School helped raise more than 18,000 food and winter clothing items for';

    it('should return unchanged value if word count is less than wordCount', () => {
      const result = utils.truncateByWordCount(shortValue, 25);
      expect(result).toEqual(shortValue);
    });

    it('should return the value truncated by word count', () => {
      const result = utils.truncateByWordCount(longValue, 4);
      expect(result).toEqual(`Students at St. Theresa...`);
    });

    it('should not truncate if value word count = wordCount', () => {
      const result = utils.truncateByWordCount(shortValue, 20);
      expect(result).toEqual(shortValue);
    });

    it('should append truncated text with provided append argument', () => {
      const result = utils.truncateByWordCount(longValue, 4, '--');
      expect(result).toEqual(`Students at St. Theresa--`);
    });
  });

  describe('getAdCutpoint', () => {
    it('should return large if not run from browser', () => {
      (global as any).window = undefined;
      const result = utils.getAdCutpoint();
      expect(result).toBe('large');
    });

    it('should return small cutpoint', () => {
      [320, 560, 767].forEach(width => {
        setWindowWidth(width);
        const result = utils.getAdCutpoint();
        expect(result).toBe('small');
      });
    });

    it('should return medium cutpoint', () => {
      [768, 960, 1023].forEach(width => {
        setWindowWidth(width);
        const result = utils.getAdCutpoint();
        expect(result).toBe('medium');
      });
    });

    it('should return large cutpoint', () => {
      [1024, 1100, 1200].forEach(width => {
        setWindowWidth(width);
        const result = utils.getAdCutpoint();
        expect(result).toBe('large');
      });
    });
  });

  describe('isBrowser', () => {
    it('should return false when window is undefined', () => {
      (global as any).window = undefined;
      const result = utils.isBrowser();
      expect(result).toBe(false);
    });

    it('should return true when window is defined', () => {
      (global as any).window = {};
      const result = utils.isBrowser();
      expect(result).toBe(true);
    });
  });
});
