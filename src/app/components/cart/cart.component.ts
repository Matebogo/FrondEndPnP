import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Product } from '../../model/product';
import { CartItem } from '../../model/cart';
import { ShoppingCart } from '../../model/shoppingcart';
import { CartService } from '../../services/manageCart/manage-cart.service';




@Component({
	selector: 'app-shopping-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
	cartItems: CartItem[];
	cartItem: CartItem;
	cartGrandTotal = 0;

	constructor(private router: Router, private cartService: CartService) { }

	ngOnInit() {
		this.cartService.getCartItems()
			.subscribe((returnedCartItems) => {

				this.cartItems = returnedCartItems;
				localStorage.setItem('cartItems', JSON.stringify({ items: this.cartItems }));

				console.log(this.cartItems);
			}, (error) => {
				console.log(error);
			});

		this.getTotalCartPrice();
		this.cartItem = new CartItem();
	}

	getTotalCartPrice() {

		this.cartService.getCartTotalPrice()
			.subscribe((cartTotalPrice) => {

				this.cartGrandTotal = cartTotalPrice;
				localStorage.setItem('cartGrandTotal', JSON.stringify(this.cartGrandTotal));
				console.log(this.cartGrandTotal);

			}, (error) => {

				console.log(error);

			});

	}

	removeFromCart(cartItem) {

		this.cartService.removeFromCart(cartItem).subscribe((data) => {

			console.log(data);
			this.cartItems.splice(this.cartItems.indexOf(cartItem, 1));

			this.router.navigate(['/cart']);


		}, (error) => {
			console.log(error);
		});
	}

	removeAllItems() {

		this.cartService.removeAllItems()
			.subscribe((data) => {
				console.log(data);
				this.cartItems.length = 0;
				this.cartGrandTotal = 0;
			}, (error) => {
				console.log(error);
			});

	}

	bankDetails() {

    if (localStorage.getItem('cartGrandTotal').startsWith('0')) {

	  let note = "Your cart is empty!!";
	  alert(note);

   	 } else {

      this.router.navigate(['/order']);

    	}
  	}
	  logOut()
      {
        localStorage.clear();
        this.router.navigate(['/home']);
        
      }
}
