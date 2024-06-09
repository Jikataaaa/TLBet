package com.example.TLBet.models.entities;

import com.example.TLBet.models.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "teams")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Team extends BaseEntity {

    private String name;

    @Column(name = "image_url", columnDefinition = "TEXT", length = 1000000)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "league_id", referencedColumnName = "id")
    private League league;

}
