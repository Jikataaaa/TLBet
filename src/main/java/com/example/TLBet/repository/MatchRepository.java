package com.example.TLBet.repository;

import com.example.TLBet.models.entities.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

    @Query(nativeQuery = true
            ,value = "select round from matches\n" +
            "order by round desc\n" +
            "limit 1")
    int getLastRound();
}
