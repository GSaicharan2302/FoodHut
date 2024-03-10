package com.foodapp.authapp.repository;






import com.foodapp.authapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface Authrepository extends JpaRepository<User,String> {
    @Query(value="select * from user where password=?1",nativeQuery=true)
    Optional<User> checkPassword(String password);


}

