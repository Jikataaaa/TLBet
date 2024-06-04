package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.Round;
import com.example.TLBet.repository.RoundRepository;
import com.example.TLBet.service.RoundService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RoundServiceImpl implements RoundService {
    private final RoundRepository repository;
    @Override
    public Round getLastRound() {
        return repository.findFirstByOrderByIdDesc();
    }

    @Override
    public Round getById(long id) {
        return repository.findById(id).orElseThrow();
    }
}
