import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { LoginModel } from '../../model/login-model';
import { RequestOptions, Response, Http, Headers } from '@angular/http';
import { Customer } from '../../model/customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ManageCustomerService {


  private url: string = "http://localhost:8080/customer";
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });
  //private requestOptions = new RequestOptions({ headers: this.header });



  customer: Customer = new Customer();
  private customers: Customer[];
  constructor(private http: HttpClient) { }

  getAllCustomers() {

    return this.http.get(this.url + '/all', { headers: this.header })
      .map((response) => response)
      .catch(this.errorHandler);

  }

  getCustomer(id: Number) {

    return this.http.get(this.url + '/details/' + id, { headers: this.header })
      .map((response) => response)
      .catch(this.errorHandler);

  }

  getCustomerByUserName(username: string) {

    return this.http.get(this.url + '/find-by-username/' + username, { headers: this.header })
      .map((response) => response)
      .catch(this.errorHandler);

  }


  deleteCustomer(id: Number) {

    return this.http.delete(this.url + '/delete/' + id, { headers: this.header })
      .map((response) => response)
      .catch(this.errorHandler);

  }


  createCustomer(customer: Customer) {

    return this.http.post(this.url + '/save', JSON.stringify(customer), { headers: this.header })
      .map((response) => response)
      .catch(this.errorHandler);

  }

  updateCustomer(customer: Customer) {

    return this.http.put(this.url + '/update', JSON.stringify(customer), { headers: this.header })
      .map((response) => response)
      .catch(this.errorHandler);

  }

  setterCustomer(customer: Customer) {

    this.customer = customer;
  }

  getterCustomer() {

    return this.customer;
  }
  errorHandler(error: Response) {
    return Observable.throw(error || 'Server Error');
  }

  loginCustomer(customer: Customer) {

    return this.http.post(this.url + '/login-user', JSON.stringify(customer), { headers: this.header })
      .map((response) => response)
      .catch(this.errorHandler);

  }

}
