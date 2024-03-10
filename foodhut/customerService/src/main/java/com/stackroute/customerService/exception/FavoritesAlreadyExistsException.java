package com.stackroute.customerService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "Already added to favourites list",code = HttpStatus.CONFLICT)
public class FavoritesAlreadyExistsException extends Exception{
}
