package com.stackroute.customerService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Item {
    //@Id
    private String itemID;
    private String itemName;
    private String itemDescription;
    private String restaurant;
    private int quantity;
    private double price;
}
