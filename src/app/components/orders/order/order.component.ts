import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../model/cart';
import { Product } from '../../../model/product';
import { Customer } from '../../../model/customer';
import { Order } from '../../../model/order';
import { OrderService } from '../../../services/manageOrder/order.service';
import { ManageCustomerService } from '../../../services/manage-customer/manage-customer.service';
import { ManageProductService } from '../../../services/manageProduct/manageProduct';
import { Router } from '@angular/router';
import { User } from '../../../model/customer.model';
import { ManageAccountService } from '../../../services/manageAccount/manage-account.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  
  cartItems: CartItem[];
  products = new Array();
  product: Product;
  private user: User;
  private order: Order;
  loggedInCustomer: string;
  cartGrandTotal: number;
  currentDate: Date;
  currentTime: Date;
  numberOrder: number;
  productsFromDatabase: Product[];
  productToBeUpdated: Product;
  updatedQuantity: number;

  // tslint:disable-next-line:max-line-length
  constructor(private _orderService: OrderService, private _router: Router,
     private _customerService: ManageCustomerService, 
     private account :ManageAccountService,
    private _productService: ManageProductService
   ) { }

  ngOnInit() {

    this.user = new User();
    this.product = new Product();
    this.order = new Order();
    this.productToBeUpdated = new Product();

    this.getLoggedInCustomer();
    this.getCartItems();
    this.getCartGrandTotal();
    this.getCurrentDate();
    this.getCurrentTime();
    this.getAllProductsFromDatabase();

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

  returnOrderNumber(): number {

    return this.user.userID;
  }

  getCurrentTime(): Date {

    return this.currentTime = new Date();

  }


  getLoggedInCustomer() {

    if (localStorage.getItem("loggedInUser") != null) {

      this.loggedInCustomer = JSON.parse(localStorage.getItem("loggedInUser")).username;

      this.account.getUserByUserName(this.loggedInCustomer)
        .subscribe((customerLoggedIn) => {

          console.log(customerLoggedIn);

          this.user = customerLoggedIn;
          this.numberOrder = this.user.userID;

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

      this._router.navigate(['/login']);
    }

  }

  getCartGrandTotal(): number {

    if (localStorage.getItem('cartGrandTotal') != null) {

      this.cartGrandTotal = JSON.parse(localStorage.getItem('cartGrandTotal'));
      console.log(this.cartGrandTotal);

    } else {

      this._router.navigate(['/login']);

    }

    return this.cartGrandTotal;
  }

  getAllProductsFromDatabase() {

    this._productService.getProduct()
      .subscribe((ps) => {
        this.productsFromDatabase = ps;
      }, (error) => {
        console.log(error);
      });

  }

  subtractProductQuantity() {

    if (this.cartItems.length !== 0) {

      for (let index = 0; index < this.cartItems.length; index++) {

        if (this.productsFromDatabase[index].productName === this.cartItems[index].product.productName) {

          console.log(this.cartItems.length);
          this.updatedQuantity = this.productsFromDatabase[index].quantity - this.cartItems[index].count;

          this.productToBeUpdated.quantity = this.updatedQuantity;
          this.productToBeUpdated.picture = this.cartItems[index].product.picture;
          this.productToBeUpdated.productName = this.cartItems[index].product.productName;
          this.productToBeUpdated.productId = this.cartItems[index].product.productId;      
          this.productToBeUpdated.picture = this.cartItems[index].product.picture;

          this._productService.updateProduct(this.productToBeUpdated)
            .subscribe((data) => {

            }, (error) => {

              console.log(error);

            });
        }
      }

    }
  }

  MakeOrder() {

    this.order.amount = this.getCartGrandTotal();
    this.order.dateCreated = new Date();
    this.order.orderNumber = this.user.userID;
    this.order.userID = this.user.userID;
    this.order.firstname = this.user.firstname;

    console.log(this.order)

    this._router.navigate(['/bankdetails']);

  }

  getCurrentDate(): Date {


    return this.currentDate = new Date();


  }
  logOut()
      {
        localStorage.clear();
        this._router.navigate(['/home']);
        
      }
}

