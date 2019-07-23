import { TestBed } from '@angular/core/testing';

import { FilterNotesService } from './filter-notes.service';

describe('FilterNotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterNotesService = TestBed.get(FilterNotesService);
    expect(service).toBeTruthy();
  });
});
