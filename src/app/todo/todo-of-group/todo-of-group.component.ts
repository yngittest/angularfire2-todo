import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Todo } from '../../model/todo';
import { Group } from '../../model/group';

import { FirebaseService } from '../../service/firebase/firebase.service';
import { GroupService } from '../../service/group/group.service';

@Component({
  selector: 'app-todo-of-group',
  templateUrl: './todo-of-group.component.html',
  styleUrls: ['./todo-of-group.component.css'],
  providers: [
    FirebaseService
  ]
})
export class TodoOfGroupComponent implements OnInit {
  todos: Todo[];
  myGroupName: string;
  subscription: any;

  constructor(private route: ActivatedRoute, private firebase: FirebaseService, private group: GroupService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const groupKey: string = params['key'];
      this.subscription = this.firebase.getItems(`/todos/${groupKey}`, { query: { orderByChild: 'due' }}).subscribe((snapshots: any[]) => {
        this.todos = [];
        snapshots.forEach((snapshot: any) => {
          this.todos.push(new Todo(snapshot.title, snapshot.groupKey, snapshot.due, snapshot.done).setKey(snapshot.$key));
        });
        
        let groups: Group[] = this.group.getGroups();
        this.myGroupName = groups.filter(group => {
          return group.key == groupKey;
        })[0].data.name;
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addTodo(todo: Todo) {
    this.firebase.addItem(todo);
  }

  updateTodo(todo: Todo) {
    this.firebase.updateItem(todo);
  }

  deleteTodo(todo: Todo) {
    this.firebase.deleteItem(todo);
  }

}
