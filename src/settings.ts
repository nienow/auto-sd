import {ENV} from './env';
import yaml from 'js-yaml';
import fs from 'fs-extra';
import path from 'path';

export const basePath = path.dirname(ENV.SETTINGS);
export const settings: Settings = yaml.load(fs.readFileSync(ENV.SETTINGS, 'utf8'));

export type Settings = {
  vm: string,
  awsRegion: string,
  awsInstance: string,
  gcpZone: string,
  gcpInstance: string,
  gcpProject: string,
  negative: string,
  model: string,
  wildcards: string,
  poses: string,
  runs: number,
  port: string,
};

export const getFile = (fileName: string) => {
  return fs.readFileSync(path.join(basePath, fileName));
};
