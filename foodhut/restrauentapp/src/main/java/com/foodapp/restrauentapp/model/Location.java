package com.foodapp.restrauentapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Location {
    private String doorNo;
    private String street;
    private String area;
    private String city;
    private String state;
    private String zipcode;
}
