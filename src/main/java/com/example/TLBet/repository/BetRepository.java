package com.example.TLBet.repository;

import com.example.TLBet.models.entities.Bet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface BetRepository extends JpaRepository<Bet, Long> {

    List<Bet> findAllByUserIdAndMatchStartTimeBefore(Long id, Instant now);

    List<Bet> findBetsByUserUsernameAndMatchStartTimeAfter(String username, Instant now);

    List<Bet> findAllByMatchRound(int round);
    @Query(nativeQuery = true, value = "select b.id, b.user_id, b.match_id, b.home_team_goals, b.away_team_goals from bets b\n" +
            "left join matches m on m.id = b.match_id\n" +
            "where YEAR(m.start_time) = YEAR(CURDATE());")
    List<Bet> findBetsByMatchStartTimeFromCurrentYear();

    @Query(nativeQuery = true, value = "select  b.match_id from bets b\n" +
            "where user_id = :userId")
    List<Long> getAllMatchIdsBetByUserId(@Param("userId") Long id);



}
