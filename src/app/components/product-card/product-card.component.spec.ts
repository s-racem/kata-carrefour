import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, convertToParamMap, Router} from "@angular/router";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ProductCardComponent],
      providers: [
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

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    // Set input properties
    component.title = 'Product Title';
    component.price = 10;
    component.description = 'Product Description';
    component.image = 'product.jpg';
    component.id = 1;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addToCart event when add button is clicked', () => {
    spyOn(component.addToCart, 'emit');

    const addButton = fixture.debugElement.query(By.css('.item-card-action-button'));
    addButton.triggerEventHandler('click', null);

    expect(component.addToCart.emit).toHaveBeenCalledWith(component.id);
  });
});
