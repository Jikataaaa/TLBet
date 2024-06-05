package com.example.TLBet.models.view;

import com.example.TLBet.models.entities.Round;
import com.example.TLBet.models.enums.MatchStatus;
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
    private MatchTeamResultView homeTeam;
    private MatchTeamResultView awayTeam;
    private Instant startTime;
    private long tournamentId;
    private String tournamentName;
    private Round round;
    private MatchStatus status;
}
