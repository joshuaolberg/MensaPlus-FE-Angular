import { TestBed } from '@angular/core/testing';

import { EssenService } from './essen.service';

describe('EssenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EssenService = TestBed.get(EssenService);
    expect(service).toBeTruthy();
  });
});
