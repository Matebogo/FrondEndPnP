import { Component, OnInit } from '@angular/core';
import { Driver } from '../../model/driver';
import { Router } from '@angular/router';
import { DriverService } from '../../services/manageDriver/driver.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  private drivers:Driver[];
  driver:Driver;

  constructor(
    private driverAccount:DriverService,
    private router: Router) { }

  ngOnInit() {
    this.driverAccount.getAllDrivers().subscribe((data) => {
      console.log(data);
      this.drivers = data;
    }, (error) => {
      console.log(error);
    }
    )

  }
  deleteUser(driver) {
    this.driverAccount.deleteDriver(driver.id).subscribe((data) => {
      this.drivers.splice(this.drivers.indexOf(driver), 1);

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
