import { SharedModule } from 'shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from '../shopping/components/products/products.component';
import { ShoppingModule } from './../shopping/shopping.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([

    ])
  ],
  exports:[
    BsNavbarComponent
  ]
})
export class CoreModule { }
