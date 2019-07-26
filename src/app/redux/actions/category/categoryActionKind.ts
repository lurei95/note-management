/**
 * Kind of action performed on the state related to {@link CategoryModel}
 */
export enum CategoryActionKind 
{
  /**
   * The validity of a edited category is changed
   */
  CategoryValidityChange = "CategoryValidityChange",
  /**
   * Category is deleted
   */
  CategoryDelete = 'CategoryDelete',
  /**
   * Category is added
   */
  CategoryAdd = 'CategoryAdd',
  /**
   * Category is saved/changed
   */
  CategoryUpdate = 'CategoryUpdate',
  /**
   * Categories are retrieved
   */
  CategoriesRetrieved = 'CategoriesRetrieved',
  /**
   * The selected category is changed
   */
  SelectedCategoryChange = 'SelectedCategoryChanged'
}