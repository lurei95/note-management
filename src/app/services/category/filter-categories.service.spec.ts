import { TestBed } from '@angular/core/testing';

import { FilterCategoriesService } from './filter-categories.service';

describe('FilterCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterCategoriesService = TestBed.get(FilterCategoriesService);
    expect(service).toBeTruthy();
  });
});
