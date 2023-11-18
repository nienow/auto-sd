import fs from 'fs-extra';

require('dotenv').config();

export const ENV = {
  VM_TYPE: process.env['VM_TYPE'] as 'gcp' | 'aws',
  OUTPUT: process.env['OUTPUT_DIR'],
  PROJECT: process.env['PROJECT_ID'],
  ZONE: process.env['ZONE_ID'],
  INSTANCE: process.env['INSTANCE_ID'],
  BASE_PROMPT: process.env['BASE_PROMPT'],
  BASE_NEG: process.env['BASE_NEGATIVE'],
  TAGS: process.env['TAGS_JSON'],
  MODELS: process.env['MODELS_JSON'],
  SETTINGS: process.env['SETTINGS_JSON'],
  WILDCARDS: process.env['WILDCARDS'],
  AWS_REGION: process.env['AWS_REGION'],
  AWS_LAUNCH_TEMPLATE: process.env['AWS_LAUNCH_TEMPLATE'],
};

// export const getTAGS = (): any => {
//   return JSON.parse(fs.readFileSync(ENV.TAGS, {encoding: 'utf8'}));
// };

export const getMODELS = (): any => {
  return JSON.parse(fs.readFileSync(ENV.MODELS, {encoding: 'utf8'}));
};
