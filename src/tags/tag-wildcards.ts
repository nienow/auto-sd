import fs from 'fs-extra';
import yaml from 'js-yaml';
import {basePath, getFile, settings} from '../settings';
import sizeOf from 'image-size';

const doc = yaml.load(getFile(settings.wildcards));

export const replaceWildcard = (key: string) => {
  let obj = doc;
  const keys = key.split('.');

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

export const getPose = (key: string) => {
  const keys = key.split('.');
  const filePath = `${basePath}/${settings.poses}/${keys[0]}/${keys[1]}.png`;
  const dimensions = sizeOf(filePath);
  const buf = fs.readFileSync(filePath);
  return [keys[0], Buffer.from(buf).toString('base64'), dimensions];
};
