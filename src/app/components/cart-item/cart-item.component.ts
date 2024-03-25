import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatDivider,
    MatIcon
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() title!: string;
  @Input() price!: number;
  @Input() quantity!: number;
  @Input() description!: string;
  @Input() image!: string;
  @Input() category!: string;
  @Input() id!: number;

  @Output() increaseQuantityInCart = new EventEmitter<number>();
  @Output() reduceQuantityInCart = new EventEmitter<number>();
  @Output() deleteFromCart = new EventEmitter<number>();
  reduce = () => {
    this.reduceQuantityInCart.emit(this.id);
  };
  delete = () => {
    this.deleteFromCart.emit(this.id);
  };

  increase = () => {
    this.increaseQuantityInCart.emit(this.id);
  };
}
