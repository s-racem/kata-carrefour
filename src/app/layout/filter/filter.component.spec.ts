import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {of} from "rxjs";

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterComponent],
      providers: [ProductService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of(convertToParamMap({})),
          }
        }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
