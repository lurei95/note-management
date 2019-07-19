import { TestBed } from '@angular/core/testing';

import { AddNoteService } from './add-note.service';

describe('AddNoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddNoteService = TestBed.get(AddNoteService);
    expect(service).toBeTruthy();
  });
});
