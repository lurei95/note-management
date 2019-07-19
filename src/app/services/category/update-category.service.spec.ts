import { TestBed } from '@angular/core/testing';

import { UpdateCategoryService } from './update-category.service';

describe('UpdateCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateCategoryService = TestBed.get(UpdateCategoryService);
    expect(service).toBeTruthy();
  });
});
