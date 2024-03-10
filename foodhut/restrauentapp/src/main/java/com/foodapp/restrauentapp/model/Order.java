package com.foodapp.restrauentapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    private String orderID;
    private String restaurantID;
    private Date orderDate;
    private Customer customer;
    private int noOfItems;
    private List<Item> itemList;
    private double total;
    private String status;
}
