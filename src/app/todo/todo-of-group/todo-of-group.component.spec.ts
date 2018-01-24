import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoOfGroupComponent } from './todo-of-group.component';

describe('TodoOfGroupComponent', () => {
  let component: TodoOfGroupComponent;
  let fixture: ComponentFixture<TodoOfGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoOfGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoOfGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
