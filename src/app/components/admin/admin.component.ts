import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { ManageAccountService } from '../../services/manageAccount/manage-account.service';
import { User } from '../../model/customer.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    user: User
    form: FormGroup;


    constructor(private account: ManageAccountService, private router: Router) { }

    ngOnInit() {
        this.user = new User();
        this.user = this.account.getter();  
        this.form = new FormGroup({
            firstname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]')]),
            surname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]')]),
            email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z][a-zA-Z]')]),
            password: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.pattern('[a-zA-Z][a-zA-Z]')])

        })
    }
    register() {
      
        this.account.register(this.user)
            .subscribe((res: any) => {
                let note = "saved successfully ";
                alert(note);
                
           });
    }
    logOut()
      {
        localStorage.clear();
        this.router.navigate(['/home']);
        
      }

}
