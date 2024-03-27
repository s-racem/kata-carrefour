import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIcon, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() title!: string;
  @Input() price!: number;
  @Input() description!: string;
  @Input() image!: string;
  @Input() id!: number;

  @Output() addToCart = new EventEmitter<number>();

  add = (): void => {
    this.addToCart.emit(this.id);
  };
}
