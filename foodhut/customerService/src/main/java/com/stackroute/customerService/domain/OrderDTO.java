package com.stackroute.customerService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private String orderID;
    private String restaurantID;
    private Date orderDate;
    private CustomerDTO customer;
    private int noOfItems;
    private List<ItemDTO> itemList;
    private double total;
    private String status;
}
