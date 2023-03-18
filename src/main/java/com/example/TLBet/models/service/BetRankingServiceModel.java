package com.example.TLBet.models.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BetRankingServiceModel {

    private String username;
    private int matchHomeTeamGoals;
    private int matchAwayTeamGoals;
    private int betHomeTeamGoals;
    private int betAwayTeamGoals;

}
