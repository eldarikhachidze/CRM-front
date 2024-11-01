import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditCloseFlotComponent} from './edit-close-flot.component';

describe('EditCloseFlotComponent', () => {
  let component: EditCloseFlotComponent;
  let fixture: ComponentFixture<EditCloseFlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCloseFlotComponent]
    });
    fixture = TestBed.createComponent(EditCloseFlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
