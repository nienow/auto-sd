import {TagParser} from './abstract-tag-parser';
import fs from 'fs-extra';
import {Tag, TagCat} from './tag';
import yaml from 'js-yaml';

export class YmlTagParser extends TagParser {
  parse(file: string): TagCat[] {

    const json = yaml.load(fs.readFileSync(file, 'utf8'));
    const cats = Object.entries(json).map(([catName, catValue]) => {
      const tags = (catValue as string[]).map((tag: any) => {
        const parts = tag?.split(';') || [];
        return new Tag(null, parts[0] || '', Number(parts[1] || 1), Number(parts[2] || 1));
      });
      return new TagCat(catName, tags);
    });
    return cats;
  }
}

export const getTagsInCategories = (modelJSON): TagCat[] => {
  const cats = Object.entries(modelJSON).map(([catName, catValue]) => {
    const tags = (catValue as string[]).map((tag: any) => {
      const parts = tag?.split(';') || [];
      return new Tag(null, parts[0] || '', Number(parts[1] || 1), Number(parts[2] || 1));
    });
    return new TagCat(catName, tags);
  });
  return cats;
};
