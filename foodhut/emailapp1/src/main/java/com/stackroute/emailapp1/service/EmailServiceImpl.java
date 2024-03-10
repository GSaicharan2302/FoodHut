package com.stackroute.emailapp1.service;

import com.fasterxml.jackson.core.JsonParser;
import com.stackroute.emailapp1.model.EmailData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class EmailServiceImpl implements  EmailService{

    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String sender;

    @Override
    public String sendEmail(EmailData emailData) {
        System.out.println(emailData);
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(emailData.getReceiver());
            mailMessage.setText(emailData.getMessageBody());
            mailMessage.setSubject(emailData.getSubject());
            javaMailSender.send(mailMessage);
            return "Mail Sent to "+ emailData.getReceiver();
        }
        catch (Exception e) {
            e.printStackTrace();
            return "Sending mail failed...";
        }
    }
}


