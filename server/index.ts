import path from 'path';
import express from 'express';
import nextjs from 'next';
import logger from './logger';
import cache, { CacheClass } from 'memory-cache';
import { cacheSiteConfigFiles } from './lib/cacheUtils';
import addSiteConfig from './middleware/addSiteConfig';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = nextjs({ dev });
const handle = app.getRequestHandler();
const siteConfigCache: CacheClass<string, object> = new cache.Cache();

const PATH_SITE_CONFIG_DIR =
  process.env.NODE_ENV === 'production' ? '../../config' : '../config';

process
  .on('unhandledRejection', (reason, p) => {
    logger.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    logger.error(err.message);
    process.exit(1);
  });

const init = async () => {
  await app.prepare();

  /**
   * Load all the site config files into memory.
   * This way they can be quickly retrieved upon request.
   */
  await cacheSiteConfigFiles({
    cache: siteConfigCache,
    configDirPath: path.join(__dirname, PATH_SITE_CONFIG_DIR)
  });

  const server = express();

  server.use(addSiteConfig(app, siteConfigCache));

  server.get('/*-static/:id', (req, res) => {
    logger.info(
      `received request pattern '/*-static/:id' from host ${req.host}`
    );
    const actualPage = '/static-page';
    const queryParams = { id: req.params.id };
    app.render(req, res, actualPage, queryParams);
  });

  server.get('/*-news/:id', (req, res) => {
    logger.info(`received request pattern '/*-news/:id' from host ${req.host}`);
    const actualPage = '/subcategory-news-landing-page';
    const queryParams = { id: req.params.id };
    app.render(req, res, actualPage, queryParams);
  });

  server.get('*', (req, res) => {
    logger.info(`received request pattern '*' from host ${req.host}`);
    return handle(req, res);
  });

  server.listen(port, '0.0.0.0', err => {
    if (err) {
      throw err;
    }
    logger.info(`🚀 Ready on http://localhost:${port}`);
  });
};

try {
  init();
} catch (err) {
  logger.error(err, 'Unable to init next server');
  process.exit(1);
}
