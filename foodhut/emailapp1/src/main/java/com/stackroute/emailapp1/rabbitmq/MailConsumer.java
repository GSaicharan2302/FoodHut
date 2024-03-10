/*
package com.stackroute.emailapp1.rabbitmq;

import com.stackroute.emailapp1.model.EmailData;
import com.stackroute.emailapp1.service.EmailService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MailConsumer {
    @Autowired
    private EmailService emailService;

    @RabbitListener(queues="mail_queue")
    public void getEmailDtoFromQueue(EmailDTO emailDTO){
        EmailData emailData = new EmailData(emailDTO.getReceiver(),
                emailDTO.getMessageBody(), emailDTO.getSubject(),null);

        System.out.println(emailService.sendEmail(emailData));
    }
}
*/
