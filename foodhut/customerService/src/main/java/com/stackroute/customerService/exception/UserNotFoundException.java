package com.stackroute.customerService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "User Not Found",code = HttpStatus.NOT_FOUND)
public class UserNotFoundException extends Exception{
}
