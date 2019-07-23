import { TestBed } from '@angular/core/testing';

import { ValidateNoteService } from './validate-note.service';

describe('ValidateNoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidateNoteService = TestBed.get(ValidateNoteService);
    expect(service).toBeTruthy();
  });
});
