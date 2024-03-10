package com.stackroute.customerService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Address {
    private String doorNo;
    private String street;
    private String area;
    private String city;
    private String state;
    private String zipcode;
}
