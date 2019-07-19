import { TestBed } from '@angular/core/testing';

import { DeleteCategoryService } from './delete-category.service';

describe('DeleteCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteCategoryService = TestBed.get(DeleteCategoryService);
    expect(service).toBeTruthy();
  });
});
