import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement} from '@angular/core';

import { TodoItemComponent } from './todo-item.component';
import { Todo } from '../../model/todo';

@Component({
  selector: 'my-app',
  template: `
    <app-todo-item [todo]="todo" (onUpdate)="updateTodo($event)" (onDelete)="deleteTodo($event)" (onEdit)="editTodo($event)"></app-todo-item>
  `
})
export class TodoItemTestComponent {
  todo = new Todo('test', Date.parse('2017-10-15T21:00:00')).setKey('testkey');

  updated: Todo;
  deleted: Todo;
  edited: Todo;

  updateTodo(todo: Todo) {
    this.updated = todo;
  }
  deleteTodo(todo: Todo) {
    this.deleted = todo;
  }
  editTodo(todo: Todo) {
    this.edited = todo;
  }
}

describe('TodoItemComponent', () => {
  let component: TodoItemTestComponent;
  let fixture: ComponentFixture<TodoItemTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ TodoItemComponent, TodoItemTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TodoItemTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display done checkbox',
    fakeAsync(() => {
      fixture.detectChanges();
      tick();
      let de = fixture.debugElement.query(By.css('input'));
      expect(de.nativeElement.checked).toEqual(component.todo.data.done);
    })
  );

  it('should display title',
    () => {
      let de = fixture.debugElement.query(By.css('#content>h4'));
      expect(de.nativeElement.textContent).toEqual(component.todo.data.title);
    }
  );

  it('should display due',
    () => {
      let de = fixture.debugElement.query(By.css('#content>div'));
      expect(de.nativeElement.textContent).toEqual('10/15/2017, 9:00 PM');
    }
  );

  it('should tirgger "onUpdate" event when checkbox clicked',
    fakeAsync(() => {
      fixture.detectChanges();
      tick();
      let de = fixture.debugElement.query(By.css('input'));
      de.nativeElement.click();
      expect(component.updated).toEqual(component.todo);
      expect(component.updated).toBeTruthy();
    })
  );

  it('should tirgger "onDelete" event when "X" button clicked',
    () => {
      let de = fixture.debugElement.query(By.css('#delete'));
      de.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.deleted).toEqual(component.todo);
    }
  );

  it('should tirgger "onEdit" event when todo content clicked',
    () => {
      let de = fixture.debugElement.query(By.css('#content'));
      de.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.edited).toEqual(component.todo);
    }
  );
});
