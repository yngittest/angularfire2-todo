import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap';

import { TodoComponent } from './todo.component';
import { FirebaseService } from '../service/firebase/firebase.service';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let de: DebugElement;
  let service: FirebaseService;

  beforeEach(async(() => {

    let serviceStub = {
      getItems(url: string) {},
      addItem(item) {},
      updateItem(item) {},
      deleteItem(item) {}
    };
    TestBed.configureTestingModule({
      imports: [
        ModalModule.forRoot()
      ],
      declarations: [ TodoComponent ],
      providers: [
        { provide: FirebaseService, useValue: serviceStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(FirebaseService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
