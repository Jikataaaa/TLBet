package com.example.TLBet.models;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@MappedSuperclass
@Data
public abstract class MatchStatistics extends BaseEntity {
    private int homeTeamGoals;
    private int awayTeamGoals;
}
