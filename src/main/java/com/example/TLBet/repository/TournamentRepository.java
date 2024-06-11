package com.example.TLBet.repository;

import com.example.TLBet.models.entities.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TournamentRepository extends JpaRepository<Tournament, Long> {
    List<Tournament> findAllByOrderByIdDesc();
}
