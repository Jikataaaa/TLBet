package com.example.TLBet.models.entities;

import com.example.TLBet.models.BaseEntity;
import jakarta.persistence.*;
import org.hibernate.annotations.DynamicInsert;

@Entity
@lombok.Data
@lombok.EqualsAndHashCode(callSuper = true)
@DynamicInsert
@Table(name = "tournament_bet_winner")
public class TournamentBetWinner extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @Basic
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", insertable = false, updatable = false)
    private Team team;

    @Basic
    @Column(name = "team_id", nullable = false)
    private Long teamId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tournament_id", insertable = false, updatable = false)
    private Tournament tournament;

    @Basic
    @Column(name = "tournament_id", nullable = false)
    private Long tournamentId;
}
