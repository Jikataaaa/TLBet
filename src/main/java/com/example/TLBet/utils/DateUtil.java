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
}
