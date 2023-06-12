// export type Tag = {text: string; weight: number; probability: number};

export class TagCat {
  constructor(public name: string, public tags: Tag[]) {}

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
  constructor(public name: string, text: string, public weight: number, public probability: number) {
    this.parts = text.split(',').map(part => part.trim());
  }

  public isWildcard() {
    return this.parts[0] === '*';
  }

  public getOutput() {
    if (this.isWildcard()) {
      return '';
    }
    if (this.parts.length > 1 && this.weight !== 1) {
      return this.parts.map(part => `(${part}: ${this.weight})`).join(',');
    } else {
      return this.parts.join(',');
    }
  }
}
