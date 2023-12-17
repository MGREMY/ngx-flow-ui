/** @format */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFlowUiComponent } from './ngx-flow-ui.component';

describe('NgxFlowUiComponent', () => {
  let component: NgxFlowUiComponent;
  let fixture: ComponentFixture<NgxFlowUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxFlowUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxFlowUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
