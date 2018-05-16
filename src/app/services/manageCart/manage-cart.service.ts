import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CartItem } from '../../model/cart';


@Injectable()
export class CartService {
  private url: string = "http://localhost:8080/cart";
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private requestOptions = new RequestOptions({ headers: this.headers });

  constructor(private http:Http) { }
  
  getCartSize() {

    return this.http.get(this.url + '/cart-size',this.requestOptions)
    .map((response: Response) => response.json())
    .catch(this.errorHandler);

  }

  getCartTotalPrice() {

    return this.http.get(this.url + '/total',this.requestOptions)
    .map((response: Response )=> response.json())
    .catch(this.errorHandler);
  }

  getCartItems() {

    return this.http.get(this.url + '/cart-items',this.requestOptions)
    .map((response: Response )=> response.json())
    .catch(this.errorHandler);
  }

  addToCart(cartItem: CartItem) {

    return this.http.post(this.url + '/add-item', JSON.stringify(cartItem),this.requestOptions)
    .map((response: Response )=> response.json)
    .catch(this.errorHandler);

  }

  removeFromCart(cartItem: CartItem) {

    return this.http.put(this.url + '/remove-item', JSON.stringify(cartItem),this.requestOptions)
    .map((response: Response )=> response.json)
    .catch(this.errorHandler);

  }

  removeAllItems() {

    return this.http.delete(this.url + '/remove-all-items',this.requestOptions)
    .map((response: Response )=> response.json)
    .catch(this.errorHandler);
  }
  errorHandler(error: Response) {
    return Observable.throw(error || "Error")
  }

}

