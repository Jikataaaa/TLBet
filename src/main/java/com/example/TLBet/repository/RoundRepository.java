package com.example.TLBet.repository;

import com.example.TLBet.models.entities.Round;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface RoundRepository extends JpaRepository<Round, Long> {
    Round findFirstByOrderByIdDesc();

    List<Round> findRoundsByTournamentIdOrderByIdDesc(long tournamentId);
    @Modifying
    @Query(value =
            "update Round r             " +
            "set r.isActive = false     " +
            "where r.isActive = true    ")
    void setAllIsActiveFalse();

    @Query(value =
            "select count(*)    " +
            "from Round r       ")
    int getRoundCount();

    @Query(value =
            "select distinct r.id                                               " +
            "from Round r                                                       " +
            "join Match m                                                       " +
            "on m.round.id = r.id                                               " +
            "where m.homeTeamGoals is not null or m.awayTeamGoals is not null   " +
            "order by r.id                                                      ")
    List<Long> getRoundIdsWithPopulatedResults();

    Optional<Round> findByIsActiveIsTrueAndTournament_IsActiveIsTrue();
}
