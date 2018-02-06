import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Todo } from '../../model/todo';

import { FirebaseDbService } from '../../service/firebase-db/firebase-db.service';
import { GroupService } from '../../service/group/group.service';

@Component({
  selector: 'app-todo-of-group',
  templateUrl: './todo-of-group.component.html',
  styleUrls: ['./todo-of-group.component.css'],
})
export class TodoOfGroupComponent implements OnInit, OnDestroy {
  todos: Todo[];
  myGroupKey: string;
  myGroupName: string;
  subscription: any;

  constructor(private route: ActivatedRoute, private router: Router, private db: FirebaseDbService, private group: GroupService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.myGroupKey = params['key'];
      this.subscription = this.db.getItems(`/todos/${this.myGroupKey}`, { query: { orderByChild: 'due' }}).subscribe((snapshots: any[]) => {
        this.todos = [];
        snapshots.forEach((snapshot: any) => {
          this.todos.push(new Todo(snapshot.title, this.myGroupKey, snapshot.due, snapshot.done).setKey(snapshot.$key));
        });
        this.myGroupName = this.group.getName(this.myGroupKey);
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addTodo(todo: Todo) {
    this.db.addItem(`todos/${todo.data.groupKey}`, todo.key, todo.data);
    if (todo.data.groupKey !== this.myGroupKey) {
      this.router.navigate([`/groups/${todo.data.groupKey}`]);
    }
  }

  updateTodo(todo: Todo) {
    if (todo.data.groupKey === this.myGroupKey) {
      this.db.updateItem(`todos/${todo.data.groupKey}`, todo.key, todo.data);
    } else {
      this.db.deleteItem(`todos/${this.myGroupKey}`, todo.key);
      this.db.addItem(`todos/${todo.data.groupKey}`, todo.key, todo.data);
      this.router.navigate([`/groups/${todo.data.groupKey}`]);
    }
  }

  deleteTodo(todo: Todo) {
    this.db.deleteItem(`todos/${todo.data.groupKey}`, todo.key);
  }

}
