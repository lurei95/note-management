import { TestBed } from '@angular/core/testing';

import { RetrieveCategoriesService } from './retrieve-categories.service';

describe('RetrieveCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetrieveCategoriesService = TestBed.get(RetrieveCategoriesService);
    expect(service).toBeTruthy();
  });
});
