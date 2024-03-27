import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import {MatCardModule} from '@angular/material/card'
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {ProductService} from '../../services/product.service';
import {Observable, Subscription} from 'rxjs';
import {Product} from '../../models/product.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {ProductCardComponent} from "../product-card/product-card.component";
import {checkIfItemExistsInCart} from "../../utils/functions/check-if-item-exists-in-cart";
import {CartProduct} from "../../models/cart-product.model";
import {Store} from "@ngrx/store";
import {CartState} from "../../store/cart.state";
import {addQuantity, addToCart} from "../../store/cart.actions";
import {selectCart} from "../../store/cart.selector";
import {FilterComponent} from "../../layout/filter/filter.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule,
    MatRadioModule, MatSliderModule, FormsModule, MatDividerModule, ProductCardComponent, RouterLink, FilterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  title = 'Kata-Carrefour';
  productsSubscription: Subscription = new Subscription;
  products: Product[] = [];
  isLoading: boolean = true;
  nonFilteredProducts: Product[] = [];
  cart$!: Observable<CartProduct[]>;
  initialProducts!: Product[];
  constructor(private productsService: ProductService,
              private readonly route: ActivatedRoute,
              private store: Store<CartState>){
    this.cart$ = this.store.select(selectCart);
  }

  ngOnInit(){
    this.route.params.subscribe(() =>
      this.fetchAllProducts()
    );
  }

  fetchAllProducts(searchKeyword?: string){
    this.isLoading = true;
    this.productsSubscription = this.productsService.fetchProducts().subscribe((res:any) => {
      if(res){
        this.products = searchKeyword ? res.filter((e:any) => e.title.includes(searchKeyword)) : res;
        this.initialProducts = res;
        this.nonFilteredProducts = this.products;
        this.isLoading = false;
      }
    });
  }

  addProductToCart($event: number): void {
    const product: Product[] = this.products.filter(
      (product) => product.id === $event
    );
    if (checkIfItemExistsInCart($event, this.cart$)) {
      this.addQuantity($event);
    } else {
      this.addToCart(product[0]);
    }
  }
  addToCart(product: Product): void {
    this.store.dispatch(addToCart({product}));
  }
  addQuantity(itemId: number): void {
    this.store.dispatch(addQuantity({id: itemId}));
  }

  filterByNameHandler($event: string): void {
    if ($event === '') {
      this.products = [...this.initialProducts];
      return;
    } else {
      this.products = this.initialProducts.filter((product) =>
        product.title.toLowerCase().includes($event.toLowerCase())
      );
    }
  }

  filterByOptionHandler($event: string): void {
    if ($event === 'Most expensive') {
      this.products = this.initialProducts.sort((a, b) => b.price - a.price);
    } else if ($event === 'Least expensive') {
      this.products = this.initialProducts.sort((a, b) => a.price - b.price);
    } else {
      this.ngOnInit();
    }
  }
  onDestroy(){
    this.productsSubscription.unsubscribe();
  }
}
