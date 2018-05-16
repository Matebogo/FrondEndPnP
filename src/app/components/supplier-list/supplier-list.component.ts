import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../model/supplier';
import { SupplierService } from '../../services/manageSupplier/supplier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit { 
  private suppliers:Supplier[];
  supplier:Supplier;

  constructor(
    private supplierAccount:SupplierService,
    private router: Router) { }

  ngOnInit() {
    this.supplierAccount.getAllSuppliers().subscribe((data) => {
      console.log(data);
      this.suppliers = data;
    }, (error) => {
      console.log(error);
    }
    )

  }
  deleteUser(supplier) {
    this.supplierAccount.deleteSupplier(supplier.id).subscribe((data) => {
      this.suppliers.splice(this.suppliers.indexOf(supplier), 1);

    }, (error) => {
      console.log(error);
    }
    )
  }
  logOut()
      {
        localStorage.clear();
        this.router.navigate(['/home']);
        
      }
}
