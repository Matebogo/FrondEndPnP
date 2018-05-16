import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../model/cart';
import { Product } from '../../../model/product';
import { Customer } from '../../../model/customer';
import { OrderService } from '../../../services/manageOrder/order.service';
import { Router } from '@angular/router';
import { Order } from '../../../model/order';
import { ManageCustomerService } from '../../../services/manage-customer/manage-customer.service';
import { ManageAccountService } from '../../../services/manageAccount/manage-account.service';
import { User } from '../../../model/customer.model';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit {


  cartItems: CartItem[];
  products = new Array();
  product: Product;
  private user: User;
  private order: Order;
  loggedInUser: string;
  cartGrandTotal: number;
  currentDate: Date;
  numberOrder: number;
users: any;

  // tslint:disable-next-line:max-line-length
  constructor(private _orderService: OrderService,private account:ManageAccountService, private _router: Router, private _customerService: ManageCustomerService) { }

  ngOnInit() {

    this.user = new User();
    this.product = new Product();
    this.order = new Order();

    this.getLoggedInUser();
    this.getCartItems();
    this.getCartGrandTotal();
    this.getCurrentDate();
  }

  returnOrderNumber(): number {

    return this.user.userID;
  }



  getProductsFromCartItems(): Product[] {

    for (let index = 0; index < this.cartItems.length; index++) {

      if (this.cartItems.length !== 0) {

        this.product = this.cartItems[index].product;
        this.products.push(this.product);

      }

    }

    return this.products;

  }



  getLoggedInUser() {

    console.log(localStorage.getItem("loggedInUser"));

    if (localStorage.getItem("loggedInUser") != null) {

       this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')).username;

      
     //this.loggedInUser = this.users;
     console.log(this.loggedInUser);

      this.account.getUserByUserName(this.loggedInUser)
        .subscribe((data) => {

          console.log(data);

          this.user = data;
          this.order.userID = this.user.userID;
          this.order.orderNumber = this.user.userID;

        }, (error) => {

          console.log(error);

        });
    } else {
      this._router.navigate(['/login']);
    }
  }

  getCartItems() {

    if (localStorage.getItem('cartItems') != null) {

      this.cartItems = JSON.parse(localStorage.getItem('cartItems')).items;
      console.log(this.cartItems);

    } else {

      this._router.navigate(['/cart']);
    }

  }

  getCartGrandTotal(): number {

    if (localStorage.getItem('cartGrandTotal') != null) {

      this.cartGrandTotal = JSON.parse(localStorage.getItem('cartGrandTotal'));
      console.log(this.cartGrandTotal);

    } else {

      this._router.navigate(['/cart']);

    }

    return this.cartGrandTotal;
  }


  getCurrentDate(): Date {

    return this.currentDate = new Date();

  }


  createOrder() {

    this.order.amount = this.getCartGrandTotal();
    this.order.dateCreated = new Date();
    this.order.userID = this.user.userID;
    this.order.firstname = JSON.parse(localStorage.getItem('loggedInUser')).username;

    console.log(this.order);

    this._orderService.createOrder(this.order)
      .subscribe((orderDetails) => {
        
        this._router.navigate(['/order'])
      }, (error) => {
        console.log(error);
      });

  }
  bankDetails() {

    if (localStorage.getItem('cartGrandTotal').startsWith('0')) {

	  let note = "Your cart is empty!!";
	  alert(note);

   	 } else {

      this._router.navigate(['/order']);

    	}
    }
    logOut()
      {
        localStorage.clear();
        this._router.navigate(['/home']);
        
      }

}
