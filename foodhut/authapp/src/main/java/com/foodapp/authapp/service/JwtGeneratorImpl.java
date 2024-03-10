package com.foodapp.authapp.service;

import com.foodapp.authapp.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@Service
public class JwtGeneratorImpl implements JwtGenerator {
    @Override
    public Map<String, String> generateJwt(User user) {
        Map<String,String> result = new HashMap<String,String>();
        Map<String, Object> claims = new HashMap<String,Object>();
        claims.put("emailid",user.getEmailId());
        claims.put("role", user.getRole());
        String jwt = Jwts.builder()
                .setSubject("testing token")
                .setClaims(claims)
                .setIssuer("auth-app")
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS512, "idontsay")
                .compact();
        result.put("key",jwt);

        result.put("message","Login Success");
        return result;
    }


}
