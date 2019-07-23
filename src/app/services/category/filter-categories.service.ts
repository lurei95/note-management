import { CategoryDisplayModel } from './../../models/categoryModel';
import { Injectable } from '@angular/core';
import { nullOrEmpty } from 'src/app/util/utility';

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
   * @param {CategoryDisplayModel[]} categories Categories to filter
   * @param {string} searchText Search text to use for filtering the categories
   * @param {string} selectedCategoryId ID of the selected category
   * @returns {CategoryDisplayModel[]} The filtered list of categories
   */
  filter (categories: CategoryDisplayModel[], searchText: string, selectedCategoryId: string)
    : CategoryDisplayModel[]
  {
    if (!nullOrEmpty(searchText))
      return categories.filter(category => category.id == selectedCategoryId 
        || category.title.toUpperCase().includes(searchText.toUpperCase()));
    else
      return categories;
  }
}