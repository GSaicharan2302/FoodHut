package com.stackroute.customerService.service;

import com.stackroute.customerService.domain.EmailDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name="email-service",url = "localhost:65500/mail-app")
public interface EmailProxy {
    @PostMapping("/send-mail")
    ResponseEntity<?> sendEmailDTO(EmailDTO emailDTO);
}
