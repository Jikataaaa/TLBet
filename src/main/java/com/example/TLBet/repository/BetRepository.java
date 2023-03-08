package com.example.TLBet.repository;

import com.example.TLBet.models.entities.Bet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface BetRepository extends JpaRepository<Bet, Long> {

    List<Bet> findAllByUserIdAndMatchStartTimeBefore(Long id, Instant now);

}
