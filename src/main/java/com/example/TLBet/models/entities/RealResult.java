package com.example.TLBet.models.entities;

import com.example.TLBet.models.MatchStatistics;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "real_results")
public class RealResult extends MatchStatistics {

}
