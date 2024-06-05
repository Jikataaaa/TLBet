package com.example.TLBet.service;

import com.example.TLBet.models.entities.Bet;
import com.example.TLBet.models.entities.Match;
import com.example.TLBet.models.entities.Round;
import com.example.TLBet.models.service.BetRankingServiceModel;
import com.example.TLBet.models.view.BetView;
import com.example.TLBet.models.view.NewBetView;

import java.util.List;

public interface BetService {

    List<BetView> getAllBetsByUser(long id);

    List<BetView> getAllBetsByUsername(String username);

    List<BetRankingServiceModel> getAllBetsForRanking();

    List<BetRankingServiceModel> getAllBetsForRankingByRound(Round round);

    List<BetRankingServiceModel> getAllBetsForCurrentYearRanking();

    List<NewBetView> createBets(List<NewBetView> bets, String username);

    boolean checkExistingBetOnMatch(Match match, String username);

    List<Bet> findBetsByUserUsernameAndMatchRound(String username, Round round);
}
