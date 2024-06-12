package com.example.TLBet.models.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MatchInView {

    private Long id;
    private Integer homeTeamGoals;
    private Integer awayTeamGoals;
    private Instant startTime;
    private Long homeTeamId;
    private Long awayTeamId;
    private Long roundId;
}
