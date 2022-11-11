import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ProductItemComponent } from './components/product-item/product-item.component';

const routes: Routes = [
  {path:'',component:ProductListComponent},
  {path:'product-list',component:ProductListComponent},
  {path:'product-item',component:ProductItemComponent},
  {path:'product-item-details/:id',component:ProductItemDetailComponent},
  {path:'cart',component:CartComponent},
  {path:'confirmation',component:ConfirmationComponent},
  {path:'**',component:ProductListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
exports: [RouterModule]
})
export class AppRoutingModule { }
