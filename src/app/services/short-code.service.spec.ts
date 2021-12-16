import { TestBed } from '@angular/core/testing';

import { ShortCodeService } from './short-code.service';

describe('ShortCodeService', () => {
  let service: ShortCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
