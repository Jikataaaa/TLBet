package com.example.TLBet.service;

import com.example.TLBet.models.view.BetView;
import com.example.TLBet.models.view.NewBetView;

import java.util.List;

public interface BetService {
    NewBetView createBet(NewBetView bet);

    List<BetView> getAllBetsByUser(long id);
}
