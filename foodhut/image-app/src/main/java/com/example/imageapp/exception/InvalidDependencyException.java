package com.example.imageapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "some data is missing in request" , code = HttpStatus.BAD_REQUEST)
public class InvalidDependencyException extends Exception{
}
