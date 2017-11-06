export class Todo {
  key?: string;

  constructor(private title: string, private due = null, private done: boolean = false) {}

  setKey(key: string): Todo {
    this.key = key;
    return this;
  }

  get data() {
    return {
      title: this.title,
      done: this.done,
      due: this.due
    };
  }

}
