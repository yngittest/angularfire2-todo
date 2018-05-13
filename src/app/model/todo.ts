import * as moment from 'moment';

export class Todo {
  title: string;
  groupKey: string;
  due: string;
  assignee: string;
  repeatType: number;
  repeatDay: Object;
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
    this.repeatDay = object.repeatDay || null;
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
      repeatDay: this.repeatDay,
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
    const originDue = moment(this.due);
    switch(this.repeatType) {
      case 0:
        return null;
      case 1:
        const now = moment();
        newDue = now.isBefore(this.due) ? originDue : now;
        const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        do {
          newDue.add(1, 'days');
        } while(Object.keys(this.repeatDay).indexOf(week[newDue.day()]) === -1);
        newDue.hours(originDue.get('hour'));
        newDue.minutes(originDue.get('minute'));
        newDue.seconds(0);
        break;
      case 2:
        newDue = moment(this.due);
        newDue.add(this.repeatInterval, this.repeatUnit);
        break;
      case 3:
        newDue = moment(this.completed);
        newDue.hours(originDue.get('hour'));
        newDue.minutes(originDue.get('minute'));
        newDue.seconds(0);
        newDue.add(this.repeatInterval, this.repeatUnit);
        break;
      default:
        return null;
    }

    this.due = newDue.format('YYYY-MM-DDTHH:mm');
    this.done = false;
    this.completed = null;
    this.completedBy = null;

    return this;
  }

}
