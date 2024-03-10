import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantLoginComponent } from './restaurant-login.component';

describe('RestaurantLoginComponent', () => {
  let component: RestaurantLoginComponent;
  let fixture: ComponentFixture<RestaurantLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantLoginComponent]
    });
    fixture = TestBed.createComponent(RestaurantLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
