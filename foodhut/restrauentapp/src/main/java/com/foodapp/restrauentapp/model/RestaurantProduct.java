package com.foodapp.restrauentapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RestaurantProduct {
    @Id
    private String productId;
    private String description,cuisineType,productname;
    private double price;
    private int duration;
    private double rating;
}
