import { Component, OnInit } from '@angular/core';
import { User } from '../../model/customer.model';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ManageCustomerService } from '../../services/manage-customer/manage-customer.service';
import { Router } from '@angular/router';
import { Customer } from '../../model/customer';
import { ManageAccountService } from '../../services/manageAccount/manage-account.service';
import { RepositoryService } from '../../services/manageAccount/repository.service';
import { RoleserviceService } from '../../services/manageRole/roleservice.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {


  customer: Customer
  form: FormGroup;
  errorMessage: string;
  loggedIn = false;


  constructor(private account: ManageAccountService,
    private router: Router,
    private customerService: ManageCustomerService,
    private users: RoleserviceService,
    private data: RepositoryService) { }

  ngOnInit() {
    this.customer = new Customer();
    this.customer = this.customerService.getterCustomer();
    this.form = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
      surname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])

    })
  }
  registerC() {

    this.users.registerC(this.customer)
      .subscribe((res: any) => {
        let note = "Customer saved successfully ";
        alert(note);
        this.router.navigate(['/login']);

      });
  }
  logOut()
  {
    localStorage.clear();
    this.router.navigate(['/home']);
    
  }

}
