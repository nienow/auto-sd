import fs from 'fs-extra';

require("dotenv").config();

export const ENV = {
  OUTPUT: process.env['OUTPUT_DIR'],
  PROJECT: process.env['PROJECT_ID'],
  ZONE: process.env['ZONE_ID'],
  INSTANCE: process.env['INSTANCE_ID'],
  BASE_PROMPT: process.env['BASE_PROMPT'],
  BASE_NEG: process.env['BASE_NEGATIVE'],
  TAGS: process.env['TAGS_JSON'],
  MODELS: process.env['MODELS_JSON'],
};

export const getTAGS = (): any => {
  return JSON.parse(fs.readFileSync(ENV.TAGS, {encoding: 'utf8'}));
};

export const getMODELS = (): any => {
  return JSON.parse(fs.readFileSync(ENV.MODELS, {encoding: 'utf8'}));
};
