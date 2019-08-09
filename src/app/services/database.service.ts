import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot, QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';

/**
 * Service for accessing the firstore db
 */
@Injectable({
  providedIn: 'root'
})
export class DatabaseService 
{
  /**
   * Constructor
   * 
   * @param {AngularFirestore} database Injected: firestore db provider
   */
  constructor(private database: AngularFirestore) 
  { }

  /**
   * Gets a collection from the database
   * 
   * @param {string} collection Name of the collection
   * @param {AngularFirestoreDocument} item Parent item
   * @returns {AngularFirestoreCollection} The collection
   */
  getCollection(collection: string, item: AngularFirestoreDocument = null): AngularFirestoreCollection
  {
    if (item == null)
      return this.database.collection(collection);
    else
      return item.collection(collection);
  }

  /**
   * Gets a item from the database
   * 
   * @param {string} key Key of the item
   * @param {AngularFirestoreDocument} item Parent item
   * @returns {AngularFirestoreDocument} The item
   */
  getItem(key: string, collection: AngularFirestoreCollection): AngularFirestoreDocument 
  { return collection.doc(key); }

  /**
   * Deletes an item from the database
   * 
   * @param {string} key Key of the item
   * @param {AngularFirestoreCollection} collection The collection that contains the item
   */
  deleteItem(key: string, collection: AngularFirestoreCollection)
  { this.getItem(key, collection).delete(); }

  /**
   * Deletes all items that match a filter
   * 
   * @param {AngularFirestoreCollection} collection The collection that contains the items
   * @param {(item: DocumentData) => boolean} filter The filter to select the items to delete
   */
  deleteAll(collection: AngularFirestoreCollection, filter: (item: any) => boolean)
  { 
    collection.get().toPromise().then((querySnapshot) =>
    {
      querySnapshot.forEach((doc) => 
      {
        if (filter.call(doc.data()))
          doc.ref.delete();
      });
    });
  }

  /**
   * Updates/saves an item in the database
   * 
   * @param {string} key Key of the item
   * @param {AngularFirestoreCollection} collection The collection that contains the item
   * @param {any} item The item to update/save
   */
  updateItem(key: string, collection: AngularFirestoreCollection, item: any)
  { this.getItem(key, collection).set(Object.assign({}, item)); }
}
