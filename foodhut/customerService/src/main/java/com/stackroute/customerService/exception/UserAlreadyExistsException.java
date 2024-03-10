package com.stackroute.customerService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "User exists",code = HttpStatus.CONFLICT)
public class UserAlreadyExistsException extends Exception {
}
