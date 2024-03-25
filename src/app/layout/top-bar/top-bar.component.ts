import {Component, OnInit} from '@angular/core';
import {async, map, Observable, take} from 'rxjs';
import {Store} from "@ngrx/store";
import {CartState} from "../../store/cart.state";
import {addQuantity, emptyCart, reduceQuantity, removeFromCart} from "../../store/cart.actions";
import {CartProduct} from "../../models/cart-product.model";
import {selectCart, selectTotalPrice} from "../../store/cart.selector";
import {MatIcon} from "@angular/material/icon";
import {MatBadge} from "@angular/material/badge";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatSidenav, MatSidenavContainer} from "@angular/material/sidenav";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MiniCartComponent} from "../../components/mini-cart/mini-cart.component";
import {AsyncPipe, CurrencyPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    MatIcon,
    MatBadge,
    MatIconButton,
    MatSidenavContainer,
    MatButton,
    RouterLink,
    RouterLinkActive,
    MiniCartComponent,
    NgForOf,
    CurrencyPipe,
    AsyncPipe,
    MatSidenav,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {
  cart$!: Observable<CartProduct[]>;
  cartLength!: number;
  total$!: Observable<number>;
  constructor(private store: Store<CartState>) {}

  ngOnInit(): void {
    this.cart$ = this.store.select(selectCart);
    this.cart$?.subscribe((cart) => {
      this.cartLength = cart.length;
      this.total$ = this.store.select(selectTotalPrice);
    });
  }

  reduceQuantity(id: number):void {
    const cartItem$ = this.cart$?.pipe(
      take(1), // Take only the latest cart items from the observable
      map((cartItems) => cartItems.find((item) => item.id === id))
    );

    cartItem$?.subscribe((cartItem) => {
      if (cartItem && cartItem.quantity > 1) {
        this.store.dispatch(reduceQuantity({ id }));
      } else {
        this.store.dispatch(removeFromCart({ id }));
      }
    });
  }

  removeFromCart(id: number): void {
    this.store.dispatch(removeFromCart({ id }));
  }

  increaseQuantity(id: number) : void{
    this.store.dispatch(addQuantity({ id }));
  }

  clearCart():void {
    this.store.dispatch(emptyCart());
  }
}
