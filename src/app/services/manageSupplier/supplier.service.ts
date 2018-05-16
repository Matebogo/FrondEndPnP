import { Injectable } from '@angular/core';
import { Supplier } from '../../model/supplier';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions,Headers,Response } from '@angular/http';

@Injectable()
export class SupplierService {

  private baseUrl = 'http://localhost:8080/supplier';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private requestOptions = new RequestOptions({ headers: this.headers });

  constructor(private _http: Http) { }

  errorHandler(error: Response) {
    return Observable.throw(error || 'Server Error');
  }

  getAllSuppliers() {

    return this._http.get(this.baseUrl + '/all', this.requestOptions)
    .map((response: Response) => response.json())
    .catch(this.errorHandler);

  }

  addSupplier(supplier: Supplier) {

    return this._http.post(this.baseUrl + '/save', JSON.stringify(supplier) , this.requestOptions)
    .map((response: Response) => response.json)
    .catch(this.errorHandler);

  }

  deleteSupplier(supplierID: number) {

    return this._http.delete(this.baseUrl + '/delete/' + supplierID, this.requestOptions)
    .map((response: Response) => response.json)
    .catch(this.errorHandler);


  }


}
