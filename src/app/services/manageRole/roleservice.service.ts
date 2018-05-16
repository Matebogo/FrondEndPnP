import { Injectable } from '@angular/core';

import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/customer.model';
import { Customer } from '../../model/customer';

@Injectable()
export class RoleserviceService {

  private Url: string = "http://localhost:8080/user";
  private UrlD: string = "http://localhost:8080/driver";
  private UrlS: string = "http://localhost:8080/supplier";
  private UrlC: string = "http://localhost:8080/customer";
  private UrlA: string = "http://localhost:8080/admin";
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  private user: User = new User();
  private customer: Customer;

  AccessToken: string = "";

  constructor(private http: Http) {

  }

  register(newAdmin: User) {
    return this.http.post(`${this.Url}/save`, newAdmin);
  }
  registerD(newDriver: User) {
    return this.http.post(`${this.UrlD}/save`, newDriver);
  }
  registerS(newSupplier: User) {
    return this.http.post(`${this.UrlS}/save`, newSupplier);
  }
  registerC(newCustomer: User) {
    return this.http.post(`${this.UrlC}/save`, newCustomer);
  }
  registerA(newAdmin: User) {
    return this.http.post(`${this.UrlA}/save`, newAdmin);
  }

  getUsers(): Observable<any[]> {
    return this.http.get(this.Url + '/all', this.options)
    .map((response: Response) => response.json())
      .catch(this.errorHandler);

  }
  getUser(id: Number) {
    return this.http.get(this.Url + '/user/' + id, this.options)
    .map((response: Response) => response.json()).catch(this.errorHandler);
  }

  deleteUser(id: Number) {
    return this.http.delete(this.Url + '/user/' + id, this.options)
    .map(response => response);

  }

  updateUser(user: User) {
    this.http.put(this.Url + '/user/', JSON.stringify(user), this.options)
    .catch(this.errorHandler);

  }
setter(user: User) {
    this.user = user;
  }
  getter() {
    return this.user;
  }
  errorHandler(error: Response) {
    return Observable.throw(error || "SERVER ERROR");
  }

}
