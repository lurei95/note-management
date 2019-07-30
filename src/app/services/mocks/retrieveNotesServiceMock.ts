import { NoteModel } from 'src/app/models/noteModel';
import { RetrieveNotesService } from '../note/retrieve-notes.service';

/**
 * Mock service for {@link FilterCategoriesService}
 */
export class RetrieveNotesServiceMock extends RetrieveNotesService
{
  /**
   * If the service was executed
   */
  wasExecuted: boolean;

  /**
   * Constructor
   */
  constructor() { super(null); }

  /**
   * Executes the service: Retrieves all exisiting notes
   */
  execute() { this.wasExecuted = true; }
}