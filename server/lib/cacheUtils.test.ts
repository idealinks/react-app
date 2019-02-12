import mockFs from 'mock-fs';
import * as utils from './cacheUtils';

describe('cacheUtils', () => {
  beforeEach(() => {
    mockFs({
      '/test/get/config/files': {
        'site.config1.json': 'Test',
        'site.config2.json': 'Test'
      }
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  describe('getSiteConfigFiles()', () => {
    it('should throw error if call fails', () => {
      expect.assertions(1);
      return utils
        .getSiteConfigFiles('/bad/path')
        .catch(e =>
          expect(e.message).toMatch('Unable to read site config directory')
        );
    });

    it('should return list of config file names', async () => {
      const result = await utils.getSiteConfigFiles('/test/get/config/files');
      expect(result).toEqual(['site.config1.json', 'site.config2.json']);
    });
  });

  describe('cacheSiteConfigFiles()', () => {
    it('should throw error when invalid configDirPath passed', () => {
      expect.assertions(1);
      const cacheMock: any = { put: jest.fn() };
      return utils
        .cacheSiteConfigFiles({
          configDirPath: '/bad/path',
          cache: cacheMock
        })
        .catch(e =>
          expect(e.message).toMatch('Unable to read site config directory')
        );
    });

    // The mock-fs doesn't seem to work with promisified fs methods
    // see issue https://github.com/tschaub/mock-fs/issues/254
    // Need to either mock out fs ourselves or find a replacement if this doesn't get fixed
    it.skip('should throw error when unable to read site config file', () => {
      expect.assertions(1);
      const cacheMock: any = { put: jest.fn() };
      return utils
        .cacheSiteConfigFiles({
          configDirPath: '/test/get/config/files',
          cache: cacheMock
        })
        .catch(e => {
          console.log(e);
          expect(e.message).toMatch('Unable to read site config file');
        });
    });

    it.skip('should be awesome', async () => {
      const cacheMock: any = { put: jest.fn() };
      await utils.cacheSiteConfigFiles({
        configDirPath: '/test/get/config/files',
        cache: cacheMock
      });
    });
  });

  describe('getDomainFromHost()', () => {
    it('should remove subdomain from host', () => {
      const domains = [
        'qa1.yorkregion.com',
        'uat-testing.yorkregion.com',
        'www.yorkregion.com'
      ];
      domains.forEach(domain => {
        const result = utils.getDomainFromHost(domain);
        expect(result).toEqual('yorkregion.com');
      });
    });

    it('should return host untouched if host is unsupported format', () => {
      const result = utils.getDomainFromHost('sfasfasdf');
      expect(result).toEqual('sfasfasdf');
    });

    it('should return host untouched if no subdomain', () => {
      const result = utils.getDomainFromHost('yorkregion.com');
      expect(result).toEqual('yorkregion.com');
    });
  });
});
