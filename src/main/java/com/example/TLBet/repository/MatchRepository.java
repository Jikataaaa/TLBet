package com.example.TLBet.repository;

import com.example.TLBet.models.entities.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

    @Query(nativeQuery = true
            ,value = "select round from matches\n" +
            "order by round desc\n" +
            "limit 1")
    Optional<Integer> getLastRound();

    List<Match> findAllByStartTimeAfterAndIdNotIn(Instant now, List<Long> matchIds);
}
