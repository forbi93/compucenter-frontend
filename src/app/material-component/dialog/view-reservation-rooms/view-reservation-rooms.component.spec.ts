import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReservationRoomsComponent } from './view-reservation-rooms.component';

describe('ViewReservationRoomsComponent', () => {
  let component: ViewReservationRoomsComponent;
  let fixture: ComponentFixture<ViewReservationRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReservationRoomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReservationRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
