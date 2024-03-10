package com.example.imageapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "Document not found" , code = HttpStatus.NOT_FOUND)
public class NotFoundException extends Exception{
}
