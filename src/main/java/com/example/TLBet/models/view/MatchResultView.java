package com.example.TLBet.models.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MatchResultView {
    private long id;
    private long homeTeamId;
    private String homeTeam;
    private String homeTeamImageUrl;
    private int homeTeamGoals;
    private long awayTeamId;
    private String awayTeam;
    private String awayTeamImageUrl;
    private int awayTeamGoals;
    private Instant startTime;
    private long tournamentId;
    private String tournamentName;
    private int round;
}
