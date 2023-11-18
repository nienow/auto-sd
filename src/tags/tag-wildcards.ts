import {ENV} from '../env';
import fs from 'fs-extra';
import yaml from 'js-yaml';

const doc = yaml.load(fs.readFileSync(ENV.WILDCARDS, 'utf8'));

export const replaceWildcard = (key: string) => {
  let obj = doc;
  let keys = key.split('.');
  for (let i = 0; i < keys.length; i++) {
    obj = obj[keys[i]];
    if (obj === undefined) {
      return undefined;
    }
  }
  if (Array.isArray(obj)) {
    return obj[obj.length * Math.random() << 0];
  } else {
    return obj;
  }
};
