package com.foodapp.restrauentapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class Restaurant {
    @Id
    private String emailId;
    private String restaurantname,description,cuisineType,password;
    private String ownername;
    private String imageID;
    private String childImage1;
    private String childImage2;
    private String childImage3;
    private Location location;
    private int duration;
    private int price;
    private long contactNumber;
    private List<RestaurantProduct> listofItems = new ArrayList<>();
    private List<Order> orderList;
    private List<String> category;
    private double rating;
    private  String status;
}
