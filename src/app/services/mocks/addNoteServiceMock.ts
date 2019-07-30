import { AddNoteService } from '../note/add-note.service';

/**
 * Mock service for {@link AddNoteService}
 */
export class AddNoteServiceMock extends AddNoteService
{
  /**
   * If the service was called
   */
  wasCalled: boolean = false;

  /**
   * Constructor
   */
  constructor() { super(null, null); }

  /**
   * Executes the service
   */
  execute() { this.wasCalled = true; }
}