import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { CategoriesService } from '../../services/category/categories.service';
import { CategoryModel } from '../..//models/categories/categoryModel';
import { DatabaseService } from './../database.service';
import { Injectable } from '@angular/core';
import { UserModel } from '../../models/users/userModel';
import uuid = require('uuid');

/**
 * Service for adding a new user
 */
@Injectable({
  providedIn: 'root'
})
export class AddUserService
{
  /**
   * Constructor
   * 
   * @param {DatabaseService} store Injected: service for accessing the firebase db
   */
  constructor(private databaseService: DatabaseService) { }

  /**
   * Executes the service: adds a new user
   * 
   * @param {UserModel} user The new user
   */
  execute(user: UserModel)
  { 
    let usersCollection : AngularFirestoreCollection = this.databaseService.getCollection("users");
    this.databaseService.updateItem(user.id, usersCollection, user);
    let category: CategoryModel = new CategoryModel(uuid(), "Default");
    let userDoc = this.databaseService.getItem(user.id, usersCollection);
    let categoryCollection : AngularFirestoreCollection 
      = this.databaseService.getCollection("categories", userDoc);
    this.databaseService.updateItem(category.id, categoryCollection, category);
  }
}
