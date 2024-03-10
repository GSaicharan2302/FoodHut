import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantRegisterComponent } from './restaurant-register.component';

describe('RestaurantRegisterComponent', () => {
  let component: RestaurantRegisterComponent;
  let fixture: ComponentFixture<RestaurantRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantRegisterComponent]
    });
    fixture = TestBed.createComponent(RestaurantRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
