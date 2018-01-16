import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement} from '@angular/core';

import * as moment from 'moment';

import { TodoEditComponent } from './todo-edit.component';
import { Todo } from '../../model/todo';

@Component({
  selector: 'my-app',
  template: `
    <app-todo-edit [todo]="selected" (edited)="onEdited($event)"></app-todo-edit>
  `
})
export class TodoEditTestComponent {
  selected = new Todo('title before', Date.now()).setKey('testkey');

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the value of "todo" property',
    fakeAsync(() => {
      fixture.detectChanges();
      tick();
      let deTitle = fixture.debugElement.query(By.css('#title'));
      expect(deTitle.nativeElement.value).toEqual(component.selected.data.title);
      let deDue = fixture.debugElement.query(By.css('#due'));
      expect(deDue.nativeElement.value).toEqual(moment(component.selected.data.due).format('YYYY-MM-DDTHH:mm'));
    })
  );

  it('should tirgger "edited" event when "OK" button clicked',
    fakeAsync(() => {
      const inputTitle: string = 'title after';
      const inputDue: string = '2017-10-28T01:01';

      let deInputTitle = fixture.debugElement.query(By.css('#title'));
      deInputTitle.nativeElement.value = inputTitle;
      deInputTitle.nativeElement.dispatchEvent(new Event('input'));

      let deInputDue = fixture.debugElement.query(By.css('#due'));
      deInputDue.nativeElement.value = inputDue;
      deInputDue.nativeElement.dispatchEvent(new Event('input'));

      tick();

      let deUpdate = fixture.debugElement.query(By.css('#update'));
      deUpdate.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.updated.data.title).toEqual(inputTitle);
      expect(component.updated.data.due).toEqual(Date.parse(inputDue));
    })
  );

  it('should tirgger "edited" event when "Cancel" button clicked',
    () => {
      let de = fixture.debugElement.query(By.css('#cancel'));
      de.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.updated).toBeUndefined();
    }
  );
});
