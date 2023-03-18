package com.example.TLBet.service.impl;

import com.example.TLBet.models.service.BetRankingServiceModel;
import com.example.TLBet.models.view.RankingView;
import com.example.TLBet.service.BetService;
import com.example.TLBet.service.MatchService;
import com.example.TLBet.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService {
    private final BetService betService;
    private final MatchService matchService;


    @Override
    public List<RankingView> getInGeneralRanking() {
        List<BetRankingServiceModel> bets = betService.getAllBetsForRanking();
        return calculateRanking(bets);
    }

    @Override
    public List<RankingView> getLastRoundRanking() {
        int lastRound = matchService.getLastRound();
        List<BetRankingServiceModel> bets = betService.getAllBetsForRankingByRound(lastRound);
        return calculateRanking(bets);
    }

    @Override
    public List<RankingView> getCurrentYearRanking() {
        List<BetRankingServiceModel> bets = betService.getAllBetsForCurrentYearRanking();
        return calculateRanking(bets);
    }


    private List<RankingView> calculateRanking(List<BetRankingServiceModel> bets){

        Map<String, Integer> map = new HashMap<>();
        List<RankingView> list = new ArrayList<>();
            for (BetRankingServiceModel bet : bets) {
                String username = bet.getUsername();
                map.putIfAbsent(username, 0);
                int matchHomeTeamGoals = bet.getMatchHomeTeamGoals();
                int matchAwayTeamGoals = bet.getMatchAwayTeamGoals();
                int betHomeTeamGoals = bet.getBetHomeTeamGoals();
                int betAwayTeamGoals = bet.getBetAwayTeamGoals();

                //check for exact result
                if(matchHomeTeamGoals == betHomeTeamGoals && matchAwayTeamGoals == betAwayTeamGoals){
                    map.put(username, map.get(username) + 5);
                    continue;
                }

                //check for sign of the match
                if((matchHomeTeamGoals > matchAwayTeamGoals && betHomeTeamGoals > betAwayTeamGoals)
                        || (matchHomeTeamGoals < matchAwayTeamGoals && betHomeTeamGoals < betAwayTeamGoals)
                        ||(matchHomeTeamGoals == matchAwayTeamGoals && betHomeTeamGoals == betAwayTeamGoals)){
                }
            }
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            RankingView build = RankingView
                    .builder()
                    .username(entry.getKey())
                    .points(entry.getValue())
                    .build();
            list.add(build);
        }

        return list;
    }
}
