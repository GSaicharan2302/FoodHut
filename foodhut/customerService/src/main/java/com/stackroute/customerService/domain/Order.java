package com.stackroute.customerService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Order {
    private String orderID;
    private Date orderDate;
    private String restaurant;
    private int noOfItems;
    private List<Item> itemList;
    private double total;
    private String status;
}
