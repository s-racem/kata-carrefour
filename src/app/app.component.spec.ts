import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {provideStore} from "@ngrx/store";
import {cartReducer} from "./store/cart.reducer";
import {ProductService} from "./services/product.service";
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {of} from "rxjs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule],
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
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'kata-carrefour' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('kata-carrefour');
  });
});
