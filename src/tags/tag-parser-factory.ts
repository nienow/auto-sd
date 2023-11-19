import {ENV} from '../env';
import {CsvTagParser} from './csv-tag-parser';
import {TagParser} from './abstract-tag-parser';
import {JsonTagParser} from './json-tag-parser';
import {TagCat} from './tag';
import {YmlTagParser} from './yml-tag-parser';

export const getTagsInCategories = (): TagCat[] => {
  const fileName = ENV.TAGS;
  let parser: TagParser;
  if (fileName.endsWith('.csv')) {
    parser = new CsvTagParser();
  } else if (fileName.endsWith('.yml')) {
    parser = new YmlTagParser();
  } else {
    parser = new JsonTagParser();
  }
  return parser.parse(fileName);
};
