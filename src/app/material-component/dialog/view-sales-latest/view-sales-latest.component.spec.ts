import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalesLatestComponent } from './view-sales-latest.component';

describe('ViewSalesLatestComponent', () => {
  let component: ViewSalesLatestComponent;
  let fixture: ComponentFixture<ViewSalesLatestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSalesLatestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSalesLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
