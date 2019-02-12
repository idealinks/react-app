import * as utils from './routeUtils';
import { URL_MATCH_PATTERNS } from '../components/AppLink/AppLink';

jest.mock('next/config', () => {
  return () => ({
    publicRuntimeConfig: {
      majorLocationAlias: 'yorkregion',
      newsletterSignupUrl:
        '/community-static/4220553-york-region-newsletter-sign-up/'
    }
  });
});

describe('routeUtils', () => {
  describe('getRouteIdFromPath()', () => {
    it('should return null if no static content id found', () => {
      const result = utils.getRouteIdFromPath(
        '/news-static/york-region-about-us/',
        URL_MATCH_PATTERNS.staticPage
      );
      expect(result).toBe(null);
    });

    it('should return the static content id', () => {
      const result = utils.getRouteIdFromPath(
        '/news-static/1491353-york-region-about-us/',
        URL_MATCH_PATTERNS.staticPage
      );
      expect(result).toBe('1491353');
    });
  });

  describe('formatPageRouteWithId()', () => {
    it("should return unchanged path if path isn't valid static page route", () => {
      const result = utils.formatPageRouteWithId('/')(
        '/test',
        URL_MATCH_PATTERNS.staticPage
      );
      expect(result).toBe('/test');
    });

    it('should return path in the following format /static-page?{id}', () => {
      const result = utils.formatPageRouteWithId('/static-page')(
        '/news-static/1491353-york-region-about-us/',
        URL_MATCH_PATTERNS.staticPage
      );
      expect(result).toEqual('/static-page?id=1491353');
    });

    it('should not mutate original object', () => {
      const router = { asPath: '/news-static/1491353-york-region-about-us/' };
      utils.formatPageRouteWithId('/static-page')(
        router.asPath,
        URL_MATCH_PATTERNS.staticPage
      );
      expect(router.asPath).toEqual(
        '/news-static/1491353-york-region-about-us/'
      );
    });
  });

  describe('getATagPropsFromData()', () => {
    it('should return rel="nofollow" if noFollow = true', () => {
      const results = utils.getATagPropsFromData({
        noFollow: true
      });
      expect(results).toEqual({
        rel: 'nofollow'
      });
    });

    it('should return rel=undefined if noFollow != true', () => {
      const results = utils.getATagPropsFromData({
        noFollow: false
      });
      expect(results).toEqual({
        rel: undefined
      });
    });

    it('should return target="_blank" if openNewWindow = true', () => {
      const results = utils.getATagPropsFromData({
        openNewWindow: true
      });
      expect(results).toEqual({
        target: '_blank'
      });
    });

    it('should return target="_blank" if openNewWindow != true', () => {
      const results = utils.getATagPropsFromData({
        openNewWindow: false
      });
      expect(results).toEqual({
        target: undefined
      });
    });
  });

  describe('getNewsLandingUrl()', () => {
    it('should return news landing url for current region', () => {
      const result = utils.getNewsLandingUrl();
      expect(result).toBe('/yorkregion-news');
    });
  });

  describe('getNewsletterSignupUrl()', () => {
    it('should return newsletter signup url for current region', () => {
      const result = utils.getNewsletterSignupUrl();
      expect(result).toBe(
        '/community-static/4220553-york-region-newsletter-sign-up/'
      );
    });
  });

  describe('removeTrailingSlash()', () => {
    it('should not modify string if last character is not /', () => {
      const result = utils.removeTrailingSlash('/test/one/two');
      expect(result).toBe('/test/one/two');
    });

    it('should remove trailing / from string', () => {
      const result = utils.removeTrailingSlash('/test/one/two/');
      expect(result).toBe('/test/one/two');
    });

    it('should remove trailing / from string event with whitespace at end', () => {
      const result = utils.removeTrailingSlash('/test/one/two/    ');
      expect(result).toBe('/test/one/two');
    });

    it('should not remove / if that is only character in string', () => {
      const result = utils.removeTrailingSlash('/');
      expect(result).toBe('/');
    });
  });
});
