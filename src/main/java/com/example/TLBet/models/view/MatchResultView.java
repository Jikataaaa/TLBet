package com.example.TLBet.models.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MatchResultView {
    private long id;
    private long homeTeamId;
    private String homeTeam;
    private int homeTeamGoals;
    private long awayTeamId;
    private String awayTeam;
    private int awayTeamGoals;
    private Instant startTime;
    private long tournamentId;
    private String tournamentName;
}
