import { Routes } from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";

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
  }
];
