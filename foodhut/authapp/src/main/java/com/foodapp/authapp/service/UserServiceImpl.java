package com.foodapp.authapp.service;

import com.foodapp.authapp.exception.PasswordMismatchException;
import com.foodapp.authapp.exception.UserNotFoundException;
import com.foodapp.authapp.model.EmailDTO;
import com.foodapp.authapp.model.ResetDTO;
import com.foodapp.authapp.model.User;
import com.foodapp.authapp.repository.Authrepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class UserServiceImpl implements UserService {



    private Authrepository authrepository;
    private JwtGenerator jwtGenerator;
    private EmailProxy emailProxy;
    @Autowired
    UserServiceImpl(Authrepository authrepository,JwtGenerator jwtGenerator,EmailProxy emailProxy){
        this.authrepository=authrepository;
        this.jwtGenerator=jwtGenerator;
        this.emailProxy=emailProxy;
    }

    @Override
    public User registerUser(User user) {
        return authrepository.save(user);
    }

    @Override
    public Map<String,Integer> loginCheck(String emailId) throws UserNotFoundException {
        if(authrepository.findById(emailId).isPresent()){
            return getOTP(emailId);
        }
        else {
            throw new UserNotFoundException();
        }
    }

    @Override
    public Map<String, Integer> getOTP(String emailID) throws UserNotFoundException {
        if(authrepository.findById(emailID).isPresent()){
            Random rand=new Random();
            Map<String,Integer> otpmap=new HashMap<>();
            int random=rand.nextInt(1000,9999);
            String msgBody="OTP for login is : "+random;
            EmailDTO emailDTO=new EmailDTO(emailID,msgBody,"One Time Password for login",null);
            ResponseEntity<?> resp=  emailProxy.sendEmailDTO(emailDTO);
            otpmap.put("OTP", random);
            return otpmap;
        }
        else {
            throw new UserNotFoundException();
        }
    }

    @Override
    public User updatePassword(ResetDTO resetDTO) throws PasswordMismatchException {
        if(authrepository.checkPassword(resetDTO.getCurrentpassword()).isPresent()){
            User tempuser=authrepository.checkPassword(resetDTO.getCurrentpassword()).get();
            tempuser.setPassword(resetDTO.getNewpassword());
            return authrepository.save(tempuser);
        }
        else {
            throw new PasswordMismatchException();
        }
    }

    @Override
    public User getUserById(String emailID) throws UserNotFoundException {
        if(authrepository.findById(emailID).isPresent()){
            return authrepository.findById(emailID).get();
        }
        else {
            throw new UserNotFoundException();
        }
    }


}
