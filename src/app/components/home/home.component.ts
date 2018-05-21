import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../model/product';
import { ManageProductService } from '../../services/manageProduct/manageProduct';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  private products: Product[];
  product: Product;
  constructor(private services: ManageProductService, private router: Router) { }

  ngOnInit() {
    this.services.getProduct().subscribe((products)=>
    {
      console.log(products);
     this.products=products;
    },(error)=>{
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
