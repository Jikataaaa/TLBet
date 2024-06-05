package com.example.TLBet.repository;

import com.example.TLBet.models.entities.Bet;
import com.example.TLBet.models.entities.Match;
import com.example.TLBet.models.entities.Round;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface BetRepository extends JpaRepository<Bet, Long> {

    List<Bet> findAllByUserIdAndMatchStartTimeBefore(Long id, Instant now);

    List<Bet> findBetsByUserUsernameAndMatchStartTimeAfter(String username, Instant now);

    List<Bet> findAllByMatchRound(Round match_round);
    @Query(nativeQuery = true, value = "select b.id, b.user_id, b.match_id, b.home_team_goals, b.away_team_goals from bets b\n" +
            "left join matches m on m.id = b.match_id\n" +
            "where YEAR(m.start_time) = YEAR(CURDATE());")
    List<Bet> findBetsByMatchStartTimeFromCurrentYear();

    boolean existsBetByMatchAndUserUsername(Match match, String username);

    List<Bet> findBetsByUserUsernameAndMatchRound(String username, Round round);
}
