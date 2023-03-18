package com.example.TLBet.service;

import com.example.TLBet.models.service.BetRankingServiceModel;
import com.example.TLBet.models.view.BetView;
import com.example.TLBet.models.view.NewBetView;

import java.util.List;

public interface BetService {
    NewBetView createBet(NewBetView bet);

    List<BetView> getAllBetsByUser(long id);

    List<BetView> getAllBetsByUsername(String username);

    List<BetView> getAllBets();

    List<BetRankingServiceModel> getAllBetsForRanking();

    List<BetRankingServiceModel> getAllBetsForRankingByRound(int round);

    List<BetRankingServiceModel> getAllBetsForCurrentYearRanking();
}
