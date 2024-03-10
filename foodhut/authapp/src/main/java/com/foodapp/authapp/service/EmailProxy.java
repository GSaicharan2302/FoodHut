package com.foodapp.authapp.service;

import com.foodapp.authapp.model.EmailDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "email-service", url = "http://localhost:65501/mail-app")
public interface EmailProxy {
    @PostMapping(value = "/send-mail", consumes = "application/json", produces = "text/plain")
    ResponseEntity<String> sendEmailDTO(EmailDTO emailDTO);
}

