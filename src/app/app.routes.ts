import { Routes } from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {CartPageComponent} from "./components/cart-page/cart-page.component";
import {ProductDescriptionComponent} from "./components/product-description/product-description.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products'
  },
  {
    path: 'products',
    pathMatch: 'full',
    component: ProductsComponent,
  },
  {
    path: 'cart',
    pathMatch: 'full',
    component: CartPageComponent,
  },
  {
    path: 'products/:title',
    component: ProductDescriptionComponent,
  },
];
