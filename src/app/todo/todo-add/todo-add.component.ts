import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

import { Todo } from '../../model/todo';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {
  bsModalRef: BsModalRef;

  @Input() groupKey: string;

  @Output() onCreate = new EventEmitter<Todo>();

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  addTodo(todo: Todo) {
    this.onCreate.emit(todo);
    this.bsModalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
  }

}
