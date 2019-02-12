/**
 * apollo-client exposes a hook to allow for customizing the ids
 * that are used to normalize the in memory cache client side.
 * https://www.apollographql.com/docs/react/advanced/caching.html#normalization
 */
export const customDataIdFromObject = defaultDataIdFromObject => (
  object = {} as any
) => {
  switch (object.__typename) {
    case 'Article':
      return `${object.__typename}:${object.assetId}`;
    default:
      return defaultDataIdFromObject(object);
  }
};
