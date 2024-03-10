package com.foodapp.authapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpData {
    private String emailID;
    private String username;
    private String password;
    private String address;
    private long contactDetails;
}
