import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement} from '@angular/core';

import * as moment from 'moment';

import { TodoFormComponent } from './todo-form.component';
import { Todo } from '../../model/todo';

@Component({
  selector: 'app-test-app',
  template: `
    <app-todo-form [todo]="selected" (edited)="onEdited($event)"></app-todo-form>
  `
})
export class TodoFormTestComponent {
  selected = new Todo('title before', Date.now()).setKey('testkey');

  updated: Todo;

  onEdited(todo: Todo) {
    this.updated = todo;
  }
}

describe('TodoFormComponent', () => {
  let component: TodoFormTestComponent;
  let fixture: ComponentFixture<TodoFormTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ TodoFormComponent, TodoFormTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TodoFormTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the value of "todo" property',
    fakeAsync(() => {
      fixture.detectChanges();
      tick();
      const deTitle = fixture.debugElement.query(By.css('#title'));
      expect(deTitle.nativeElement.value).toEqual(component.selected.data.title);
      const deDue = fixture.debugElement.query(By.css('#due'));
      expect(deDue.nativeElement.value).toEqual(moment(component.selected.data.due).format('YYYY-MM-DDTHH:mm'));
    })
  );

  it('should tirgger "edited" event when "OK" button clicked',
    fakeAsync(() => {
      const inputTitle = 'title after';
      const inputDue = '2017-10-28T01:01';

      const deInputTitle = fixture.debugElement.query(By.css('#title'));
      deInputTitle.nativeElement.value = inputTitle;
      deInputTitle.nativeElement.dispatchEvent(new Event('input'));

      const deInputDue = fixture.debugElement.query(By.css('#due'));
      deInputDue.nativeElement.value = inputDue;
      deInputDue.nativeElement.dispatchEvent(new Event('input'));

      tick();

      const deUpdate = fixture.debugElement.query(By.css('#update'));
      deUpdate.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.updated.data.title).toEqual(inputTitle);
      expect(component.updated.data.due).toEqual(Date.parse(inputDue));
    })
  );

  it('should tirgger "edited" event when "Cancel" button clicked',
    () => {
      const de = fixture.debugElement.query(By.css('#cancel'));
      de.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.updated).toBeUndefined();
    }
  );
});
