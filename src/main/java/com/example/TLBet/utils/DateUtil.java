package com.example.TLBet.utils;

import java.time.*;

public class DateUtil {
    public static Instant parseInstant(Instant time){
        ZoneId zone = ZoneId.of("Europe/Sofia");
        ZonedDateTime zonedDateTime = time.atZone(zone);
        LocalDateTime localDateTime = zonedDateTime.toLocalDateTime();
        long timeInSeconds = localDateTime.toEpochSecond(ZoneOffset.UTC);
        return Instant.ofEpochSecond(timeInSeconds);
    }
    public static Instant changeTimeOfInstant(Instant instant, LocalTime time){
        // examples
        // instant 2021-02-17T00:00:00Z
        // time 11:40
        String[] instantParts = instant.toString().split("T");
        String date = instantParts[0]; // 2021-02-17
        return Instant.parse(date + "T" + time.toString() + ":00Z");  //2021-02-17T11:40:00Z
    }
}
