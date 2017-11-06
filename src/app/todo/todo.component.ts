import { Component, OnInit, TemplateRef } from '@angular/core';

import { Todo } from '../class/todo';

import { FirebaseService } from '../service/firebase.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  bsModalRef: BsModalRef;
  selected: Todo;
  subscription: any;

  constructor(private firebase: FirebaseService, private modalService: BsModalService) { }

  ngOnInit() {
    this.subscription = this.firebase.getItems('/todos').subscribe((snapshots: any[]) => {
      this.todos = [];
      snapshots.forEach((snapshot: any) => {
        this.todos.push(new Todo(snapshot.title, snapshot.due, snapshot.done).setKey(snapshot.$key));
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addTodo(todo: Todo) {
    this.firebase.addItem(todo);
    this.bsModalRef.hide();
  }

  updateTodo(todo: Todo) {
    this.firebase.updateItem(todo);
  }

  deleteTodo(todo: Todo) {
    this.firebase.deleteItem(todo);
  }

  editTodo(todo: Todo) {
    this.selected = todo;
  }

  onEdited(todo: Todo) {
    if(todo) {
      this.updateTodo(todo);
    }
    this.selected = null;
    this.bsModalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
  }

}
