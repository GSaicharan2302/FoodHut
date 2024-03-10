package com.foodapp.restrauentapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "Product Not Found",code = HttpStatus.CONFLICT)
public class UserAlreadyExistsException extends Exception{
}
