export const generateSettings = (settingsConfig: any = {}) => {
  const settings: any = {};
  Object.keys(settingsConfig).forEach(key => {
    const value = settingsConfig[key] as any;
    if (typeof value === 'object') {
      if (value.range) {
        if (value.type === 'int') {
          settings[key] = getRandomIntBetween(value.range[0], value.range[1]);
        } else {
          settings[key] = getRandomValueBetween(value.range[0], value.range[1]);
        }
      } else if (value.choices) {
        settings[key] = randomItemInArray(value.choices);
      } else {
        throw 'Unhandled setting: ' + key;
      }
    } else {
      settings[key] = value;
    }
  });
  return settings;
};

const getRandomValueBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getRandomIntBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomItemInArray = (arr) => {
  return arr[arr.length * Math.random() << 0];
};
