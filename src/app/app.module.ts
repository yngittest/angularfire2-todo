import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { ModalModule, CollapseModule } from 'ngx-bootstrap';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { AuthService } from './service/auth/auth.service';
import { TodoFormComponent } from './todo/todo-form/todo-form.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { TodoItemComponent } from './todo/todo-item/todo-item.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GroupComponent } from './group/group.component';
import { GroupFormComponent } from './group/group-form/group-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoFormComponent,
    TodoEditComponent,
    TodoItemComponent,
    NavbarComponent,
    GroupComponent,
    GroupFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
