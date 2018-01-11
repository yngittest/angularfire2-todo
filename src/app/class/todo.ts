export class Todo {
  key?: string;

  constructor(private title: string, private groupKey: string, private due: number = null, private done: boolean = false) {}

  setKey(key: string): Todo {
    this.key = key;
    return this;
  }

  get data() {
    return {
      title: this.title,
      groupKey: this.groupKey,
      done: this.done,
      due: this.due
    };
  }

}
