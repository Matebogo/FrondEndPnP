import { Component, OnInit } from '@angular/core';
import { Order } from '../../../model/order';
import { OrderService } from '../../../services/manageOrder/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-orders',
  templateUrl: './update-orders.component.html',
  styleUrls: ['./update-orders.component.css']
})
export class UpdateOrdersComponent implements OnInit {

  private order: Order;

  constructor(private _orderService: OrderService, private _router: Router) { }

  ngOnInit() {

    this.order = new Order();
    this.order = this._orderService.getterOrder();

  }

  updateOrderStatus() {

    if (this.order.orderID === undefined) {

      this._orderService.createOrder(this.order)
      .subscribe((createdOrder) => {

        console.log(createdOrder);
        this._router.navigate(['/view-orders']);

      }, (error) => {

        console.log(error);

      });

    } else {

      this._orderService.updateOrder(this.order)
        .subscribe((updatedOrder) => {

          console.log(updatedOrder);
          this._router.navigate(['/view-orders']);

        }, (error) => {

          console.log(error);

        });
    }

  }
  logOut()
  {
    localStorage.clear();
    this._router.navigate(['/home']);
    
  }
}
