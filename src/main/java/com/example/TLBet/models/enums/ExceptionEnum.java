package com.example.TLBet.models.enums;

public enum ExceptionEnum {
    EXCEPTION_INVALID_TOKEN("EXCEPTION.INVALID.TOKEN"),
    EXCEPTION_USER_FIRST_NAME_IS_REQUIRED("EXCEPTION.USER.FIRST.NAME.IS.REQUIRED"),
    EXCEPTION_NO_CONTENT("EXCEPTION.NO.CONTENT"),
    EXCEPTION_USER_LAST_NAME_IS_REQUIRED("EXCEPTION.USER.LAST.NAME.IS.REQUIRED"),
    EXCEPTION_USER_NOT_FOUND("EXCEPTION.USER.NOT.FOUND"),
    EXCEPTION_TEAM_NOT_FOUND("EXCEPTION.TEAM.NOT.FOUND"),
    EXCEPTION_MISSING_PARAMETER("EXCEPTION.MISSING.PARAMETER"),
    EXCEPTION_EXISTING_BET_ON_MATCH("EXCEPTION.EXISTING.BET.ON.MATCH"),
    EXCEPTION_TOURNAMENT_NOT_FOUND("EXCEPTION.TOURNAMENT.NOT.FOUND"),
    EXCEPTION_TEAM_REQUIRED("EXCEPTION.TEAM.REQUIRED"),
    EXCEPTION_TOURNAMENT_BET_WINNER_ALREADY_EXISTS("EXCEPTION.TOURNAMENT.BET.WINNER.ALREADY.EXISTS"),
    EXCEPTION_TOURNAMENT_REQUIRED("EXCEPTION.TOURNAMENT.REQUIRED"),
    EXCEPTION_ROUND_NOT_FOUND("EXCEPTION.ROUND.NOT.FOUND"),
    EXCEPTION_MATCH_NOT_FOUND("EXCEPTION.MATCH.NOT.FOUND"),
    USER_ALREADY_EXISTS("USER.ALREADY.EXISTS");

    final String code;

    ExceptionEnum(String code) {
        this.code = code;
    }


    public String getCode() {
        return code;
    }
}
