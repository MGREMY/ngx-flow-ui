/** @format */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFlowUiBadgeComponent } from './ngx-flow-ui-badge.component';

describe('NgxFlowUiBadgeComponent', () => {
  let component: NgxFlowUiBadgeComponent;
  let fixture: ComponentFixture<NgxFlowUiBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxFlowUiBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxFlowUiBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
