import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyperoomComponent } from './typeroom.component';

describe('TyperoomComponent', () => {
  let component: TyperoomComponent;
  let fixture: ComponentFixture<TyperoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyperoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyperoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
