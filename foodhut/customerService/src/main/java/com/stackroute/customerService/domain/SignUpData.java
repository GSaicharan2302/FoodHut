package com.stackroute.customerService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class SignUpData {
    private String emailId;
    private String username;
    private String password;
    private Address address;
    private long contactNo;
}
