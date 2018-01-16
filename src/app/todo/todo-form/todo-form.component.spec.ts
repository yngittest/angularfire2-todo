import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement} from '@angular/core';

import { TodoFormComponent } from './todo-form.component';
import { Todo } from '../../model/todo';

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

  it('should tirgger "submit" event when "+" button clicked',
    fakeAsync(() => {
      const inputTitle: string = 'hoge';
      const inputDue: string = '2017-10-28T01:01';

      let deInputTitle = fixture.debugElement.query(By.css('#title'));
      deInputTitle.nativeElement.value = inputTitle;
      deInputTitle.nativeElement.dispatchEvent(new Event('input'));

      let deInputDue = fixture.debugElement.query(By.css('#due'));
      deInputDue.nativeElement.value = inputDue;
      deInputDue.nativeElement.dispatchEvent(new Event('input'));

      tick();

      let deBtn = fixture.debugElement.query(By.css('button'));
      deBtn.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.submitted.data.title).toEqual(inputTitle);
      expect(component.submitted.data.due).toEqual(Date.parse(inputDue));
    })
  );
});
