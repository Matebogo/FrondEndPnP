import { Component, OnInit } from '@angular/core';
import { Order } from '../../../model/order';
import { User } from '../../../model/customer.model';
import { OrderService } from '../../../services/manageOrder/order.service';
import { ManageAccountService } from '../../../services/manageAccount/manage-account.service';
import { ManageCustomerService } from '../../../services/manage-customer/manage-customer.service';


@Component({
  selector: 'app-customerorders',
  templateUrl: './customerorders.component.html',
  styleUrls: ['./customerorders.component.css']
})
export class CustomerordersComponent implements OnInit {

  private customerOrders: Order[];
  loggedInCustomer: string;
  private user: User;

  constructor(private orderService: OrderService, private userService: ManageCustomerService) { }

  ngOnInit() {

    this.user = new User();

    if (localStorage.getItem('loggedInUser') !== null) {

      this.loggedInCustomer = JSON.parse(localStorage.getItem('loggedInUser')).username;

      this.userService.getCustomerByUserName(this.loggedInCustomer)
        .subscribe((userReturned) => {

          this.user = userReturned;

          this.orderService.getCustomerOrders(this.user.userID)
            .subscribe((orders) => {

              this.customerOrders = orders;

              console.log(this.customerOrders);

            }, (error) => {

              console.log(error);

            });

        }, (error) => {

          console.log(error);

        });


    }
  }

}