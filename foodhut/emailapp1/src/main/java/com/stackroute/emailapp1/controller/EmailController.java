package com.stackroute.emailapp1.controller;

import com.stackroute.emailapp1.model.EmailData;
import com.stackroute.emailapp1.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mail-app")
public class EmailController {
    @Autowired
    private EmailService  emailService;

    /* POST
    http://localhost:65500/mail-app/send-mail
    */
    @PostMapping("/send-mail")
    public ResponseEntity<String> sendEmail(@RequestBody EmailData emailData) {
        String response = emailService.sendEmail(emailData);

        if (response.startsWith("Mail Sent")) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
