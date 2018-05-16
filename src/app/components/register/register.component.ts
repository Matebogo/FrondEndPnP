import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ManageAccountService } from '../../services/manageAccount/manage-account.service';
import { User } from '../../model/customer.model';
import { RoleserviceService } from '../../services/manageRole/roleservice.service';
import { RepositoryService } from '../../services/manageAccount/repository.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    user: User
    form: FormGroup;


    constructor(private account: ManageAccountService, private router: Router,
        private users: RoleserviceService) { }

    ngOnInit() {
        this.user = new User();
        this.user = this.users.getter();
        this.form = new FormGroup({
            firstname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
            surname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
            email: new FormControl('', [Validators.required, Validators.email]),
            username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
            password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
        })
    }
    addUser() {

        this.users.register(this.user)
            .subscribe((res: any) => {
                let note = "Admin saved successfully ";
                alert(note);
                this.form.reset();
                this.router.navigate(["/admin-page"]);

            });
    }
    registerD() {
        this.users.registerD(this.user)
            .subscribe((Response: any) => {
                let msg = "Driver has Successfully Added";
                alert(msg);
                this.form.reset();
                this.router.navigate(["/admin-page"]);
            })
    }
    registerS() {
        this.users.registerS(this.user)
            .subscribe((Response: any) => {
                let msg = "Supplier has Successfully Added";
                alert(msg);
                this.form.reset();
                this.router.navigate(["/admin-page"]);
            })
    }
    registerA() {
        this.users.registerA(this.user)
            .subscribe((Response: any) => {
                let msg = "Admin has Successfully Added";
                alert(msg);
                this.form.reset();
                this.router.navigate(["/admin-page"]);
            })
    }
    logout() {

        localStorage.clear();
    
        this.router.navigate(["/home"]);
      }
}
