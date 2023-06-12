import {readFileSync} from 'fs-extra';
import {Tag, TagCat} from './tag';

export class CsvTagParser {
  public parse(file: string): TagCat[] {
    const cats = [];
    const data = readFileSync(file, {encoding: 'utf-8'});
    const lines = data.split(/\r?\n/);
    let catTags = [];
    const pushCat = () => {
      if (catTags.length > 0) {
        cats.push(new TagCat(null, catTags));
        catTags = [];
      }
    };
    lines.forEach(rawLine => {
      const line = rawLine.trim();
      if (!line) {
        pushCat();
      } else {
        const parts = line.split(';');
        catTags.push(new Tag(null, parts[0], Number(parts[1] || 1), Number(parts[2] || 1)));
      }
    });
    pushCat();
    return cats;
  }
}
