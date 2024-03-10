package com.foodapp.authapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "Password is incorrect",code = HttpStatus.UNAUTHORIZED)
public class PasswordMismatchException extends Exception{
}
