import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReservationRucComponent } from './view-reservation-ruc.component';

describe('ViewReservationRucComponent', () => {
  let component: ViewReservationRucComponent;
  let fixture: ComponentFixture<ViewReservationRucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReservationRucComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReservationRucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
