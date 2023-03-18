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
        String[] instantParts = instant.toString().split("T");
        String date = instantParts[0];
        return Instant.parse(date + "T" + time.toString() + ":00Z");
    }
}
