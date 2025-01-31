package com.example.TLBet.repository;

import com.example.TLBet.models.entities.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

    @Query(value =
            "select m                   " +
            "from Match m               " +
            "where m.round.id = :round  " +
            "order by m.id desc         ")
    List<Match> getLastRoundMatches(@Param("round") long round);

    List<Match> getAllByRoundIdOrderByIdDesc(Long roundId);
}
