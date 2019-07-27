import { Dictionary } from 'src/app/util/dictionary';
import { Injectable } from '@angular/core';
import { IValidationService } from '../base/iValidationService';
import { nullOrEmpty } from 'src/app/util/utility';
import { NoteModel } from 'src/app/models/noteModel';
import { LocalizationService } from '../localization.service';
import { MessageKind } from 'src/app/messageKind';

/**
 * Service for validating a note
 */
@Injectable({
  providedIn: 'root'
})
export class ValidateNoteService implements IValidationService<NoteModel>
{
  /**
   * Constructor
   * 
   * @param {LocalizationService} localizationService Injected: service for getting localized strings
   */
  constructor(private localizationService: LocalizationService) 
  { }

  /**
   * Executes the service: Validates the note
   * 
   * @param {NoteModel} parameter Note to validate
   * @return {Dictionary<string>} A Dictionary containing value pairs: (property name, error message)
   */
  execute(parameter: NoteModel): Dictionary<string> 
  {
    let result = new Dictionary<string>();
    if (nullOrEmpty(parameter.title))
    {
      let message = this.localizationService.execute(MessageKind.RequiredField);
      result.add("title", message);
    }
    return result;
  }
}