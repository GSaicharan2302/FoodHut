package com.stackroute.customerService.service;

import com.stackroute.customerService.domain.LoginDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="auth-app",url = "localhost:8067")
public interface LoginProxy {
    @PostMapping("/api/auth/register")
    public ResponseEntity<?> sendLoginDto(@RequestBody LoginDTO loginDTO);
}
