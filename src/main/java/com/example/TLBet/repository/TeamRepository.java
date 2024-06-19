package com.example.TLBet.repository;

import com.example.TLBet.models.entities.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findAllByLeague_IdOrderByIdDesc(Long leagueId);

    List<Team> findAllByOrderByNameAsc();
}
