import { TestBed } from '@angular/core/testing';

import { NgxFlowUiService } from './ngx-flow-ui.service';

describe('NgxFlowUiService', () => {
  let service: NgxFlowUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFlowUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
