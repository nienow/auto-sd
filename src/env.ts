require('dotenv').config();

export const ENV = {
  SETTINGS: process.env['SETTINGS'],
  OUTPUT: process.env['OUTPUT_DIR'],
};
