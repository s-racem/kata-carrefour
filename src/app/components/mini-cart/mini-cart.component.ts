import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-mini-cart',
  standalone: true,
  imports: [
    MatIcon,
    MatButton
  ],
  templateUrl: './mini-cart.component.html',
  styleUrl: './mini-cart.component.scss'
})
export class MiniCartComponent {
  @Input() title!: string;
  @Input() price!: number;
  @Input() quantity!: number;
  @Input() id!: number;
  @Input() image!: string;

  @Output() reduceQuantityInCart = new EventEmitter<number>();
  @Output() deleteFromCart = new EventEmitter<number>();
  @Output() increaseQuantityInCart = new EventEmitter<number>();

  remove = (): void => {
    this.deleteFromCart.emit(this.id);
  };

  reduce = (): void => {
    this.reduceQuantityInCart.emit(this.id);
  };

  increase = (): void => {
    this.increaseQuantityInCart.emit(this.id);
  };
}
