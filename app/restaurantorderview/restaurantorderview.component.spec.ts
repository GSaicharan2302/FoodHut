import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantorderviewComponent } from './restaurantorderview.component';

describe('RestaurantorderviewComponent', () => {
  let component: RestaurantorderviewComponent;
  let fixture: ComponentFixture<RestaurantorderviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantorderviewComponent]
    });
    fixture = TestBed.createComponent(RestaurantorderviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
