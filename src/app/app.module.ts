import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, FormControl,FormGroup } from '@angular/forms';
import { AppComponent } from './app.component';
import { ManageAccountService } from './services/manageAccount/manage-account.service';
import { enableProdMode } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RepositoryService} from './services/manageAccount/repository.service';
import { HttpModule} from '@angular/http';
import { DataComponent } from './components/data/data.component';
import { ProductComponent } from './components/product/product.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingCartComponent } from './components/cart/cart.component';
import { CartService } from './services/manageCart/manage-cart.service';
import { ItemListComponent } from './components/item-list/item-list.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ManageCustomerService } from './services/manage-customer/manage-customer.service';
import { ManageProductService } from './services/manageProduct/manageProduct';
import { BankdetailsComponent } from './components/bankdetails/bankdetails.component';
import { CheckoutServiceService } from './services/checkoutService/checkout-service.service';
import { RoleserviceService } from './services/manageRole/roleservice.service';
import { ManageBankService } from './services/manageBank/manage-bank.service';
import { ManageBankDetailsService } from './services/manageBank/manage-bank-details.service';
import { OrderComponent } from './components/orders/order/order.component';
import { CustomerordersComponent } from './components/orders/customerorders/customerorders.component';
import { MakeOrderComponent } from './components/orders/make-order/make-order.component';
import { UpdateOrdersComponent } from './components/orders/update-orders/update-orders.component';
import { ViewOrderComponent } from './components/orders/view-order/view-order.component';
import { OrderService } from './services/manageOrder/order.service';
import { DriverComponent } from './components/driver/driver.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UpdateComponentComponent } from './components/update-component/update-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SupplierService } from './services/manageSupplier/supplier.service';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { DriverListComponent } from './components/driver-list/driver-list.component';
import { DriverService } from './services/manageDriver/driver.service';
import {MatSnackBarModule} from '@angular/material';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    AdminComponent,
    ProductComponent,
    DataComponent,
    AdminPageComponent,
    CustomerPageComponent,
    LoginComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    ItemListComponent,
    CustomerComponent,
    OrderComponent,
    BankdetailsComponent,
    CustomerordersComponent,
    MakeOrderComponent,
    UpdateOrdersComponent,
    ViewOrderComponent,
    SupplierComponent,
    DriverComponent,
    ProductListComponent,
    UpdateComponentComponent,
    SupplierListComponent,
    DriverListComponent
  
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', pathMatch: 'full', redirectTo: '/home' },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      {path : 'product', component:ProductComponent},
      {path : 'data' , component:DataComponent },
      {path : 'admin-page', component:AdminPageComponent},
      {path : 'customer-page', component:CustomerPageComponent},
      {path : 'admin', component:AdminComponent},
      {path : 'cart', component:ShoppingCartComponent},
      {path : 'item-list', component:ItemListComponent},
      {path : 'item-list/:productId', component:ProductDetailsComponent},
      {path : 'product-details', component:ProductDetailsComponent},
      {path : 'bankdetails', component:BankdetailsComponent},
      {path : 'customer', component:CustomerComponent},
      {path : 'order', component:OrderComponent},
      {path : 'make-order', component:MakeOrderComponent},
      {path : 'customerorders', component:CustomerordersComponent},
      {path : 'view-orders', component:ViewOrderComponent},
      {path : 'update-orders', component:UpdateOrdersComponent},
      {path : 'supplier', component:SupplierComponent},
      {path : 'driver', component:DriverComponent},
      {path : 'driver-list', component:DriverListComponent},
      {path : 'product-list', component:ProductListComponent},
      {path : 'supplier-list', component:SupplierListComponent},
      {path : 'updateProduct', component:UpdateComponentComponent},

      
      
      
    ]),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  //MatSnackBar,
    MatSnackBarModule
   
    
  ],
  providers: [ManageAccountService,
    RepositoryService,
     ManageProductService,
     ManageCustomerService,
     CartService,
     CheckoutServiceService,
     RoleserviceService,
     ManageBankService,
     ManageBankDetailsService,
     OrderService,SupplierService, DriverService],
  bootstrap: [AppComponent]
})

export class AppModule { }
