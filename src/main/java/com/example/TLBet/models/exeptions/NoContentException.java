package com.example.TLBet.models.exeptions;

import com.example.TLBet.models.enums.ExceptionEnum;

public class NoContentException extends Exception {

    private String code;

    public String getCode() {
        return code;
    }

    public NoContentException(ExceptionEnum code, String message) {
        super(message);
        this.code = code.getCode();
    }

    public NoContentException(ExceptionEnum code) {
        super(code.getCode());
    }

    public NoContentException(ExceptionEnum code, Throwable cause) {
        super(code.getCode(), cause);
    }
}
