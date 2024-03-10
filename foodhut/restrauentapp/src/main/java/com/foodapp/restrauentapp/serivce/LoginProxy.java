package com.foodapp.restrauentapp.serivce;

import com.foodapp.restrauentapp.model.LoginDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name="auth-app",url = "localhost:8067")

public interface LoginProxy {
    @PostMapping("api/auth/register")
    ResponseEntity<?> sendLoginDto(LoginDTO loginDTO);
}