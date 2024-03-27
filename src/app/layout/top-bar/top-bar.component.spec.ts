import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarComponent } from './top-bar.component';
import {provideStore, Store} from "@ngrx/store";
import {cartReducer} from "../../store/cart.reducer";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {of} from "rxjs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CartProduct} from "../../models/cart-product.model";
import {Category} from "../../models/product.model";
import {reduceQuantity, removeFromCart} from "../../store/cart.actions";
import {CartState} from "../../store/cart.state";

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let store: Store<CartState>;
  let selectSpy: jasmine.Spy;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarComponent, BrowserAnimationsModule],
      providers: [provideStore({ cart: cartReducer}),
        ProductService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of(convertToParamMap({})),
          },
          store
        }],
    })
    .compileComponents();

    store = TestBed.inject(Store);
    component = TestBed.createComponent(TopBarComponent).componentInstance;
    selectSpy = spyOn(store, 'select').and.returnValue(of([]));
    dispatchSpy = spyOn(store, 'dispatch');
  });

  it('should reduce quantity of cart item when quantity is greater than 1', () => {
    const cartItem: CartProduct = {
      id: 1,
      title: 'Product 1',
      price: 10,
      description: 'Description 1',
      category: Category.Electronics,
      image: 'image1.jpg',
      rating: { rate: 4.5, count: 100 },
      quantity: 2,
    };
    const cartItems: CartProduct[] = [cartItem];

    selectSpy.and.returnValue(of(cartItems));

    component.ngOnInit(); // Manually call ngOnInit

    component.reduceQuantity(1);

    expect(dispatchSpy).toHaveBeenCalledWith(
      reduceQuantity({ id: 1 }) // Update the action object
    );
  });

  it('should remove cart item when quantity is 1', () => {
    const cartItem: CartProduct = {
      id: 1,
      title: 'Product 1',
      price: 10,
      description: 'Description 1',
      category: Category.Electronics,
      image: 'image1.jpg',
      rating: { rate: 4.5, count: 100 },
      quantity: 1,
    };
    const cartItems: CartProduct[] = [cartItem];

    selectSpy.and.returnValue(of(cartItems));

    component.ngOnInit(); // Manually call ngOnInit

    component.reduceQuantity(1);

    expect(dispatchSpy).toHaveBeenCalledWith(
      removeFromCart({ id: 1 }) // Update the action object
    );
  });
});
