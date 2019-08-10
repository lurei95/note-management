/**
 * Kind of action performed on the state related to {@link CategoryModel}
 */
export enum CategoryActionKind 
{
  /**
   * The selected category is changed
   */
  SelectedCategoryChange = 'SelectedCategoryChanged',
  /**
   * The validity of the category is changed
   */
  CategoryValidityChange = "CategoryValidityChange",
  /**
   * The new category is changed
   */
  NewCategoryChange = "NewCategoryChange"
}