import { Injectable } from '@angular/core';
import { User } from '../../model/customer.model';
import { Product } from '../../model/product';



@Injectable()
export class RepositoryService {
  public register : User;
  public product : Product;
  public loggedInUser: User;
  public loggedIn = true;
}
