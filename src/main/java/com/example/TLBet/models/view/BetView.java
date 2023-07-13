package com.example.TLBet.models.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BetView {
    private int homeTeamGoals;
    private String homeTeamUrl;
    private int awayTeamGoals;
    private String awayTeamUrl;
    private String tournamentName;
}
