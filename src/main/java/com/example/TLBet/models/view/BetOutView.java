package com.example.TLBet.models.view;

import com.example.TLBet.models.enums.MatchStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BetOutView {

    private Long id;
    private MatchTeamResultView homeTeam;
    private MatchTeamResultView awayTeam;
    private Instant startTime;
    private MatchStatus status;
    private Long tournamentId;
    private String tournamentName;
    private RoundView round;
}
