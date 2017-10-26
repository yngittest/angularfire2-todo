import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';
import { By } from '@angular/platform-browser';
import { DebugElement} from '@angular/core';

import { TodoFormComponent } from './todo-form.component';
import { Todo } from '../class/todo';

@Component({
  selector: 'my-app',
  template: `
    <app-todo-form (submit)="onSubmit($event)"></app-todo-form>
  `
})
export class TodoFormTestComponent {
  submitted: Todo;

  onSubmit(todo: Todo) {
    this.submitted = todo;
  }
}

describe('TodoFormComponent', () => {
  let component: TodoFormTestComponent;
  let fixture: ComponentFixture<TodoFormTestComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot()
      ],
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

  it('should tirgger "submit" event which title is entered text when + button clicked',
    fakeAsync(() => {
      const enteredTitle: string = 'hoge';

      fixture.detectChanges();

      let deInput = fixture.debugElement.query(By.css('#title'));
      deInput.nativeElement.value = enteredTitle;
      deInput.nativeElement.dispatchEvent(new Event('input'));

      tick();

      let deUpdate = fixture.debugElement.query(By.css('button'));
      deUpdate.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.submitted.data.title).toEqual(enteredTitle);
    })
  );
});
