import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountSlotComponent } from './discount-slot.component';

describe('DiscountSlotComponent', () => {
  let component: DiscountSlotComponent;
  let fixture: ComponentFixture<DiscountSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountSlotComponent]
    });
    fixture = TestBed.createComponent(DiscountSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
