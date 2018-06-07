import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoGroupbyComponent } from './todo-groupby.component';

describe('TodoGroupbyComponent', () => {
  let component: TodoGroupbyComponent;
  let fixture: ComponentFixture<TodoGroupbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoGroupbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoGroupbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
