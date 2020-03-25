import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { ShoppingModule } from './shopping/shopping.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';

import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';

import { AppRoutingModule } from './app-routing.module';
// import  {AngularFireModule} from 'angularfire2';
import  {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import  {AngularFireAuthModule} from 'angularfire2/auth';
import { BsNavbarComponent } from './core/components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './core/components/home/home.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './shopping/components/check-out/check-out.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'shared/services/auth.service';
import {  AuthGuard } from 'shared/services/auth-guard.service';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
// import { DataTableModule } from 'angular-4-data-table';
import { ProductFilterComponent } from './shopping/components/products/product-filter/product-filter.component';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shopping/components/shipping-form/shipping-form.component';
import { LoginComponent } from './core/components/login/login.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ShoppingModule,
    CoreModule,
    AdminModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    CustomFormsModule,
   // DataTableModule,
     RouterModule.forRoot([
      { path: "", component: ProductsComponent },
      { path: "login", component: LoginComponent }
     ])
  ],
  providers: [
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
