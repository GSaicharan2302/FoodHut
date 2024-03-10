package com.foodapp.restrauentapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "Restaurant not found",code = HttpStatus.NOT_FOUND)
public class UserNotFoundException extends Exception {
}
