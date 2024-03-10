package com.stackroute.customerService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    private String customerName;
    private Address address;
    private Long phoneNo;
    private String emailId;
    private Address deliveryAddress;
}
