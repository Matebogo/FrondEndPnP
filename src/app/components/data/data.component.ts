import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ManageAccountService } from '../../services/manageAccount/manage-account.service';
import { User } from '../../model/customer.model';
import { Supplier } from '../../model/supplier';
import { Driver } from '../../model/driver';
import { SupplierService } from '../../services/manageSupplier/supplier.service';
import { DriverService } from '../../services/manageDriver/driver.service';
import { Customer } from '../../model/customer';
import { ManageCustomerService } from '../../services/manage-customer/manage-customer.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  private customers: Customer[];
  customer: Customer;


  constructor(private services: ManageCustomerService, 
    private supplierAccount:SupplierService,
    private driverAccount :DriverService,
    private router: Router) { }

  ngOnInit() {
    this.services.getAllCustomers().subscribe((data) => {
      console.log(data);
      this.customers = data;
    }, (error) => {
      console.log(error);
    }
    )

  }
  deleteUser(customer) {
    this.services.deleteCustomer(customer.id).subscribe((data) => {
      this.customers.splice(this.customers.indexOf(customer), 1);

    }, (error) => {
      console.log(error);
    }
    )
  }
  updateUser(customer) {
    this.services.setterCustomer(customer);
    this.router.navigate(['/register']);
  }
  logOut()
  {
    localStorage.clear();
    this.router.navigate(['/home']);
    
  }
}


