import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllTodoComponent } from './todo/all-todo/all-todo.component';
import { TodoOfGroupComponent } from './todo/todo-of-group/todo-of-group.component';

const routes = [
  { path: '', component: AllTodoComponent,
    data: {name: 'All', done: false}},
  { path: 'completed', component: AllTodoComponent,
    data: {name: 'Completed', done: true}},
  { path: 'groups/:key', component: TodoOfGroupComponent }
];

export const ROUTES: ModuleWithProviders = RouterModule.forRoot(routes);
