export class Group {
  key?: string;

  constructor(private name: string, private type: number = 1, private archived: boolean = false) {}

  setKey(key: string): Group {
    this.key = key;
    return this;
  }

  get data() {
    return {
      name: this.name,
      archived: this.archived,
      type: this.type
    };
  }
}
