import { FilterCategoriesService } from '../category/filter-categories.service';
import { CategoryModel } from 'src/app/models/categoryModel';

/**
 * Mock service for {@link FilterCategoriesService}
 */
export class FilterCategoriesServiceMock extends FilterCategoriesService
{
  /**
   * The categories the service was called with
   */
  categories: CategoryModel[] = [];
  /**
   * The filterText the service was called with
   */
  filterText: string;
  /**
   * The selectedCategoryId the service was called with
   */
  selectedCategoryId: string;

  /**
   * Filters the categories by a search text (selected category is not filtered out!)
   * 
   * @param {CategoryModel[]} categories Categories to filter
   * @param {string} filterText Search text to use for filtering the categories
   * @param {string} selectedCategoryId ID of the selected category
   * @returns {CategoryModel[]} The filtered list of categories
   */
  filter (categories: CategoryModel[], filterText: string, selectedCategoryId: string) : CategoryModel[]
  {
    this.categories = categories;
    this.filterText = filterText;
    this.selectedCategoryId = selectedCategoryId;
    return categories;
  }
}