import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdetailPage } from './pdetail.page';

describe('PdetailPage', () => {
  let component: PdetailPage;
  let fixture: ComponentFixture<PdetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
