import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTyperoomComponent } from './manage-typeroom.component';

describe('ManageTyperoomComponent', () => {
  let component: ManageTyperoomComponent;
  let fixture: ComponentFixture<ManageTyperoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTyperoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTyperoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
