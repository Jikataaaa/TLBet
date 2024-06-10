package com.example.TLBet.models.entities;

import com.example.TLBet.models.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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

    @OneToMany(mappedBy = "tournament", targetEntity = Round.class)
    private Set<Round> rounds;
}
