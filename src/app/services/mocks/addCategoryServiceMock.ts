import { AddCategoryService } from '../category/add-category.service';

/**
 * Mock service for {@link AddCategoryService}
 */
export class AddCategoryServiceMock extends AddCategoryService
{
  /**
   * If the service was called
   */
  wasCalled: boolean = false;

  /**
   * Constructor
   */
  constructor() { super(null); }

  /**
   * Executes the service
   */
  execute() { this.wasCalled = true; }
}