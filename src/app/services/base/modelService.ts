import { AngularFirestoreCollection, DocumentData, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserModel } from 'src/app/models/users/userModel';
import { EditableModel } from 'src/app/models/editableModel';
import { Store } from '@ngrx/store';
import { IApplicationState, getUser } from 'src/app/redux/state';
import { DatabaseService } from '../database.service';
import { Dictionary } from 'src/app/util/dictionary';

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
    { this._userDoc = this.databaseService.getItem(x.id, this.databaseService.getCollection("users")); }); 
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
   * @param {(categories: TModel[]) => void} callback Callback to execute when the items changed
   */
  get(callback: (categories: TModel[]) => void)
  {
    let collection = this.getCollection();   
    collection.snapshotChanges().subscribe(result => 
    {
      let categories = result.map(item => this.map(item.payload.doc.data()));
      callback(categories);
    });
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
  protected abstract map(data: DocumentData) : TModel
}