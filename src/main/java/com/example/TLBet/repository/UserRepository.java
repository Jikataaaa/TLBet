package com.example.TLBet.repository;

import com.example.TLBet.models.entities.TournamentBetWinner;
import com.example.TLBet.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByUsername(String username);

    List<User> findAllByOrderByIdDesc();

    @Query(value =
            "select new User(u.firstName, u.lastName, u.username)   " +
            "from User u                                            " +
            "order by u.id desc                                     ")
    List<User> findAllFullNames();

    Optional<User> findByUsernameOrEmail(String username, String email);

    @Query(value =
            "select tbw                                                         " +
            "from TournamentBetWinner tbw  join User u on tbw.userId = u.id     " +
            "where tbw.userId = :id and tbw.tournament.isActive = true          "
    )
    Optional<TournamentBetWinner> findUserChoiceForWinner(@Param("id") Long id);

    @Query(value =
            "SELECT u.id, u.username, u.first_name, u.last_name, COUNT(*) AS exact_results_won  " +
            "FROM users u                                                                       " +
            "         JOIN bets b ON u.id = b.user_id                                           " +
            "         JOIN matches m ON b.match_id = m.id                                       " +
            "WHERE b.home_team_goals = m.home_team_goals                                        " +
            "  AND b.away_team_goals = m.away_team_goals                                        " +
            "GROUP BY u.id, u.username, u.first_name, u.last_name                               " +
            "ORDER BY exact_results_won DESC;                                                   ", nativeQuery = true)
    Optional<List<Object>> findAllUsersWithMostExactResults();

    @Query(value =
            "SELECT u.id, u.username, u.first_name, u.last_name, COUNT(*) AS correct_signs_count                " +
            "FROM users u                                                                                       " +
            "         JOIN bets b ON u.id = b.user_id                                                           " +
            "         JOIN matches m ON b.match_id = m.id                                                       " +
            "WHERE                                                                                              " +
            "    (SIGN(b.home_team_goals - b.away_team_goals) = SIGN(m.home_team_goals - m.away_team_goals))    " +
            "GROUP BY u.id, u.username, u.first_name, u.last_name                                               " +
            "ORDER BY correct_signs_count DESC;                                                                 ", nativeQuery = true)
    Optional<List<Object>> findAllUsersWithMostCorrectMatchWinner();

    @Query(value =
            "WITH team_predictions AS (                                                         " +
            "    SELECT team_id, COUNT(*) AS team_count                                         " +
            "    FROM tournament_bet_winner                                                     " +
            "    GROUP BY team_id                                                               " +
            "),                                                                                 " +
            "     total_predictions AS (                                                        " +
            "         SELECT COUNT(*) AS total_count                                            " +
            "         FROM tournament_bet_winner                                                " +
            "     )                                                                             " +
            "SELECT                                                                             " +
            "    t.name AS team_name,                                                           " +
            "    ROUND((tp.team_count / total_predictions.total_count) * 100, 2) AS percentage, " +
            "    tp.team_count AS COUNT                                                         " +
            "FROM                                                                               " +
            "    team_predictions tp                                                            " +
            "        JOIN                                                                       " +
            "    teams t ON tp.team_id = t.id                                                   " +
            "        CROSS JOIN                                                                 " +
            "    total_predictions                                                              " +
            "ORDER BY percentage DESC                                                           ", nativeQuery = true)
    Optional<List<Object>> findAllUsersTeamPickPercentage();
}
