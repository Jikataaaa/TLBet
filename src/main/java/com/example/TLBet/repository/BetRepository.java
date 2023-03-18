package com.example.TLBet.repository;

import com.example.TLBet.models.entities.Bet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface BetRepository extends JpaRepository<Bet, Long> {

    List<Bet> findAllByUserIdAndMatchStartTimeBefore(Long id, Instant now);

    List<Bet> findBetsByUserUsername(String username);

    List<Bet> findAllByMatchRound(int round);
    @Query(nativeQuery = true, value = "select * from bets b\n" +
            "left join matches m on m.id = b.match_id\n" +
            "where YEAR(m.start_time) = YEAR(CURDATE())")
    List<Bet> findBetsByMatchStartTimeFromCurrentYear();



}
