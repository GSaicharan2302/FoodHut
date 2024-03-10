package com.foodapp.authapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResetDTO {
    private String emailID;
    private String currentpassword;
    private String newpassword;
}
