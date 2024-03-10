package com.foodapp.restrauentapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "Product Not Found",code = HttpStatus.NOT_FOUND)
public class ProductNotFoundException extends Exception{
}
