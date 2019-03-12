import { TestBed } from '@angular/core/testing';

import { StorefrontService } from './storefront.service';

describe('StorefrontService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorefrontService = TestBed.get(StorefrontService);
    expect(service).toBeTruthy();
  });
});
