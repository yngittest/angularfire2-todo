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
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoItemComponent } from './todo/todo-item/todo-item.component';
import { TodoFormComponent } from './todo/todo-form/todo-form.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { TodoOfGroupComponent } from './todo/todo-of-group/todo-of-group.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { GroupItemComponent } from './group/group-item/group-item.component';
import { GroupFormComponent } from './group/group-form/group-form.component';
import { GroupEditComponent } from './group/group-edit/group-edit.component';
import { MygroupComponent } from './group/mygroup/mygroup.component';

import { AuthService } from './service/auth/auth.service';
import { GroupService } from './service/group/group.service';
import { FirebaseDbService } from './service/firebase-db/firebase-db.service';
import { AllTodoComponent } from './todo/all-todo/all-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoFormComponent,
    TodoEditComponent,
    TodoOfGroupComponent,
    GroupListComponent,
    GroupItemComponent,
    GroupFormComponent,
    GroupEditComponent,
    MygroupComponent,
    AllTodoComponent,
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
    GroupService,
    FirebaseDbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
