import {TagParser} from './abstract-tag-parser';
import fs from 'fs-extra';
import {Tag, TagCat} from './tag';

export class JsonTagParser extends TagParser {
  parse(file: string): TagCat[] {
    const json = JSON.parse(fs.readFileSync(file, {encoding: 'utf8'}));
    const cats = Object.entries(json).map(([catName, catValue]) => {
      const tags = Object.entries(catValue).map(([tagName, tagValue]) => {
        return new Tag(tagName, tagValue[0], tagValue[1] || 1, tagValue[2] || 1);
      });
      return new TagCat(catName, tags);
    });
    return cats;
  }
}
