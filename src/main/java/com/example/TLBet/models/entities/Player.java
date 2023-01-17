package com.example.TLBet.models.entities;

import com.example.TLBet.models.BaseEntity;
import com.example.TLBet.models.enums.PlayerPositions;
import jakarta.persistence.*;

@Entity
@Table(name = "players")
public class Player extends BaseEntity {
    private String firstname;
    private String lastname;

    @Enumerated(EnumType.STRING)
    private PlayerPositions position;

    @ManyToOne
    @JoinColumn(name = "team_id", referencedColumnName = "id")
    private Team team;
}
