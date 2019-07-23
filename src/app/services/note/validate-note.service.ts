import { Dictionary } from 'src/app/util/dictionary';
import { Injectable } from '@angular/core';
import { IValidationService } from '../base/iValidationService';
import { NoteDisplayModel } from 'src/app/models/noteModel';
import { nullOrEmpty } from 'src/app/util/utility';

/**
 * Service for validating a note
 */
@Injectable({
  providedIn: 'root'
})
export class ValidateNoteService implements IValidationService<NoteDisplayModel>
{
  /**
   * Executes the service: Validates the note
   * 
   * @param {NoteDisplayModel} parameter Note to validate
   * @return {Dictionary<string>} A Dictionary containing value pairs: (property name, error message)
   */
  execute(parameter: NoteDisplayModel): Dictionary<string> 
  {
    let result = new Dictionary<string>();
    if (nullOrEmpty(parameter.title))
      result.add("title", "Pflichtfeld");
    return result;
  }
}