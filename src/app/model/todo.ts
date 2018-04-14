export class Todo {
  key?: string;
  beforeGroupKey?: string;

  constructor(
    public title: string,
    public groupKey: string,
    public due: number = null,
    public done: boolean = false,
    public completed: number = null
  ) {}

  setKey(key: string): Todo {
    this.key = key;
    return this;
  }

  setBeforeGroupKey(key: string): Todo {
    this.beforeGroupKey = key;
    return this;
  }

  get data() {
    return {
      title: this.title,
      groupKey: this.groupKey,
      done: this.done,
      due: this.due,
      completed: this.completed
    };
  }

}
