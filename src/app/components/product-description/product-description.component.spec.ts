import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDescriptionComponent } from './product-description.component';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {of} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
import {provideStore} from "@ngrx/store";
import {cartReducer} from "../../store/cart.reducer";

describe('ProductDescriptionComponent', () => {
  let component: ProductDescriptionComponent;
  let fixture: ComponentFixture<ProductDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDescriptionComponent,
        HttpClientModule],
      providers: [
        provideStore({ cart: cartReducer}),
        ProductService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of(convertToParamMap({})),
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDescriptionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
