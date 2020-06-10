import { AngularFirestoreCollection, DocumentData, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserModel } from '../../models/users/userModel';
import { EditableModel } from '../../models/editableModel';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { IApplicationState, getUser } from '../../redux/state';
import { DatabaseService } from '../database.service';
import { Dictionary } from '../../util/dictionary';
import { Observable } from 'rxjs';

/**
 * Interface of a service for deleting a model
 */
export abstract class ModelService<TModel extends EditableModel>
{
  private _userDoc: AngularFirestoreDocument<DocumentData>
  /**
   * @returns {AngularFirestoreDocument<DocumentData>} The document of the current user containing all the data
   * of the user
   */
  protected get userDoc(): AngularFirestoreDocument<DocumentData> { return this._userDoc; }

  /**
   * @returns {string} The path to the collection for the model type
   */
  protected abstract get path(): string;

  /**
   * Constructor
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {DatabaseService} store Injected: service for accessing the firebase db
   */
  constructor(protected store: Store<IApplicationState>, protected databaseService: DatabaseService) 
  { 
    store.select(getUser).subscribe((x: UserModel) => 
    { 
      if (x != null)
        this._userDoc = this.databaseService.getItem(x.id, this.databaseService.getCollection("users")); 
      else
        this._userDoc = null;
    }); 
  }

  /**
   * Executes the service: Deletes the model
   * 
   * @param {TModel} parameter Model to delete
   */
  delete(parameter: TModel)
  {
    let collection = this.getCollection();  
    this.databaseService.deleteItem(parameter.id, collection);
  }

  /**
   * Executes the service: Saves the model
   * 
   * @param {TModel} parameter Model to save
   */
  save(parameter: TModel)
  {
    if (parameter.timestamp == null)
      parameter.timestamp = Date.now();

    let collection = this.getCollection();  
    this.databaseService.updateItem(parameter.id, collection, parameter);
  }

  /**
   * Executes the service: Retrieves all exisiting models
   * 
   * @param {(model: TModel) => boolean} filter Function for filtering the models
   */
  get(filter: (model: TModel) => boolean = (model) => true): Observable<TModel[]>
  {
    let collection = this.getCollection();   
    return collection.snapshotChanges()
      .pipe(map(value => value.map(item => this.mapToModel(item.payload.doc.data()))
        .filter(item => filter(item))
        .sort((a, b) => a.timestamp - b.timestamp)));
  }

  /**
   * Executes the service: Validates the model
   * 
   * @param {TModel} parameter Category to validate
   * @return {Dictionary<string>} A Dictionary containing value pairs: (property name, error message)
   */
  validate(parameter: TModel): Dictionary<string> { return new Dictionary<string>(); }

  /**
   * Returns the firestore collection for the model type
   * 
   * @returns {AngularFirestoreCollection} The firestore collection for the model type
   */
  protected getCollection(): AngularFirestoreCollection
  { return this.databaseService.getCollection(this.path, this.userDoc); }

  /**
   * Maps the doucment data to the model
   * 
   * @param {DocumentData} data The data to map to the model
   * @returns {TModel} The mdoel
   */
  protected abstract mapToModel(data: DocumentData) : TModel
}