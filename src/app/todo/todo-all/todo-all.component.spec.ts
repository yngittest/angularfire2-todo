import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoAllComponent } from './todo-all.component';

describe('TodoAllComponent', () => {
  let component: TodoAllComponent;
  let fixture: ComponentFixture<TodoAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
