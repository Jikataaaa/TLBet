package com.example.TLBet.repository;

import com.example.TLBet.models.entities.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

//    @Query(nativeQuery = true
//            ,value = "select round from matches\n" +
//            "order by round desc\n" +
//            "limit 1")
//    Optional<Integer> getLastRound();

    @Query(value =
            "select m                   " +
            "from Match m               " +
            "where m.round.id = :round  ")
    List<Match> getLastRoundMatches(@Param("round") long round);
}
