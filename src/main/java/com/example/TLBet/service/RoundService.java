package com.example.TLBet.service;

import com.example.TLBet.models.entities.Round;

public interface RoundService {

    Round getLastRound();

    Round getById(long id);

}
