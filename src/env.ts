require("dotenv").config();

export const ENV = {
  OUTPUT: process.env['OUTPUT_DIR'],
  PROJECT: process.env['PROJECT_ID'],
  ZONE: process.env['ZONE_ID'],
  INSTANCE: process.env['INSTANCE_ID'],
  BASE_PROMPT: process.env['BASE_PROMPT'],
  BASE_NEG: process.env['BASE_NEGATIVE'],
};
