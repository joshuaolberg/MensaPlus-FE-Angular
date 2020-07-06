import { TestBed } from '@angular/core/testing';

import { EssensplanService } from './essensplan.service';

describe('EssensplanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EssensplanService = TestBed.get(EssensplanService);
    expect(service).toBeTruthy();
  });
});
