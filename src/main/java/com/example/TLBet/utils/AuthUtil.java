package com.example.TLBet.utils;

import com.example.TLBet.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AuthUtil {

    private static JwtService service ;

    public static String validateToken(String token){
        String extractUsername;
        try {
            extractUsername = service.extractUsername(token);
        }catch (MalformedJwtException | ExpiredJwtException e){
            return null;
        }
        return extractUsername;
    }
}
