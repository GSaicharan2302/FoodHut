package com.foodapp.restrauentapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    private String customerName;
    private Location address;
    private long phoneNo;
    private String emailId;
    private Location deliveryAddress;
}
