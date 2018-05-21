import { Component, OnInit } from '@angular/core';
import { ManageProductService } from '../../services/manageProduct/manageProduct';
import { Router } from '@angular/router';
import { User } from '../../model/customer.model';
import { ManageAccountService } from '../../services/manageAccount/manage-account.service';
import { Product } from '../../model/product';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  private products: Product[];
  product :Product;
  private user: User;
  loggedInUser: string;
  snackBarText: string;



  // tslint:disable-next-line:max-line-length
  constructor(private _productService: ManageProductService, 
    private _router: Router, private userService: ManageAccountService,
     private _matSnackBar: MatSnackBar
    ) { }
    ngOnInit() {

      this.user = new User();
      this.product = new Product();
  
            this._productService.productsBySupplier(JSON.parse(localStorage.getItem('loggedInUser')).id)
              .subscribe((productsReturned) => {
  
                this.products = productsReturned;
  
                console.log(this.products);
  
                for (let index = 0; index < this.products.length; index++) {
  
                  if (this.products[index].minimumQuantity >= this.products[index].quantity) {
  
                    console.log(false);
  
                    this.snackBarText = this.products[index].productName + ' is running out of stock!!!';
  
                    this.openDialog(this.snackBarText);
  
                  } else {
  
                    console.log(true);
  
                  }
  
  
                }
  
  
              }, (error) => {
                console.log(error);
              });
      }
  
    updateProducts(product) {
  
      this._productService.setter(product);
      this._router.navigate(['/updateProduct']);
  
    }
  
    openDialog(text: string) {
  
      this._matSnackBar.open(text, 'Ok', {
        duration: 10000
      });
  
    }
  logOut()
  {
    localStorage.clear();
    this._router.navigate(['/home']);
    
  }

}
