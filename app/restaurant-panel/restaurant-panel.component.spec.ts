import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantPanelComponent } from './restaurant-panel.component';

describe('RestaurantPanelComponent', () => {
  let component: RestaurantPanelComponent;
  let fixture: ComponentFixture<RestaurantPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantPanelComponent]
    });
    fixture = TestBed.createComponent(RestaurantPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
