import * as moment from 'moment';

export class Todo {
  key?: string;

  constructor(private title: string, private done: boolean = false, private due: number = +moment()) {
  }

  setKey(value: any): Todo {
    this.key = value.$key
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
