export class Group {
  key?: string;

  constructor(private name: string, private archived: boolean = false, private type: number = 0) {}

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
