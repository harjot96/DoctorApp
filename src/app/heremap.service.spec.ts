import { TestBed } from '@angular/core/testing';

import { HeremapService } from './heremap.service';

describe('HeremapService', () => {
  let service: HeremapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeremapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
