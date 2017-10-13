import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement} from '@angular/core';

import { TodoEditComponent } from './todo-edit.component';
import { Todo } from '../class/todo';

@Component({
  selector: 'my-app',
  template: `
    <app-todo-edit [todo]="selected" (edited)="onEdited($event)"></app-todo-edit>
  `
})
export class TodoEditTestComponent {
  selected = new Todo('test', false, Date.now());

  updated: Todo;

  onEdited(todo: Todo) {
    this.updated = todo;
  }
}

describe('TodoEditComponent', () => {
  let component: TodoEditTestComponent;
  let fixture: ComponentFixture<TodoEditTestComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ TodoEditComponent, TodoEditTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TodoEditTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('inputのテスト', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    let de = fixture.debugElement.query(By.css('input'));
    expect(de.nativeElement.value).toEqual(component.selected.data.title);
  }));
});
