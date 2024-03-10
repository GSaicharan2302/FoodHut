package com.foodapp.authapp.repository;

import com.foodapp.authapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;



public interface AuthRepository1 extends JpaRepository<User,String> {
}
