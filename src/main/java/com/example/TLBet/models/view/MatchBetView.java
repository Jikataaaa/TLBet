package com.example.TLBet.models.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MatchBetView {
    private long id;
    private String homeTeam;
    private String awayTeam;
    private Instant startTime;
    private String tournament;

}
