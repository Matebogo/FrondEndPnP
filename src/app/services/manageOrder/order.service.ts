import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Order } from '../../model/order';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions,Response,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OrderService {
  private baseUrl = 'http://localhost:8080/Orders';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //private requestOptions = new RequestOptions({ headers: this.headers });

  private order: Order = new Order();

  constructor(private http: HttpClient) { }

  errorHandler(error: Response) {
    return Observable.throw(error || 'Server Error');
  }

  getOrders() {

    return this.http.get(this.baseUrl + '/orders', { headers: this.headers })
    .map((response) => response)
    .catch(this.errorHandler);

  }

  getOrder(orderID: number) {

    return this.http.get(this.baseUrl + '/single-order/' + orderID, { headers: this.headers })
    .map((response) => response)
    .catch(this.errorHandler);

  }

  createOrder(order: Order) {

    return this.http.post(this.baseUrl + '/save', JSON.stringify(order), { headers: this.headers })
    .map((response) => response)
    .catch(this.errorHandler);

  }

  deleteOrder(orderID: number) {

    return this.http.delete(this.baseUrl + '/delete-order/' + orderID, { headers: this.headers })
    .map((response) => response)
    .catch(this.errorHandler);

  }

  getOrderByUserEmail(email: string) {

    return this.http.get(this.baseUrl + '/user-order-by-email/' + email, { headers: this.headers })
    .map((response) => response)
    .catch(this.errorHandler);

  }
  getCustomerOrders(id: number) {

    return this.http.get(this.baseUrl + '/cusotmer-orders/' + id, { headers: this.headers })
    .map((response) => response)
    .catch(this.errorHandler);

  }
  updateOrder(order: Order) {

    return this.http.put(this.baseUrl + '/update-order', JSON.stringify(order), { headers: this.headers })
    .map((response) => response)
    .catch(this.errorHandler);

  }

  setterForOrder(ordered: Order) {

    this.order = ordered;
  }

  getterOrder() {

    return this.order;
  }
}
