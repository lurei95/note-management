import { Injectable } from '@angular/core';
import { nullOrEmpty } from 'src/app/util/utility';
import { CategoryModel } from 'src/app/models/categoryModel';

/**
 * Service for filtering the categories by a search text
 */
@Injectable({
  providedIn: 'root'
})
export class FilterCategoriesService 
{
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
    if (!nullOrEmpty(filterText))
      return categories.filter(category => category.id == selectedCategoryId 
        || category.title.toUpperCase().includes(filterText.toUpperCase()));
    else
      return categories;
  }
}