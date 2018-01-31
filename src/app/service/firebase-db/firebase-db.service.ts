import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FirebaseDbService {

  constructor(private db: AngularFireDatabase) { }

  getItems(path: string, options: any) {
    let result;
    result = this.db.list(path, options);
    return result;
  }

  getItem(path: string) {
    let result;
    result = this.db.object(path);
    return result;
  }

  addItem(path: string, key: string, data) {
    let result;
    if(key) {
      result = this.db.object(path).update({[key]: data});
    } else {
      result = this.db.list(path).push(data);
    }
    return result;
  }

  updateItem(path: string, key: string, data) {
    let result;
    result = this.db.object(path).update({[key]: data});
    return result;
  }

  deleteItem(path: string, key: string) {
    let result;
    result = this.db.object(path).update({[key]: null});
    return result;
  }

}
