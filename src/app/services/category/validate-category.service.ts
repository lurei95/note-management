import { Injectable } from '@angular/core';
import { CategoryDisplayModel } from 'src/app/models/categoryModel';
import { Dictionary } from 'src/app/util/dictionary';
import { IValidationService } from '../base/iValidationService';
import { nullOrEmpty } from 'src/app/util/utility';

/**
 * Service for validating a category
 */
@Injectable({
  providedIn: 'root'
})
export class ValidateCategoryService implements IValidationService<CategoryDisplayModel>
{
  /**
   * Executes the service: Validates the category
   * 
   * @param {CategoryDisplayModel} parameter Category to validate
   * @return {Dictionary<string>} A Dictionary containing value pairs: (property name, error message)
   */
  execute(parameter: CategoryDisplayModel): Dictionary<string> 
  {
    let result = new Dictionary<string>();
    if (nullOrEmpty(parameter.title))
      result.add("title", "Pflichtfeld");
    return result;
  }
}
