package com.example.TLBet.repository;

import com.example.TLBet.models.entities.TournamentBetWinner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TournamentBetWinnerRepository extends JpaRepository<TournamentBetWinner, Long> {

    Optional<TournamentBetWinner> findByUserIdAndTournament_IsActiveIsTrue(Long id);

    List<TournamentBetWinner> findAllByTeamIdAndTournament_IsActiveIsTrue(Long winnerTeamId);

    Optional<TournamentBetWinner> findByUserId(Long id);
}
