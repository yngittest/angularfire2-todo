import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { ModalModule, CollapseModule } from 'ngx-bootstrap';

import { environment } from '../environments/environment';

import { ROUTES } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
// import { TodoComponent } from './todo/todo.component';
import { TodoFormComponent } from './todo/todo-form/todo-form.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { TodoItemComponent } from './todo/todo-item/todo-item.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoOfGroupComponent } from './todo/todo-of-group/todo-of-group.component';
import { GroupComponent } from './group/group.component';
import { GroupFormComponent } from './group/group-form/group-form.component';

import { AuthService } from './service/auth/auth.service';
import { GroupService } from './service/group/group.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    // TodoComponent,
    TodoFormComponent,
    TodoEditComponent,
    TodoItemComponent,
    TodoListComponent,
    TodoOfGroupComponent,
    GroupComponent,
    GroupFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ROUTES,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [
    AuthService,
    GroupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
