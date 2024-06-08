package com.example.TLBet.models.enums;

public enum ExceptionEnum {
    EXCEPTION_INVALID_TOKEN("EXCEPTION.INVALID.TOKEN"),
    EXCEPTION_USER_FIRST_NAME_IS_REQUIRED("EXCEPTION.USER.FIRST.NAME.IS.REQUIRED"),
    EXCEPTION_NO_CONTENT("EXCEPTION.NO.CONTENT"),
    EXCEPTION_USER_LAST_NAME_IS_REQUIRED("EXCEPTION.USER.LAST.NAME.IS.REQUIRED"),
    EXCEPTION_USER_NOT_FOUND("EXCEPTION.USER.NOT.FOUND");

    final String code;

    ExceptionEnum(String code) {
        this.code = code;
    }


    public String getCode() {
        return code;
    }
}
