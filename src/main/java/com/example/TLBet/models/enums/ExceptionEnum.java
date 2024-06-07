package com.example.TLBet.models.enums;

public enum ExceptionEnum {

    EXCEPTION_USER_NOT_FOUND("EXCEPTION.USER.NOT.FOUND");

    final String code;

    ExceptionEnum(String code) {
        this.code = code;
    }


    public String getCode() {
        return code;
    }
}
