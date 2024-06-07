package com.example.TLBet.repository;

import com.example.TLBet.models.entities.Round;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RoundRepository extends JpaRepository<Round, Long> {
    Round findFirstByOrderByIdDesc();

    List<Round>  findRoundsByTournamentId(long tournamentId);

    @Query(value = "update Round r " +
            "set r.isActive = false ")
    void setAllIsActiveFalse();
}
