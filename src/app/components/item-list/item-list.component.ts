import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Product } from '../../model/product';
import { ManageProductService } from '../../services/manageProduct/manageProduct';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {


  
  private products: Product[];
  product: Product;
  constructor(private services: ManageProductService, private router: Router) { }

  ngOnInit() {
    this.services.getProduct().subscribe((products)=>
    {
      console.log(products);
     this.products=products;
    },(error)=>{
      console.log(error);
    }
    )

  }
  deleteProduct(product:Product) {
      this.services.deleteProduct(product.productId).subscribe((data) => {
      this.products.splice(this.products.indexOf(product), 1);

    }, (error) => {
      console.log(error);
    }
    )
  }
  updateProduct(product) {
    this.services.setter(product);
    this.router.navigate(['/product']);
  }

  productDetails(){
    this.router.navigate(['/item-list/:productId']);
  }
  logOut()
  {
    localStorage.clear();
    this.router.navigate(['/home']);
    
  }
}
