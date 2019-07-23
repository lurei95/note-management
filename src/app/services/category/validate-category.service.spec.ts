import { TestBed } from '@angular/core/testing';

import { ValidateCategoryService } from './validate-category.service';

describe('ValidateCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidateCategoryService = TestBed.get(ValidateCategoryService);
    expect(service).toBeTruthy();
  });
});
