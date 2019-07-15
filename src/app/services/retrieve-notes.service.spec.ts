import { TestBed } from '@angular/core/testing';

import { RetrieveNotesService } from './retrieve-notes.service';

describe('RetrieveNotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetrieveNotesService = TestBed.get(RetrieveNotesService);
    expect(service).toBeTruthy();
  });
});
