import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { CacheClass } from 'memory-cache';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

export const getSiteConfigFiles = async (configDirPath: string) => {
  try {
    const files = await readdir(configDirPath);
    return files;
  } catch (err) {
    throw new Error(`Unable to read site config directory ${configDirPath}`);
  }
};

export const cacheSiteConfigFiles = async ({
  cache,
  configDirPath
}: {
  cache: CacheClass<string, object>;
  configDirPath: string;
}) => {
  const fileNames = await getSiteConfigFiles(configDirPath);
  for (const file of fileNames) {
    try {
      const key = file.replace('.json', '');
      const value = await readFile(path.join(configDirPath, file), 'utf8');
      const jsonValue = JSON.parse(value);
      cache.put(key, jsonValue);
    } catch (err) {
      throw new Error(`Unable to read site config file ${file}`);
    }
  }
};

export const getDomainFromHost = (host: string) => {
  const pattern = /^(.+?\.)?(.+\..+)$/gi;
  const matches = pattern.exec(host);
  const subdomain = matches ? matches[1] : undefined;
  return subdomain ? host.replace(subdomain, '') : host;
};
