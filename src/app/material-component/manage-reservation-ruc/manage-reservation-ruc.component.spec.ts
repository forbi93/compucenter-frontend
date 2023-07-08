import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReservationRucComponent } from './manage-reservation-ruc.component';

describe('ManageReservationRucComponent', () => {
  let component: ManageReservationRucComponent;
  let fixture: ComponentFixture<ManageReservationRucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageReservationRucComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageReservationRucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
