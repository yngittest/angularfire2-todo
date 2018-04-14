export class Group {
  key?: string;

  constructor(
    public name: string,
    public type: number = 1,
    public archived: boolean = false
  ) {}

  setKey(key: string): Group {
    this.key = key;
    return this;
  }

  get data() {
    return {
      name: this.name,
      type: this.type,
      archived: this.archived
    };
  }
}
