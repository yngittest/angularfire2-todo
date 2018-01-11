import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseService {
  items: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) { }

  getItems(path: string, options: any): FirebaseListObservable<any[]> {
    this.items = this.db.list(path, options);
    return this.items;
  }

  addItem(item) {
    this.items.push(item);
  }

  updateItem(item) {
    this.items.update(item.key, item.data);
  }

  deleteItem(item) {
    this.items.remove(item.key);
  }
}
