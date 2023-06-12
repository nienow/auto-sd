import {TagCat} from './tag';

export abstract class TagParser {
  public abstract parse(file: string): TagCat[];
}
