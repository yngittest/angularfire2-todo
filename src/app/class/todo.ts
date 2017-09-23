import * as moment from 'moment';

export class Todo {

  constructor(private title: string, private done: boolean = false, private due: number = +moment()) {
  }

}
