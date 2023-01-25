package com.example.TLBet.models;

import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class MatchStatistics extends BaseEntity {

    private int homeTeamGoals;
    private int awayTeamGoals;
}
