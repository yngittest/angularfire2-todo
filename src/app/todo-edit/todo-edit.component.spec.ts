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
  selected = new Todo('title before', false, Date.now()).setKey('testkey');

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

  it('should display the value of "todo" property inside the textbox',
    fakeAsync(() => {
      fixture.detectChanges();
      tick();
      let de = fixture.debugElement.query(By.css('input'));
      expect(de.nativeElement.value).toEqual(component.selected.data.title);
    })
  );

  it('should tirgger "edited" event which value is edited title when "OK" button clicked',
    fakeAsync(() => {
      fixture.detectChanges();

      let deInput = fixture.debugElement.query(By.css('input'));
      deInput.nativeElement.value = 'title after';
      deInput.nativeElement.dispatchEvent(new Event('input'));

      tick();

      let deUpdate = fixture.debugElement.query(By.css('#update'));
      deUpdate.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.updated.data.title).toEqual('title after');
    })
  );

  it('should tirgger "edited" event which value is "undefined" when "Cancel" button clicked',
    () => {
      let de = fixture.debugElement.query(By.css('#cancel'));
      de.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.updated).toBeUndefined();
    }
  );
});
