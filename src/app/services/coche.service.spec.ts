import { TestBed } from '@angular/core/testing';

import { CocheService } from './coche.service';

describe('CocheService', () => {
  let service: CocheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CocheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
