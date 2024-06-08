package com.example.TLBet.models.entities;

import com.example.TLBet.models.MatchStatistics;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(name = "matches")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Match extends MatchStatistics {


    private Instant startTime;

    @ManyToOne
    @JoinColumn(name = "tournament_id", referencedColumnName = "id")
    private Tournament tournament;

    @Column(name = "status")
    private String status;

    @OneToOne
    @JoinColumn(name = "home_team_id", referencedColumnName = "id")
    private Team homeTeam;
    @OneToOne
    @JoinColumn(name = "away_team_id", referencedColumnName = "id")
    private Team awayTeam;

    @ManyToOne
    @JoinColumn(name = "round_id", referencedColumnName = "id")
    private Round round;

    public Match(long id, Instant startTime, Round round, Tournament tournament, Team homeTeam, Team awayTeam) {
        this.setId(id);
        this.startTime = startTime;
        this.round = round;
        this.tournament = tournament;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
    }
}
