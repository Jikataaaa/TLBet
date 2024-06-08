package com.example.TLBet.repository;

import com.example.TLBet.models.entities.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    Optional<Team> findTeamByName(String name);

    List<Team> findAllByLeague_IdOrderByIdDesc(Long leagueId);

    List<Team> findAllByOrderByIdDesc();
}
