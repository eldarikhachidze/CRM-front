import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillCreditComponent } from './fill-credit.component';

describe('FillCreditComponent', () => {
  let component: FillCreditComponent;
  let fixture: ComponentFixture<FillCreditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FillCreditComponent]
    });
    fixture = TestBed.createComponent(FillCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
