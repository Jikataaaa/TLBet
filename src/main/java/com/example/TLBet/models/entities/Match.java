package com.example.TLBet.models.entities;

import com.example.TLBet.models.MatchStatistics;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "matches")
public class Match extends MatchStatistics {
    private Instant startTime;

    @ManyToOne
    @JoinColumn(name = "tournament_id", referencedColumnName = "id")
    private Tournament tournament;

    @OneToOne
    @JoinColumn(name = "home_team_id", referencedColumnName = "id")
    private Team homeTeam;
    @OneToOne
    @JoinColumn(name = "away_team_id", referencedColumnName = "id")
    private Team awayTeam;

    @OneToOne
    @JoinColumn(name = "real_result_id", referencedColumnName = "id")
    private RealResult realResult;


}