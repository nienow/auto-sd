import {ENV} from '../env';
import {CsvTagParser} from './csv-tag-parser';
import {TagParser} from './abstract-tag-parser';
import {JsonTagParser} from './json-tag-parser';
import {TagCat} from './tag';

export const getTagsInCategories = (): TagCat[] => {
  const fileName = ENV.TAGS;
  let parser: TagParser;
  if (fileName.endsWith('.csv')) {
    parser = new CsvTagParser();
  } else {
    parser = new JsonTagParser();
  }
  return parser.parse(fileName);
}
