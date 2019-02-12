import getConfig, { setConfig } from 'next/config';
import addSiteConfig from './addSiteConfig';

jest.mock('next/config', () => ({
  __esModule: true,
  setConfig: jest.fn(),
  default: jest.fn()
}));

describe('addSiteConfig()', () => {
  const DEFUALT_SITE_CONFIG = {
    siteAlias: 'yorkregion'
  };

  const DEFAULT_PARAMS = {
    req: {
      headers: {
        host: 'yorkregion.com'
      }
    },
    res: {},
    next: jest.fn(value => value)
  };

  const mockApp: any = {
    renderOpts: {
      runtimeConfig: null
    }
  };

  const getMockedCache: any = () => {
    return {
      get: jest.fn(key => {
        return key === 'yorkregion.com' ? DEFUALT_SITE_CONFIG : null;
      })
    };
  };

  const getMockedParams: any = (props = {}) => {
    return {
      ...DEFAULT_PARAMS,
      ...props
    };
  };

  beforeEach(() => {
    jest.resetAllMocks();

    (getConfig as any).mockImplementation(() => ({
      publicRuntimeConfig: {},
      serverRuntimeConfig: {
        defaultHost: 'yorkregion.com'
      }
    }));
  });

  it('should throw error if host config file not found in cache', () => {
    (getConfig as any).mockImplementationOnce(() => ({
      publicRuntimeConfig: {},
      serverRuntimeConfig: {
        defaultHost: 'none'
      }
    }));
    const cache = getMockedCache();
    const { req, res, next } = getMockedParams({
      req: {
        headers: {
          host: 'nomatch'
        }
      }
    });
    const result = addSiteConfig(mockApp, cache)(req, res, next);
    expect(result).toBe(false);
  });

  it('should get cache with default host when header host is not found in cache', () => {
    const cache = getMockedCache();
    const { req, res, next } = getMockedParams({
      req: {
        headers: {
          host: 'none'
        }
      }
    });
    addSiteConfig(mockApp, cache)(req, res, next);
    expect(cache.get).toHaveBeenCalledWith('yorkregion.com');
  });

  it('should get cache with header host', () => {
    const cache = getMockedCache();
    jest.spyOn(cache, 'get').mockImplementationOnce(() => {
      return key => {
        return key === 'ottawavalley.com'
          ? { siteAlias: 'ottawavalley' }
          : null;
      };
    });
    const { req, res, next } = getMockedParams({
      req: {
        headers: {
          host: 'ottawavalley.com'
        }
      }
    });
    addSiteConfig(mockApp, cache)(req, res, next);
    expect(cache.get).toHaveBeenCalledWith('ottawavalley.com');
  });

  it('should set app.renderOpts.runtimeConfig', () => {
    const cache = getMockedCache();
    const { req, res, next } = getMockedParams();
    addSiteConfig(mockApp, cache)(req, res, next);
    expect(mockApp.renderOpts.runtimeConfig).toEqual({
      siteAlias: 'yorkregion'
    });
  });

  it('should call setConfig', () => {
    const cache = getMockedCache();
    const { req, res, next } = getMockedParams();
    addSiteConfig(mockApp, cache)(req, res, next);
    expect(setConfig).toHaveBeenCalledWith(
      expect.objectContaining({
        publicRuntimeConfig: {
          siteAlias: 'yorkregion'
        }
      })
    );
  });

  it('should call next()', () => {
    const cache = getMockedCache();
    const { req, res, next } = getMockedParams();
    addSiteConfig(mockApp, cache)(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});
