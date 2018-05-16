import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../model/product';
import { ManageProductService } from '../../services/manageProduct/manageProduct';
import { Supplier } from '../../model/supplier';
import { SupplierService } from '../../services/manageSupplier/supplier.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    private product: Product;
    private suppliers: Supplier[];
    private supplier: Supplier;
  
    // tslint:disable-next-line:max-line-length
    constructor(private _productService: ManageProductService,  private _router: Router, private _supplierService: SupplierService) { }
  
    ngOnInit() {
      this.product = new Product();

      this.supplier = new Supplier();
      this.product.supplier = null;
      this.product = this._productService.getter();
  
    this._supplierService.getAllSuppliers()
    .subscribe((suppliersReturned) => {
  
      this.suppliers = suppliersReturned;
  
    }, (error) => {
  
      console.log(error);
    });
  
    }
  
    saveProduct(): void {
  
      if (this.product.productId == undefined) {
        this._productService.addProduct(this.product)
          .subscribe((savedProduct) => {
            console.log(savedProduct);
            this._router.navigate(['/home']);
            let note = "Product Successfully Added";
            alert(note);
          }, (error) => {
            console.log(error);
          });
  
      } else {
        this._productService.updateProduct(this.product)
          .subscribe((updatedProduct) => {
            console.log(updatedProduct);
            this._router.navigate(['/supplier']);
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