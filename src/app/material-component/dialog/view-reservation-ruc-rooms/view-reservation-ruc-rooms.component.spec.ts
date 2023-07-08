import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReservationRucRoomsComponent } from './view-reservation-ruc-rooms.component';

describe('ViewReservationRucRoomsComponent', () => {
  let component: ViewReservationRucRoomsComponent;
  let fixture: ComponentFixture<ViewReservationRucRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReservationRucRoomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReservationRucRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
