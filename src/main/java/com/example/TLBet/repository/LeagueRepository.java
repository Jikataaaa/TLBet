package com.example.TLBet.repository;

import com.example.TLBet.models.entities.League;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeagueRepository extends JpaRepository<League, Long> {
    List<League> findAllByOrderByIdDesc();
}
