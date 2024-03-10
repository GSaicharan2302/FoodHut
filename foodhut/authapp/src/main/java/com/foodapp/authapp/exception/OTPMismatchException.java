package com.foodapp.authapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "OTP Mismatch",code = HttpStatus.CONFLICT)
public class OTPMismatchException extends Exception {
}
