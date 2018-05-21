import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ManageProductService } from '../../services/manageProduct/manageProduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
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
  logOut()
      {
        localStorage.clear();
        this.router.navigate(['/home']);
        
      }
    }
