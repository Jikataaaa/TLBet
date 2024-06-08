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

    List<Round>  findRoundsByTournamentId(long tournamentId);
    @Modifying
    @Query(value =
            "update Round r             " +
            "set r.isActive = false     " +
            "where r.isActive = true    ")
    void setAllIsActiveFalse();

    Optional<Round> findByIsActiveIsTrueAndTournament_IsActiveIsTrue();
}
