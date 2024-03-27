import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {CartItemComponent} from "../cart-item/cart-item.component";
import {AsyncPipe, CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {map, Observable, take} from "rxjs";
import {CartProduct} from "../../models/cart-product.model";
import {RouterLink} from "@angular/router";
import {selectCart, selectTotalPrice, selectTotalQuantity} from "../../store/cart.selector";
import {addQuantity, reduceQuantity, removeFromCart} from "../../store/cart.actions";
import {Store} from "@ngrx/store";
import {CartState} from "../../store/cart.state";
import {MiniCartComponent} from "../mini-cart/mini-cart.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CartItemComponent, AsyncPipe, CurrencyPipe, RouterLink, MiniCartComponent, MatButton, NgForOf, NgIf],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  cart$!: Observable<CartProduct[]>;
  cartItems: CartProduct[] = [];
  total$!: Observable<number>;
  totalQuantity$!: Observable<number>;
  screenWidth: any = window.innerWidth;

  constructor(private store: Store<CartState>) {
    this.cart$ = this.store.select(selectCart);
  }


  ngOnInit(): void {
    this.cart$.subscribe((cart) => {
      this.cartItems = cart;
      this.total$ = this.store.select(selectTotalPrice);
      this.totalQuantity$ = this.store.select(selectTotalQuantity);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.screenWidth = window.innerWidth;
  }

  reduceQuantity(id: number): void {
    const cartItem$ = this.cart$?.pipe(
      take(1), // Take only the latest cart items from the observable
      map((cartItems) => cartItems.find((item) => item.id === id))
    );

    cartItem$?.subscribe((cartItem) => {
      if (cartItem && cartItem.quantity > 1) {
        this.store.dispatch(reduceQuantity({id}));
      } else {
        this.store.dispatch(removeFromCart({id}));
      }
    });
  }

  removeFromCart(id: number): void {
    this.store.dispatch(removeFromCart({id}));
  }

  increaseQuantity(id: number): void {
    this.store.dispatch(addQuantity({id}));
  }
}
