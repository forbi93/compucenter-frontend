import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalesComponent } from './view-sales.component';

describe('ViewReservationComponent', () => {
  let component: ViewSalesComponent;
  let fixture: ComponentFixture<ViewSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
