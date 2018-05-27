import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule,
  MatTabsModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule,
  MatChipsModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

// import { AngularFireModule } from 'angularfire2';
import {
  AngularFireModule,
  FirebaseOptionsToken,
  FirebaseAppNameToken,
  FirebaseAppConfigToken
} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { ROUTES } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { TodoAddComponent } from './todo/todo-add/todo-add.component';
import { TodoFormComponent } from './todo/todo-form/todo-form.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoItemComponent } from './todo/todo-item/todo-item.component';
import { TodoAllComponent } from './todo/todo-all/todo-all.component';
import { TodoOfGroupComponent } from './todo/todo-of-group/todo-of-group.component';
import { TodoCompletedComponent } from './todo/todo-completed/todo-completed.component';
import { TodoManageComponent } from './todo/todo-manage/todo-manage.component';

import { GroupAddComponent } from './group/group-add/group-add.component';
import { GroupFormComponent } from './group/group-form/group-form.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { GroupItemComponent } from './group/group-item/group-item.component';
import { GroupEditComponent } from './group/group-edit/group-edit.component';
import { MygroupComponent } from './group/mygroup/mygroup.component';

import { AuthService } from './service/auth/auth.service';
import { GroupService } from './service/group/group.service';
import { FirebaseDbService } from './service/firebase-db/firebase-db.service';
import { FirebaseMessagingService } from './service/firebase-messaging/firebase-messaging.service';

import { OrderByPipe } from './pipe/order-by/order-by.pipe';
import { FilterByPipe } from './pipe/filter-by/filter-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoFormComponent,
    TodoAddComponent,
    TodoAllComponent,
    TodoOfGroupComponent,
    TodoCompletedComponent,
    TodoManageComponent,
    GroupListComponent,
    GroupItemComponent,
    GroupFormComponent,
    GroupEditComponent,
    GroupAddComponent,
    MygroupComponent,
    OrderByPipe,
    FilterByPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatGridListModule,
    MatChipsModule,
    ROUTES,
    // AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  entryComponents: [
    TodoFormComponent,
    GroupFormComponent,
    GroupEditComponent,
  ],
  providers: [
    AuthService,
    FirebaseDbService,
    FirebaseMessagingService,
    GroupService,
    { provide: FirebaseOptionsToken, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
