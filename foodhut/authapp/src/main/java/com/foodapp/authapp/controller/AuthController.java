package com.foodapp.authapp.controller;

import com.foodapp.authapp.exception.OTPMismatchException;
import com.foodapp.authapp.exception.PasswordMismatchException;
import com.foodapp.authapp.exception.UserNotFoundException;
import com.foodapp.authapp.model.AdminDTO;
import com.foodapp.authapp.model.ResetDTO;
import com.foodapp.authapp.model.User;
import com.foodapp.authapp.service.JwtGenerator;
import com.foodapp.authapp.service.UserService;
import com.foodapp.authapp.service.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private int otp;
    @Autowired
    private UserService userService;

    @Autowired
    JwtGenerator jwtGenerator;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
//        System.out.println(user);

        return new ResponseEntity<>(userService.registerUser(user), HttpStatus.CREATED);
    }
    @PostMapping("/loginCheck")
    public ResponseEntity<?> loginCheck(@RequestBody User user) throws UserNotFoundException {
        Map<String,Integer> otpmap=userService.loginCheck(user.getEmailId());
        otp=otpmap.get("OTP");
        return new ResponseEntity<>(otpmap,HttpStatus.OK);
    }
    @PostMapping("/checkOTP/{num}")
    public ResponseEntity<?> checkOTP(@PathVariable int num,@RequestBody User user) throws UserNotFoundException, OTPMismatchException {
        System.out.println(num);
        System.out.println(otp);
        if(num==otp){
            try{
                User tempUser=userService.getUserById(user.getEmailId());
                return new ResponseEntity<>(jwtGenerator.generateJwt(tempUser),HttpStatus.OK);
            } catch (UserNotFoundException e) {
                throw new UserNotFoundException();
            }
        }
        else {
                throw new OTPMismatchException();
        }
    }
    @PostMapping("/getOTP")
    public ResponseEntity<?> getOTP(@RequestBody User user) throws UserNotFoundException {
        return new ResponseEntity<>(userService.getOTP(user.getEmailId()),HttpStatus.OK);
    }
    @PostMapping("/updatePassword")
    public ResponseEntity<?> updatePassword(ResetDTO resetDTO) throws PasswordMismatchException {
        return new ResponseEntity<>(userService.updatePassword(resetDTO),HttpStatus.OK);
    }
    @PostMapping("/adminCheck")
    public ResponseEntity<?> adminCheck(@RequestBody AdminDTO adminDTO) throws UserNotFoundException,PasswordMismatchException {
        try{
            User user=userService.getUserById(adminDTO.getEmailId());
            System.out.println(user.getRole());
            if(user.getPassword().equals(adminDTO.getPassword()) && user.getRole().equals("ADMIN")){
                return new ResponseEntity<>(user,HttpStatus.OK);
            }
            else {
                throw new PasswordMismatchException();
            }
        }
        catch (UserNotFoundException userNotFoundException){
            throw new UserNotFoundException();
        }
    }
}
