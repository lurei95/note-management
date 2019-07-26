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
   * @param {string} searchText Search text to use for filtering the categories
   * @param {string} selectedCategoryId ID of the selected category
   * @returns {CategoryModel[]} The filtered list of categories
   */
  filter (categories: CategoryModel[], searchText: string, selectedCategoryId: string) : CategoryModel[]
  {
    if (!nullOrEmpty(searchText))
      return categories.filter(category => category.id == selectedCategoryId 
        || category.title.toUpperCase().includes(searchText.toUpperCase()));
    else
      return categories;
  }
}