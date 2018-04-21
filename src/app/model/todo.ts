export class Todo {
  title: string;
  groupKey: string;
  due: string;
  repeatType: number;
  repeatInterval: number;
  repeatUnit: string;
  done: boolean;
  completed: string;

  key?: string;
  beforeGroupKey?: string;

  constructor(object: any) {
    this.title = object.title;
    this.groupKey = object.groupKey;
    this.due = object.due || null;
    this.repeatType = object.repeatType || 0;
    this.repeatInterval = object.repeatInterval || null;
    this.repeatUnit = object.repeatUnit || null;
    this.done = object.done || false;
    this.completed = object.completed || null;
  }

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
      repeatType: this.repeatType,
      repeatInterval: this.repeatInterval,
      repeatUnit: this.repeatUnit,
      due: this.due,
      completed: this.completed
    };
  }

}
