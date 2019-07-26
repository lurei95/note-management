import { MessageKind } from 'src/app/messageKind';
import { Injectable } from '@angular/core';
import { Dictionary } from 'src/app/util/dictionary';
import { IValidationService } from '../base/iValidationService';
import { nullOrEmpty } from 'src/app/util/utility';
import { CategoryModel } from 'src/app/models/categoryModel';
import { LocalizationService, LocalizationArgument } from '../localization.service';

/**
 * Service for validating a category
 */
@Injectable({
  providedIn: 'root'
})
export class ValidateCategoryService implements IValidationService<CategoryModel>
{
  /**
   * Constructor
   * 
   * @param {LocalizationService} localizationService Injected: service for getting localized strings
   */
  constructor(private localizationService: LocalizationService) 
  { }

  /**
   * Executes the service: Validates the category
   * 
   * @param {CategoryModel} parameter Category to validate
   * @return {Dictionary<string>} A Dictionary containing value pairs: (property name, error message)
   */
  execute(parameter: CategoryModel): Dictionary<string> 
  {
    let result = new Dictionary<string>();

    if (nullOrEmpty(parameter.title))
    {
      let message = this.localizationService.execute(new LocalizationArgument(MessageKind.RequiredField));
      result.add("title", message);
    }
    return result;
  }
}
