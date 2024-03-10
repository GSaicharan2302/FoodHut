import { TestBed } from '@angular/core/testing';

import { GetrestaurantService } from './getrestaurant.service';

describe('GetrestaurantService', () => {
  let service: GetrestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetrestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
