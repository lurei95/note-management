import { DatabaseService } from './../database.service';
import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/users/userModel';

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
  { this.databaseService.updateItem(user.id, this.databaseService.getCollection("users"), user); }
}
