import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFillCreditComponent } from './edit-fill-credit.component';

describe('EditFillCreditComponent', () => {
  let component: EditFillCreditComponent;
  let fixture: ComponentFixture<EditFillCreditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFillCreditComponent]
    });
    fixture = TestBed.createComponent(EditFillCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
