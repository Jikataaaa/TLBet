package com.example.TLBet.utils;

import com.example.TLBet.service.JwtService;
import com.example.TLBet.service.impl.JwtServiceImpl;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class AuthUtil {

    private static final JwtService service = new JwtServiceImpl();

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
