package com.example.TLBet.models.entities;

import com.example.TLBet.models.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Set;

@Entity
@Data
@Table(name = "tournaments")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Tournament extends BaseEntity {
    private String name;
    private boolean isActive;

    @Column(name = "winner_team_id")
    private Long winnerTeamId;

    @Basic
    @Column(name = "winner_pick_expiration_date")
    private Instant winnerPickExpirationDate;

    @OneToMany(mappedBy = "tournament", targetEntity = Round.class)
    private Set<Round> rounds;
}
