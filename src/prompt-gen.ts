import {ENV, getTAGS} from './env';

const TAGS = getTAGS();

export const generatePrompt = () => {
  const randomPart = Object.keys(TAGS).map((key) => {
    return randomValue(TAGS[key]);
  }).filter((str) => !!str).join(',');
  console.log('Generating', randomPart);

  return randomPart;
};

export const generateNegative = () => {
  return ENV.BASE_NEG;
};

const randomValue = (obj) => {
  while (true) {
    const prop = randomProperty(obj);
    const randomWeight = Math.random();
    const weight = prop[2] || 1;
    if (weight > randomWeight) {
      return propToTag(prop);
    }
  }
};

const propToTag = (prop: any) => {
  if (!prop[0]) {
    return '';
  }
  if (prop.length > 1 && prop[1] !== 1) {
    return prop[0].split(',').map(part => `(${part}: ${prop[1]})`).join(',');
  } else {
    return prop[0];
  }
};

const randomProperty = (obj) => {
  const keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];

};
