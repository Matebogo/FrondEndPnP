import { Component, OnInit } from '@angular/core';
import { ManageProductService } from '../../services/manageProduct/manageProduct';
import { Router } from '@angular/router';
import { Product } from '../../model/product';

@Component({
  selector: 'app-update-component',
  templateUrl: './update-component.component.html',
  styleUrls: ['./update-component.component.css']
})
export class UpdateComponentComponent implements OnInit {

  private product: Product;
  updatedQuantity = 0;

  constructor(private _productService: ManageProductService, private _router: Router) { }

  ngOnInit() {

    this.product = new Product();
    this.product = this._productService.getter();
  }


  updateProductQuantity() {

    this.updatedQuantity = this.updatedQuantity + this.product.quantity + this.product.badgeQuantity;

    this.product.quantity = this.updatedQuantity;

    this._productService.updateProduct(this.product)
    .subscribe((data) => {

      console.log(data);

      this._router.navigate(['/supplier']);

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
