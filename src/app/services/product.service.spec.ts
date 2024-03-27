import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Product} from "../models/product.model";

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no requests are outstanding
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of length 20', () => {
    const category = ''; // Set the desired category if needed
    const expectedLength = 20;

    service.fetchProducts().subscribe((products) => {
      if (Array.isArray(products)) {
        expect(products.length).toBe(expectedLength);
      } else {
        console.error('products is not an array');
      }
    });

    const req = httpTestingController.expectOne(
      'https://fakestoreapi.com/products'
    );
    expect(req.request.method).toBe('GET');
    req.flush(new Array(expectedLength).fill({} as Product));
  });
});
