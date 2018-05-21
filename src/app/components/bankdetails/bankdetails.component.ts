
import { Router } from '@angular/router';
import { Bank } from '../../model/bank';
import { Customer } from '../../model/customer';
import { BankDetail } from '../../model/bank-details';
import { ManageBankService } from '../../services/manageBank/manage-bank.service';
import { ManageCustomerService } from '../../services/manage-customer/manage-customer.service';
import { ManageBankDetailsService } from '../../services/manageBank/manage-bank-details.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-bankdetails',
  templateUrl: './bankdetails.component.html',
  styleUrls: ['./bankdetails.component.css']
})
export class BankdetailsComponent implements OnInit {

  private banks: Bank[];
  loggedInCustomer: string;
  private customer: Customer;
  private bankDetail: BankDetail;
  form: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private _bankService: ManageBankService,
     private _customerService: ManageCustomerService,
      private _router: Router, 
      private _bankDetailService: ManageBankDetailsService) { }

  ngOnInit() {

    this.customer = new Customer();
    this.bankDetail = new BankDetail();
    this.form = new FormGroup({
      cardHolder: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
      cvc: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)])

    })
  }

  getLoggedInCustomer() {

    if (localStorage.getItem("loggedInUser") != null) {

      this.loggedInCustomer = JSON.parse(localStorage.getItem("loggedInUser")).username;

      this._customerService.getCustomerByUserName(this.loggedInCustomer)
        .subscribe((customerLoggedIn) => {

          console.log(customerLoggedIn);

          this.customer = customerLoggedIn;
          this.bankDetail.customer = this.customer;
          this.bankDetail.customer.id = this.customer.id;
          this.bankDetail.userID = this.customer.id;

         

        }, (error) => {

          console.log(error);

        });
    } else {
      this._router.navigate(['/login']);
    }
  }


  saveBankingDetails() {

    this._bankDetailService.createAccount(this.bankDetail)
      .subscribe((savedBankingDetails) => {

        console.log(savedBankingDetails);
        let messageNotification = 'Thank you ' + JSON.parse(localStorage.getItem("loggedInUser")).username+ ', Your Orders will be delivered within 2-3 days';

        alert(messageNotification);
        this._router.navigate(['/customer-page']);

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