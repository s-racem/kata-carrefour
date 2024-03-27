import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {Observable} from "rxjs";
import {CartProduct} from "../../models/cart-product.model";
import {Product} from "../../models/product.model";
import {ActivatedRoute} from "@angular/router";
import {CartState} from "../../store/cart.state";
import {Store} from "@ngrx/store";
import {selectCart} from "../../store/cart.selector";
import {checkIfItemExistsInCart} from "../../utils/functions/check-if-item-exists-in-cart";
import {addQuantity, addToCart} from "../../store/cart.actions";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-description',
  standalone: true,
  imports: [
    MatIcon,
    MatButton
  ],
  templateUrl: './product-description.component.html',
  styleUrl: './product-description.component.scss'
})
export class ProductDescriptionComponent implements OnInit {
  cart$!: Observable<CartProduct[]>;
  title!: string;
  product!: Product[];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private store: Store<CartState>
  ) {}
  ngOnInit(): void {
    this.cart$ = this.store.select(selectCart);
    this.getParamsFromRoute();
    this.getProduct(this.title);
  }

  getParamsFromRoute = (): void => {
    this.route.params.subscribe((params) => {
      this.title = params['title'];
    });
  };

  getProduct = (title: string): void => {
    this.productService.fetchProducts().subscribe((res:any) => {
      if(res) {
        this.product = title ? res.filter((e: any) => e.title.includes(title)) : res;
      }
    });
  };

  addProductToCart = (id: number): void => {
    if (checkIfItemExistsInCart(id, this.cart$)) {
      this.addQuantity(id);
      return;
    } else {
      this.addToCart(this.product[0]);
    }
  };

  addToCart = (product: Product): void => {
    this.store.dispatch(addToCart({ product }));
  };

  addQuantity(itemId: number): void {
    this.store.dispatch(addQuantity({ id: itemId }));
  }
}
