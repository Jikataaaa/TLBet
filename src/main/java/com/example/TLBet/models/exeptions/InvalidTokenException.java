package com.example.TLBet.models.exeptions;

import com.example.TLBet.models.enums.ExceptionEnum;

public class InvalidTokenException extends Exception {
    private String code;

    public InvalidTokenException(ExceptionEnum code) {
        this.code = code.getCode();
    }

    public InvalidTokenException(ExceptionEnum code, Throwable cause) {
        super(code.getCode(), cause);
    }

    public String getCode() {
        return code;
    }
}
