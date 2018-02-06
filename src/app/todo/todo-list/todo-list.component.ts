import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

import { Todo } from '../../model/todo';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  selected: Todo;
  bsModalRef: BsModalRef;

  @Input() todos: Todo[];
  @Input() groupKey: string;

  @Output() onCreate = new EventEmitter<Todo>();
  @Output() onUpdate = new EventEmitter<Todo>();
  @Output() onDelete = new EventEmitter<Todo>();

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  addTodo(todo: Todo) {
    this.onCreate.emit(todo);
    this.bsModalRef.hide();
  }

  updateTodo(todo: Todo) {
    this.onUpdate.emit(todo);
  }

  deleteTodo(todo: Todo) {
    this.onDelete.emit(todo);
  }

  editTodo(todo: Todo) {
    this.selected = todo;
  }

  onEdited(todo: Todo) {
    if (todo) {
      this.updateTodo(todo);
    }
    this.selected = null;
    this.bsModalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
  }

}
