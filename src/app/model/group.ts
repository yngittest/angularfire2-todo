export class Group {
  name: string;
  type: number;
  archived: boolean;
  members: any;

  key?: string;

  constructor(object: any) {
    this.name = object.name;
    this.type = object.type === 0 ? 0 : 1;
    this.archived = object.archived || false;
    this.members = object.members || null;
  }

  setKey(key: string): Group {
    this.key = key;
    return this;
  }

  get data() {
    return {
      name: this.name,
      type: this.type,
      archived: this.archived,
      members: this.members
    };
  }
}
