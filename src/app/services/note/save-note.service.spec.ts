import { TestBed } from '@angular/core/testing';
import { SaveNoteService } from './save-note.service';

describe('SaveNoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveNoteService = TestBed.get(SaveNoteService);
    expect(service).toBeTruthy();
  });
});
