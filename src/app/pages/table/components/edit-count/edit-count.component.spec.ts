import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCountComponent } from './edit-count.component';

describe('EditCountComponent', () => {
  let component: EditCountComponent;
  let fixture: ComponentFixture<EditCountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCountComponent]
    });
    fixture = TestBed.createComponent(EditCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
