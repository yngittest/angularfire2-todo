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
import { FirebaseService } from './service/firebase.service';
import { AuthService } from './service/auth/auth.service';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoFormComponent,
    TodoEditComponent,
    TodoItemComponent,
    NavbarComponent,
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
    FirebaseService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
