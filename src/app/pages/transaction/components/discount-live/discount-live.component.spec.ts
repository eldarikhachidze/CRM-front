import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountLiveComponent } from './discount-live.component';

describe('DiscountLiveComponent', () => {
  let component: DiscountLiveComponent;
  let fixture: ComponentFixture<DiscountLiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountLiveComponent]
    });
    fixture = TestBed.createComponent(DiscountLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
