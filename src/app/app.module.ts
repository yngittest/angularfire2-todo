import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { ModalModule, BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';

import { FirebaseService } from './service/firebase.service';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoFormComponent,
    TodoEditComponent,
    TodoItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
