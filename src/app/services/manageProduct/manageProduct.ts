import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RepositoryService } from '../manageAccount/repository.service';
import { Product } from '../../model/product';
import { Observable } from 'rxjs/Observable';
import { RequestOptions,Response, Http, Headers } from '@angular/http';

@Injectable()
export class ManageProductService {
  private product: Product = new Product();
  private urlProduct:string = "http://localhost:8080/product"
  private header = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({headers:this.header})

  
  constructor( private http: Http,private repo : RepositoryService) { }

  addProduct(product : Product )
  {
      return this.http.post(`${this.urlProduct}/add`, product, this.options)
  }
  getProduct()
  {
    return this.http.get(this.urlProduct+'/getAll', this.options)
    .map((response: Response) => response.json())
    .catch(this.errorHandler);
  }
  getOneProduct(productId:number)
  {
    return this.http.get(this.urlProduct + '/getProduct/'+ productId , this.options)
    .map((response: Response) => response.json())
    .catch(this.errorHandler);
  }
  productsBySupplier(supplierID: number) {

    return this.http.get(this.urlProduct + '/productSupplier/' + supplierID, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);

  }
  deleteProduct(id:number)
  {
   return this.http.delete(this.urlProduct+'/delete/'+ id)
   .map((response: Response) => response.json)
   .catch(this.errorHandler);
  }
  updateProduct(product:Product)
  {
    return this.http.put(this.urlProduct+'/update', product)
    .map((response: Response) => response.json)
    .catch(this.errorHandler);
     
  }
  errorHandler(error: Response) {
    return Observable.throw(error || "Error")
  }
  setter(product:Product)
  {
    this.product=product;
  }
  getter()
  {
    return this.product;
  }
}
