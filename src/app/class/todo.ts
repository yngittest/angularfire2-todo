export class Todo {
  key?: string;

  constructor(private title: string, private done: boolean = false, private due = null) {}

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
