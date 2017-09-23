import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseService {
  items: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) { }

  getItems(url: string): FirebaseListObservable<any[]> {
    this.items = this.db.list(url);
    return this.items;
  }

  addItem(item) {
    this.items.push(item);
  }

  updateItem(item) {
    this.items.update(item.key, item.data).then( () => {
      console.log('更新しました');
    });
  }

  deleteItem(item) {
    this.items.remove(item.key).then(() => {
      console.log('削除しました');
    });
  }
}
