package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.Round;
import com.example.TLBet.models.service.BetRankingServiceModel;
import com.example.TLBet.models.service.RankingServiceModel;
import com.example.TLBet.models.view.RankingView;
import com.example.TLBet.service.BetService;
import com.example.TLBet.service.MatchService;
import com.example.TLBet.service.RankingService;
import com.example.TLBet.service.RoundService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService {
    private final BetService betService;
    private final MatchService matchService;
    private final RoundService roundService;
    private static final int POINTS_FOR_MATCH_RESULT = 5;
    private static final int POINTS_FOR_MATCH_SIGN = 2;


    @Override
    public List<RankingView> getInGeneralRanking() {

        Round lastRound = roundService.getLastRound();

        List<BetRankingServiceModel> currentBets = betService.getAllBetsForRanking();
        List<BetRankingServiceModel> lastRoundBets = betService.getAllBetsForRankingByRound(roundService.getById(lastRound.getId() - 1));

        Map<String, RankingServiceModel> currentView = calculateRanking(currentBets);
        Map<String, RankingServiceModel> lastRoundView = calculateRanking(lastRoundBets);

        return calculateDifferenceRanking(currentView, lastRoundView);
    }

    @Override
    public List<RankingView> getLastRoundRanking() {
        Round lastRound = roundService.getLastRound();

        List<BetRankingServiceModel> currentBets = betService.getAllBetsForRankingByRound(roundService.getById(lastRound.getId()));
        List<BetRankingServiceModel>  lastRoundBets = betService.getAllBetsForRankingByRound(roundService.getById(lastRound.getId() - 1));


        Map<String, RankingServiceModel> currentView = calculateRanking(currentBets);
        Map<String, RankingServiceModel> lastRoundView = calculateRanking(lastRoundBets);

        return calculateDifferenceRanking(currentView, lastRoundView);
    }

    @Override
    public List<RankingView> getCurrentYearRanking() {

        Round lastRound = roundService.getLastRound();

        List<BetRankingServiceModel> currentBets = betService.getAllBetsForCurrentYearRanking();
        List<BetRankingServiceModel> lastRoundBets = betService.getAllBetsForRankingByRound(roundService.getById(lastRound.getId() - 1));

        Map<String, RankingServiceModel> currentView = calculateRanking(currentBets);
        Map<String, RankingServiceModel> lastRoundView = calculateRanking(lastRoundBets);

        return calculateDifferenceRanking(currentView, lastRoundView);
    }

    private List<RankingView> calculateDifferenceRanking( Map<String, RankingServiceModel> currentView,   Map<String, RankingServiceModel> lastRoundView) {

        List<RankingView> list = new ArrayList<>();

        for (Map.Entry<String, RankingServiceModel> entry : currentView.entrySet()) {

            String username = entry.getKey();
            RankingServiceModel value = entry.getValue();

            int currentPlace = entry.getValue().getPlace();
            RankingServiceModel lastRoundModel = lastRoundView.get(username);

            RankingView view = RankingView
                    .builder()
                    .username(username)
                    .points(value.getPoints())
                    .build();

            if(lastRoundModel == null){
                view.setRankingDifferences(0);
            }else {
                view.setRankingDifferences(currentPlace - lastRoundModel.getPlace());
            }
            list.add(view);

        }


        return list
                .stream()
                .sorted((e1, e2) -> Long.compare(e2.getPoints(), e1.getPoints()))
                .collect(Collectors.toList());
    }


    private Map<String, RankingServiceModel> calculateRanking(List<BetRankingServiceModel> bets){

        Map<String, Integer> map = new TreeMap<>();
            for (BetRankingServiceModel bet : bets) {
                String username = bet.getUsername();
                map.putIfAbsent(username, 0);
                int matchHomeTeamGoals = bet.getMatchHomeTeamGoals();
                int matchAwayTeamGoals = bet.getMatchAwayTeamGoals();
                int betHomeTeamGoals = bet.getBetHomeTeamGoals();
                int betAwayTeamGoals = bet.getBetAwayTeamGoals();

                //check for exact result
                if(matchHomeTeamGoals == betHomeTeamGoals && matchAwayTeamGoals == betAwayTeamGoals){
                    map.put(username, map.get(username) + POINTS_FOR_MATCH_RESULT);
                    continue;
                }

                //check for sign of the match
                if((matchHomeTeamGoals > matchAwayTeamGoals && betHomeTeamGoals > betAwayTeamGoals)
                        || (matchHomeTeamGoals < matchAwayTeamGoals && betHomeTeamGoals < betAwayTeamGoals)
                        ||(matchHomeTeamGoals == matchAwayTeamGoals && betHomeTeamGoals == betAwayTeamGoals)){
                    map.put(username, map.get(username) + POINTS_FOR_MATCH_SIGN);
                }
            }
            List<RankingServiceModel> list = new ArrayList<>();

        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            RankingServiceModel model = RankingServiceModel.builder()
                    .username(entry.getKey())
                    .points(entry.getValue())
                    .build();

            list.add(model);
        }
           list =   list
                    .stream()
                    .sorted((e1, e2) -> Long.compare(e2.getPoints(), e1.getPoints()))
                    .collect(Collectors.toList());

        Map<String, RankingServiceModel> rankingMap = new HashMap<>();

        for (int i = 0; i < list.size(); i++) {
            RankingServiceModel model = list.get(i);
            model.setPlace(i+1);
            rankingMap.put(model.getUsername(), model);
        }

        return rankingMap;

    }
}
