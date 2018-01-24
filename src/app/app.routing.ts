import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoOfGroupComponent } from './todo/todo-of-group/todo-of-group.component';

const routes = [
  { path: 'group/:key', component: TodoOfGroupComponent }
];

export const ROUTES: ModuleWithProviders = RouterModule.forRoot(routes);
