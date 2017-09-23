import { Component, OnInit } from '@angular/core';
import { Todo } from '../class/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];

  constructor() { }

  ngOnInit() {
    this.todos.push(new Todo('hoge1'));
    this.todos.push(new Todo('hoge2'));
  }

}
