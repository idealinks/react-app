import nextjs from 'next';
import getConfig, { setConfig } from 'next/config';
import { getDomainFromHost } from '../lib/cacheUtils';
import { CacheClass } from 'memory-cache';
import { Request, Response, NextFunction } from 'express';

/**
 * This middleware will append the correct site config based on the
 * request's host header. The config datais pulled from memory cache
 * and will then be appended to next.js's publicRuntimeConfig to esnure
 * the app has access to it client side.
 */
const addSiteConfig = (
  app: nextjs.Server,
  cache: CacheClass<string, object>
) => (req: Request, res: Response, next: NextFunction) => {
  const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
  const siteDomain = getDomainFromHost(req.headers.host);
  const siteConfig =
    cache.get(siteDomain) || cache.get(serverRuntimeConfig.defaultHost);

  if (!siteConfig) {
    next(new Error(`Unable to load site config for host ${req.headers.host}`));
    return false;
  }

  const withSiteConfig = {
    ...publicRuntimeConfig,
    ...siteConfig
  };

  app.renderOpts.runtimeConfig = withSiteConfig;

  setConfig({
    serverRuntimeConfig,
    publicRuntimeConfig: withSiteConfig
  });

  next();
};

export default addSiteConfig;
