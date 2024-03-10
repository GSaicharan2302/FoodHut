package com.stackroute.customerService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Customer {
    @Id
    private String emailId;
    private String username;
    private Address address;
    private List<Order> orderList;
    private Long contactno;
    private List<String> favourites;
    private List<String> favouriteProducts;
    private List<Item> cart;
    private Address deliveryAddress;
//    private List<String> favourites;
}
