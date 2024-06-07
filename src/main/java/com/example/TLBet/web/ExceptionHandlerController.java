package com.example.TLBet.web;

import com.example.TLBet.config.ApiResponse;
import com.example.TLBet.config.ErrorModel;
import com.example.TLBet.models.exeptions.ExpiredTokenException;
import com.example.TLBet.models.exeptions.InvalidTokenException;
import com.example.TLBet.models.exeptions.UserErrorException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Locale;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Slf4j
@RestControllerAdvice
public class ExceptionHandlerController {


    @Autowired
    private MessageSource messageSource;

    @ResponseStatus(BAD_REQUEST)
    @ExceptionHandler(UserErrorException.class)
    public ErrorModel handleUserErrorException(
            UserErrorException ex,
            HttpServletRequest request,
            Locale locale) {
        String errorMessage =
                messageSource.getMessage(ex.getCode(), new Object[]{}, locale);

        ErrorModel errorModel = new ErrorModel();
        errorModel.setDateTime(LocalDateTime.now());
        errorModel.setMessage(errorMessage);
        errorModel.setSystemMessage(ex.getMessage());
        errorModel.setPath(request.getRequestURL().toString());
        return errorModel;
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<ApiResponse> handleInvalidTokenException(MalformedJwtException ex) {
        ApiResponse response = new ApiResponse(401, "Invalid token");
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ApiResponse> handleExpiredTokenException(ExpiredJwtException ex) {
        ApiResponse response = new ApiResponse(401, "Token expired");
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ApiResponse> handleInvalidTokenException(InvalidTokenException ex) {
        ApiResponse response = new ApiResponse(401, "Invalid token");
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(ExpiredTokenException.class)
    public ResponseEntity<ApiResponse> handleExpiredTokenException(ExpiredTokenException ex) {
        ApiResponse response = new ApiResponse(401, "Token expired");
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }
}
