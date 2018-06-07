import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingTodoComponent } from './sharing-todo.component';

describe('SharingTodoComponent', () => {
  let component: SharingTodoComponent;
  let fixture: ComponentFixture<SharingTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharingTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
