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

    List<Bet> findAllByUserIdAndMatchStartTimeBeforeOrderByIdDesc(Long id, Instant now);

    List<Bet> findBetsByUserUsernameAndMatchStartTimeAfterOrderByIdDesc(String username, Instant now);
    List<Bet> findBetsByUser_UsernameAndMatch_StartTimeAfterOrderByIdDesc(String username, Instant now);

    List<Bet> findAllByMatchRoundOrderByIdDesc(Round match_round);
    @Query(value =
            "select b.id, b.user_id, b.match_id, b.home_team_goals, b.away_team_goals   " +
            "from bets b left join matches m on m.id = b.match_id                       " +
            "where YEAR(m.start_time) = YEAR(CURDATE())                                 " +
            "order by b.id desc                                                         ",nativeQuery = true)
    List<Bet> findBetsByMatchStartTimeFromCurrentYear();

    boolean existsBetByMatchAndUserUsername(Match match, String username);

    List<Bet> findBetsByUserUsernameAndMatchRoundOrderByIdDesc(String username, Round round);

    List<Bet> findAllByOrderByIdDesc();
}
