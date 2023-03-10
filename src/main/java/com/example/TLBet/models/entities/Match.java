package com.example.TLBet.models.entities;

import com.example.TLBet.models.MatchStatistics;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;

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

    @OneToOne
    @JoinColumn(name = "home_team_id", referencedColumnName = "id")
    private Team homeTeam;
    @OneToOne
    @JoinColumn(name = "away_team_id", referencedColumnName = "id")
    private Team awayTeam;


}
