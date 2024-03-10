package com.stackroute.emailapp1.service;

import com.stackroute.emailapp1.model.EmailData;

public interface EmailService {
    public abstract String sendEmail(EmailData emailData);
}
