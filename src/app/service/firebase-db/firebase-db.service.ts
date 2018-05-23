import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators/switchMap';

@Injectable()
export class FirebaseDbService {

  constructor(private db: AngularFireDatabase) { }

  getItems(path: string, options: any) {
    let result;
    result = this.db.list(path, ref => ref.orderByChild(options.query.orderByChild).equalTo(options.query.equalTo)).snapshotChanges();
    return result;
  }

  getItem(path: string) {
    let result;
    result = this.db.object(path).snapshotChanges();
    return result;
  }

  addItem(path: string, key: string, data) {
    let result;
    if (key) {
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

  filterByPeriod(path: string, key: string) {
    return new DynamicQuery(this.db, path, key);
  }

}

class DynamicQuery {
  period$: BehaviorSubject<Period|null>;
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;

  constructor(db, path: string, key: string) {
    this.period$ = new BehaviorSubject(null);
    this.items$ = this.period$.pipe(
      switchMap(period =>
        db.list(path, ref =>
          period ? ref.orderByChild(key).startAt(period.startAt).endAt(period.endAt) : ref
        ).snapshotChanges()
      )
    );
  }
  filterBy(startAt: string, endAt: string) {
    const period = new Period(startAt, endAt);
    this.period$.next(period);
  }
}

class Period {
  startAt: string;
  endAt: string;
  constructor(startAt: string, endAt: string) {
    this.startAt = startAt;
    this.endAt = endAt;
  }
}
