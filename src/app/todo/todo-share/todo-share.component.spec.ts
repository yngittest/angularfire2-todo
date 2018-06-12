import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoShareComponent } from './todo-share.component';

describe('TodoShareComponent', () => {
  let component: TodoShareComponent;
  let fixture: ComponentFixture<TodoShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
