import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageAccountService } from '../../services/manageAccount/manage-account.service';
import { LoginModel } from '../../model/login-model';
import { User } from '../../model/customer.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: LoginModel
  user: User;
  private users:User[];
  errorMessage: string;
  loggedIn = false;
  username: string;
  constructor(private account: ManageAccountService, private router: Router) { }

  ngOnInit() {
    this.user = new User();
    //this.users = this.account.getUser();
  }

  redirectBasedOnUserRole(role: string) {

    switch (role) {
      case 'Admin':
        this.router.navigate(['/admin-page']);
        break;

      case 'Customer':
        this.router.navigate(['/customer-page']);

        break;

      case 'Driver':
        this.router.navigate(['/driver']);
        break;

      case 'Supplier':
        this.router.navigate(['/supplier']);
        break;

      default:

        this.router.navigate(['/home']);

        break;
    }
  }

  onSubmit() {
    this.account.loginUser(this.user.username, this.user.password).subscribe((data) => {
      console.log(data);
      if (data) {
        this.loggedIn = true;

        this.account.setter(this.user);
        localStorage.setItem("loggedInUser", JSON.stringify(data));

        this.redirectBasedOnUserRole(
          JSON.parse(localStorage.getItem('loggedInUser')).roles[0].name
        );
      } else if (data === null) {
        this.loggedIn = false;

        this.router.navigate(['/login']);
        this.errorMessage = "Username or password incorrect!!"


      }
    }, (error) => {
      console.log(error);
    });
  }
  logOut()
  {
    localStorage.clear();
    this.router.navigate(['/home']);
    
  }
}
