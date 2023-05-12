import TAGS from '../data/tags.json';
import {ENV} from './env';

export const generatePrompt = () => {
  const randomPart = Object.keys(TAGS).map((key) => {
      return randomProperty(TAGS[key])[0];
  }).filter((str) => !!str).join(',');
    console.log('Generating', randomPart);


  return ENV.BASE_PROMPT + ',' + randomPart;
};

export const generateNegative = () => {
  return ENV.BASE_NEG;
};

const randomProperty = (obj) => {
    const keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};
