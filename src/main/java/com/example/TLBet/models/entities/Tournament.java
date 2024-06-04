package com.example.TLBet.models.entities;

import com.example.TLBet.models.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @OneToMany(mappedBy = "tournament", targetEntity = Match.class)
    private Set<Match> matches;
    @ManyToMany
    @JoinTable(name = "tournaments_teams",
            joinColumns = @JoinColumn(name = "tournament_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "team_id", referencedColumnName = "id"))
    private Set<Team> teams;


}
