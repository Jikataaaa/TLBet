package com.example.TLBet.models.exeptions;

import com.example.TLBet.models.enums.ExceptionEnum;

public class UserErrorException extends Exception{

    private String code;

    public String getCode() {
        return code;
    }

    public UserErrorException(ExceptionEnum code, String message) {
        super(message);
        this.code = code.getCode();
    }

    public UserErrorException(ExceptionEnum code) {
        super(code.getCode());
    }

    public UserErrorException(ExceptionEnum code, Throwable cause) {
        super(code.getCode(), cause);
    }
}
