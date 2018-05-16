import { Injectable } from '@angular/core';
import { User } from '../../model/customer.model';
import { RepositoryService } from './repository.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { LoginModel } from '../../model/login-model';
import { Customer } from '../../model/customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable()
export class ManageAccountService {


  private url: string = "http://localhost:8080/user";
  private UrlD: string = "http://localhost:8080/driver";
  private UrlS: string = "http://localhost:8080/supplier";
  private UrlA: string = "http://localhost:8080/admin";
  private UrlC: string = "http://localhost:8080/customer";
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });
// private options = new RequestOptions({ headers: this.header });



  private user: User = new User();
  users: User[];
  constructor(private http: HttpClient , private data: RepositoryService) { }

  register (user: User) {
    return this.http.post(`${this.url}/save`, user, { headers: this.header })
  }
  registerD(newDriver: User) {
    return this.http.post(`${this.UrlD}/save`, newDriver, { headers: this.header });
  }
  registerS(newSupplier: User) {
    return this.http.post(`${this.UrlS}/save`, newSupplier, { headers: this.header });
  }
  registerC(newCustomer: User) {
    return this.http.post(`${this.UrlC}/save`, newCustomer, { headers: this.header });
  }
  registerA(newAdmin: User) {
    return this.http.post(`${this.UrlC}/save`, newAdmin, { headers: this.header });
  }

  getUserByUserName(userName: string) {
    return this.http.get(this.url + '/user-by-username/' + userName, { headers: this.header })
    .map((response) => response)
    .catch(this.errorHandler);

  }

  getUser() {
    return this.http.get(this.url + '/all')
      .map((response) => response)
      .catch(this.errorHandler);
  }
  deleteUser(id: Number) {
    return this.http.delete(this.url + '/delete/' + id)
      .map((response: Response) => response.json)
      .catch(this.errorHandler);
  }
  updateUser(user: User) {
    return this.http.put(this.url + '/update', user)
      .map((response: Response) => response.json)
      .catch(this.errorHandler);

  }
  errorHandler(error: Response) {
    return Observable.throw(error || "Error")
  }
  setter(user: User) {
    this.user = user;
  }
  getter() {
    return this.user;
  }

  loginUser(username: String, password: String) {
    return this.http.get(this.url + '/login-user/' + username+'/'+password, { headers: this.header })
    .map((response) => response)
    .catch(this.errorHandler);
  }
  
}
