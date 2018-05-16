import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../model/customer';
import { User } from '../../../model/customer.model';
import { Order } from '../../../model/order';
import { OrderService } from '../../../services/manageOrder/order.service';
import { Router } from '@angular/router';
import { ManageAccountService } from '../../../services/manageAccount/manage-account.service';
import { ManageCustomerService } from '../../../services/manage-customer/manage-customer.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  private orders: Order[];
  order: Order;
  private user: User;
  loggedInUserName: string;
  deleteDisabled = false;
  updateDisabled = false;
  

  // tslint:disable-next-line:max-line-length
  constructor(private _orderService: OrderService, private _router: Router, private _userService: ManageAccountService, private _customerService: ManageCustomerService) { }

  ngOnInit() {
   this._orderService. getOrders()
      .subscribe((ordersReturned) => {

        this.orders = ordersReturned;

        console.log(this.orders);

      }, (error) => {

        console.log(error);

      });

    this.getLoggedInUser();
  }

  updateOrder(order) {

    this._orderService.setterForOrder(order);
    this._router.navigate(['/update-orders']);

  }

  deleteOrder(order) {

    this._orderService.deleteOrder(order.orderID)
      .subscribe((data) => {
        this.orders.splice(this.orders.indexOf(order), 1);
        console.log(data);
      }, (error) => {
        console.log(error);
      });
  }

  getLoggedInUser() {

    this._userService.getUserByUserName(this.loggedInUserName)
      .subscribe((userLoggedIn) => {

        this.user = userLoggedIn;

        if (this.user.roles[0].name !== 'Admin') {

          this.deleteDisabled = true;
          this.updateDisabled = true;

        } else {

          this.deleteDisabled = false;
          this.updateDisabled = false;

        }

      }, (error) => {
        console.log(error);
      });

  }
  logOut()
  {
    localStorage.clear();
    this._router.navigate(['/home']);
    
  }
}
