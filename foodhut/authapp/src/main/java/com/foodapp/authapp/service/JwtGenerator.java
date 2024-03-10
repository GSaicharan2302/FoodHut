package com.foodapp.authapp.service;

import com.foodapp.authapp.model.User;

import java.util.Map;

public interface JwtGenerator {
    public abstract Map<String, String > generateJwt(User user);
}
