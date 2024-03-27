import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {of} from 'rxjs';
import {ProductsComponent} from './products.component';
import {ProductService} from "../../services/product.service";
import {provideStore} from "@ngrx/store";
import {cartReducer} from "../../store/cart.reducer";

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientModule
      ],
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should fetch all products on component initialization', () => {
    const fetchAllProductsSpy = spyOn(component, 'fetchAllProducts').and.stub(); // Spy on fetchAllProducts method

    // Trigger ngOnInit
    component.ngOnInit();

    // Assert that fetchAllProducts method was called
    expect(fetchAllProductsSpy).toHaveBeenCalled();
  });
});
