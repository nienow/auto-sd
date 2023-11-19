// export type Tag = {text: string; weight: number; probability: number};

import {getPose, replaceWildcard} from './tag-wildcards';

export class TagCat {
  constructor(public name: string, public tags: Tag[]) {
  }

  public randomTagByProbability() {
    while (true) {
      const tag = this.randomTag();
      if (tag.probability > Math.random()) {
        return tag;
      }
    }
  }

  public randomTag() {
    return this.tags[this.tags.length * Math.random() << 0];
  }
}

export class Tag {
  private parts: string[];
  public pose: string[];

  constructor(public name: string, text: string, public weight: number, public probability: number) {
    this.parts = text.split(',').map(part => {
      return part.trim().replace(/\[pose\.(.*?)\]/g, (_, p1) => {
        this.pose = getPose(p1);
        return '';
      });
    }).filter(part => !!part);
  }

  public getOutput() {
    // replace variables
    const parts = this.parts.map(part => {
      return part.replace(/\[(.*?)\]/g, (_, p1) => {
        return replaceWildcard(p1);
      });
    });

    if (parts.length > 1 && this.weight !== 1) {
      return parts.map(part => `(${part}: ${this.weight})`).join(',');
    } else {
      return parts.join(',');
    }
  }
}
