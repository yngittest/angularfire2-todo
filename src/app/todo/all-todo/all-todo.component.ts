import { Component, OnInit } from '@angular/core';

import { Todo } from '../../model/todo';

import { AuthService } from '../../service/auth/auth.service';
import { FirebaseDbService } from '../../service/firebase-db/firebase-db.service';

@Component({
  selector: 'app-all-todo',
  templateUrl: './all-todo.component.html',
  styleUrls: ['./all-todo.component.css']
})
export class AllTodoComponent implements OnInit {
  userId: string;
  todos: Todo[];

  constructor(private auth: AuthService, private db: FirebaseDbService) { }

  ngOnInit() {
    this.auth.uid$.subscribe(uid => {
      this.userId = uid;
      this.db.getItem(`/users/${this.userId}`)
        .map(user => {
          const groupFBObjList = [];
          const groupKeys = Object.keys(user.groups);
          groupKeys.forEach(groupKey => {
            groupFBObjList.push(this.db.getItem(`/todos/${groupKey}`));
          });
          return groupFBObjList;
        })
        .subscribe(groupFBObjList => {
          this.todos = [];
          groupFBObjList.forEach(groupFBObj => {
            groupFBObj.subscribe(group => {
              const todoKeys = Object.keys(group);
              todoKeys.forEach(todoKey => {
                if (todoKey !== "$value") {
                  this.db.getItem(`/todos/${group.$key}/${todoKey}`)
                    .subscribe(todo => {
                      const index = this.todos.findIndex(({key}) => key === todoKey);
                      if (todo.$exists()) {
                        const newTodo = new Todo(todo.title, todo.groupKey, todo.due, todo.done).setKey(todo.$key);
                        if (index < 0) {
                          this.todos.push(newTodo);
                        } else {
                          this.todos[index] = newTodo;
                        }
                      } else {
                        this.todos.splice(index, 1);
                      }
                    })
                }
              });
            });
          });
        });
    });
  }

  addTodo(todo: Todo) {
    this.db.addItem(`todos/${todo.data.groupKey}`, todo.key, todo.data);
  }

  updateTodo(todo: Todo) {
    if (todo.data.groupKey === todo.beforeGroupKey) {
      this.db.updateItem(`todos/${todo.data.groupKey}`, todo.key, todo.data);
    } else {
      this.db.deleteItem(`todos/${todo.beforeGroupKey}`, todo.key);
      this.db.addItem(`todos/${todo.data.groupKey}`, todo.key, todo.data);
    }
  }

  deleteTodo(todo: Todo) {
    this.db.deleteItem(`todos/${todo.data.groupKey}`, todo.key);
  }

}
