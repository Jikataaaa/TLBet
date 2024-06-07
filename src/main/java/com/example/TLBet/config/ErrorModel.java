package com.example.TLBet.config;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ErrorModel {

    @JsonProperty("uuid")
    private String uuid;

    @JsonProperty("message")
    private String message;

    @JsonProperty("systemMessage")
    private String systemMessage;

    @JsonProperty("path")
    private String path;

    @JsonProperty("dateTime")
    private LocalDateTime dateTime;
}
