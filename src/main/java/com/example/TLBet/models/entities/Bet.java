package com.example.TLBet.models.entities;

import com.example.TLBet.models.MatchStatistics;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "bets")
public class Bet extends MatchStatistics {
    private Instant createdOn;

    @ManyToOne
    @JoinColumn(name = "match_id", referencedColumnName = "id")
    private Match match;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Bet(Long id, Match match, User user, Integer homeTeamGoals, Integer awayTeamGoals) {
        this.setId(id);
        this.match = match;
        this.user = user;
        this.setHomeTeamGoals(homeTeamGoals);
        this.setAwayTeamGoals(awayTeamGoals);
    }
}
