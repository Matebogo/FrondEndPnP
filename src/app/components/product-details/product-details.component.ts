import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { CartService } from '../../services/manageCart/manage-cart.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CartItem } from '../../model/cart';
import { ManageProductService } from '../../services/manageProduct/manageProduct';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  private product: Product;
  increaseQuantity = 1;
  cartItem: CartItem;


  constructor(private productService: ManageProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    this.cartItem = new CartItem();
    this.product = new Product();
    const productId: number = this.activatedRoute.snapshot.params['productId'];

    this.productService.getOneProduct(productId).subscribe((data) => {
      console.log(data);
      this.product = data;
    }, (error) => {
      console.log(error);
    }
    )
  }
  increase() {

    this.increaseQuantity++;

  }
  decrease() {

    this.increaseQuantity--;

  }
  addToCart() {

    if (localStorage.getItem('loggedInUser') === null) {

      this.router.navigate(['/login']);

    } else {

      this.cartItem.product = this.product;
      this.cartItem.count = this.increaseQuantity;

      this.cartService.addToCart(this.cartItem)
        .subscribe((addedItem) => {
          console.log(addedItem);
          this.router.navigate(['/cart']);

        });

    }

  }
  logOut()
      {
        localStorage.clear();
        this.router.navigate(['/home']);
        
      }
}
