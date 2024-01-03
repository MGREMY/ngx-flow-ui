/** @format */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFlowUiButtonComponent } from './ngx-flow-ui-button.component';

describe('NgxFlowUiButtonComponent', () => {
  let component: NgxFlowUiButtonComponent;
  let fixture: ComponentFixture<NgxFlowUiButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxFlowUiButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxFlowUiButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
