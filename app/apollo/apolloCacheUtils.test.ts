import { defaultDataIdFromObject } from 'apollo-boost';
import { customDataIdFromObject } from './apolloCacheUtils';

describe('apolloCacheUtils', () => {
  describe('customDataIdFromObject()', () => {
    it('should return null if object.__typename not defined', () => {
      const result = customDataIdFromObject(defaultDataIdFromObject)({
        id: '100'
      });
      expect(result).toEqual(null);
    });

    it('should use defaultDataIdFromObject if no match found for object.__typename', () => {
      const result = customDataIdFromObject(defaultDataIdFromObject)({
        id: '100',
        __typename: 'test'
      });
      expect(result).toEqual('test:100');
    });

    it('should use assetId when object.__typename=Article', () => {
      const result = customDataIdFromObject(defaultDataIdFromObject)({
        assetId: '100',
        __typename: 'Article'
      });
      expect(result).toEqual('Article:100');
    });
  });
});
