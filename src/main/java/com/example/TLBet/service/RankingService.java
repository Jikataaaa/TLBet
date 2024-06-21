package com.example.TLBet.service;

import com.example.TLBet.models.view.RankingView;
import com.example.TLBet.models.view.RoundView;

import java.util.List;

public interface RankingService {

    List<RankingView> getInGeneralRanking();
    List<RankingView> getRankingByRound(long roundId);
    List<RoundView> getRoundsWithPopulatedResults();
}
