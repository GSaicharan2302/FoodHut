package com.foodapp.authapp.service;

import com.foodapp.authapp.exception.PasswordMismatchException;
import com.foodapp.authapp.exception.UserNotFoundException;
import com.foodapp.authapp.model.ResetDTO;
import com.foodapp.authapp.model.User;
import org.springframework.stereotype.Service;


import java.util.Map;

public interface UserService {
    public abstract User registerUser(User user);
    public abstract Map<String,Integer> loginCheck(String emailId) throws UserNotFoundException;
        Map<String,Integer> getOTP(String emailID) throws UserNotFoundException;
        User updatePassword(ResetDTO resetDTO) throws PasswordMismatchException;
        User getUserById(String emailID) throws UserNotFoundException;
}
