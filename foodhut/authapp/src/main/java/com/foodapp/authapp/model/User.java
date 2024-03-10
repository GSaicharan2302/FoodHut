package com.foodapp.authapp.model;



import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;


@AllArgsConstructor
@NoArgsConstructor
@Data

@Entity
public class User {
    @Id
    private  String emailId;

    private String password,role,status;

}
