import { Injectable } from '@angular/core';
import { RequestOptions, Http,Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Driver } from '../../model/driver';

@Injectable()
export class DriverService {

  private baseUrl = 'http://localhost:8080/driver';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private requestOptions = new RequestOptions({ headers: this.headers });

  constructor(private _http: Http) { }

  errorHandler(error: Response) {
    return Observable.throw(error || 'Server Error');
  }

  getAllDrivers() {

    return this._http.get(this.baseUrl + '/all', this.requestOptions)
    .map((response: Response) => response.json())
    .catch(this.errorHandler);

  }

  addDriver(pnpDriver: Driver) {

    return this._http.post(this.baseUrl + '/save', JSON.stringify(pnpDriver) , this.requestOptions)
    .map((response: Response) => response.json)
    .catch(this.errorHandler);

  }

  deleteDriver(pnpDriverID: number) {

    return this._http.delete(this.baseUrl + '/delete/' + pnpDriverID, this.requestOptions)
    .map((response: Response) => response.json)
    .catch(this.errorHandler);

  }

}
