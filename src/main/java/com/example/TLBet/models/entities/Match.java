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

    @OneToOne
    @JoinColumn(name = "home_team_id", referencedColumnName = "id")
    private Team homeTeam;
    @OneToOne
    @JoinColumn(name = "away_team_id", referencedColumnName = "id")
    private Team awayTeam;

    @ManyToOne
    @JoinColumn(name = "round_id", referencedColumnName = "id")
    private Round round;

    public Match(Long id, Instant startTime, Round round, Team homeTeam, Team awayTeam) {
        this.setId(id);
        this.startTime = startTime;
        this.round = round;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
    }
}
