import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class CheckoutServiceService {

  private url: String = "http://localhost:8080/checkout";

  constructor(private http: HttpClient) { }

  getUserOrders() {
  	
  }

}
