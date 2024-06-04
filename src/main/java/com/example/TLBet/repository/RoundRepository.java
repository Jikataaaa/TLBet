package com.example.TLBet.repository;

import com.example.TLBet.models.entities.Round;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoundRepository extends JpaRepository<Round, Long> {
    Round findFirstByOrderByIdDesc();
}
