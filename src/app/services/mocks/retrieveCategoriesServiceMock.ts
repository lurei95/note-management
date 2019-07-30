import { RetrieveCategoriesService } from '../category/retrieve-categories.service';

/**
 * Mock service for {@link FilterCategoriesService}
 */
export class RetrieveCategoriesServiceMock extends RetrieveCategoriesService
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