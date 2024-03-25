import {Component} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {MatCardModule} from '@angular/material/card'
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {ProductService} from '../../services/product.service';
import {Subscription} from 'rxjs';
import {Product} from '../../models/product.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {ProductCardComponent} from "../product-card/product-card.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule,
    MatRadioModule, MatSliderModule, FormsModule, MatDividerModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  title = 'Kata-Carrefour';
  productsSubscription: Subscription = new Subscription;
  products: Product[] = [];
  isLoading: boolean = true;
  nonFilteredProducts: Product[] = [];
  constructor(private productsService: ProductService,
              private readonly route: ActivatedRoute){
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
        this.nonFilteredProducts = this.products;
        this.isLoading = false;
      }
    });
  }
  onDestroy(){
    this.productsSubscription.unsubscribe();
  }
}
