package com.example.TLBet.models.entities;

import com.example.TLBet.models.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.Set;

@Entity
@Table(name = "teams")
public class Team extends BaseEntity {

    private String name;

    @OneToMany(mappedBy = "team", targetEntity = Player.class)
    private Set<Player> players;

}
