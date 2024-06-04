package com.example.TLBet.models.entities;

import com.example.TLBet.models.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "teams")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Team extends BaseEntity {

    private String name;
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "league_id", referencedColumnName = "id")
    private League league;

}
