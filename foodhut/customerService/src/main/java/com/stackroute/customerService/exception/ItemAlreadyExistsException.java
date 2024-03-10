package com.stackroute.customerService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "Item already exists",code = HttpStatus.CONFLICT)
public class ItemAlreadyExistsException extends Exception{
}
