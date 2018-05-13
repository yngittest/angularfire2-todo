import * as moment from 'moment';

export class Todo {
  title: string;
  groupKey: string;
  due: string;
  assignee: string;
  repeatType: number;
  repeatInterval: number;
  repeatUnit: string;
  done: boolean;
  completed: string;
  completedBy: string;

  key?: string;
  beforeGroupKey?: string;

  constructor(object: any) {
    this.title = object.title;
    this.groupKey = object.groupKey;
    this.due = object.due || null;
    this.assignee = object.assignee || null;
    this.repeatType = object.repeatType || 0;
    this.repeatInterval = object.repeatInterval || null;
    this.repeatUnit = object.repeatUnit || null;
    this.done = object.done || false;
    this.completed = object.completed || null;
    this.completedBy = object.completedBy || null;
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
      assignee: this.assignee,
      repeatType: this.repeatType,
      repeatInterval: this.repeatInterval,
      repeatUnit: this.repeatUnit,
      due: this.due,
      completed: this.completed,
      completedBy: this.completedBy
    };
  }

  update(userId: string): Todo {
    this.completed = this.done ? moment().format('YYYY-MM-DDTHH:mm') : null;
    this.completedBy = this.done ? userId : null;
    return this;
  }

  repeat(): Todo {
    let newDue;
    switch(this.repeatType) {
      case 0:
        return null;
      case 1:
        newDue = moment(this.due);
        break;
      case 2:
        newDue = moment(this.completed);
        const originDue = moment(this.due);
        newDue.hours(originDue.get('hour'));
        newDue.minutes(originDue.get('minute'));
        newDue.seconds(0);
        break;
      default:
        return null;
    }
    newDue.add(this.repeatInterval, this.repeatUnit);

    this.due = newDue.format('YYYY-MM-DDTHH:mm');
    this.done = false;
    this.completed = null;
    this.completedBy = null;

    return this;
  }

}
