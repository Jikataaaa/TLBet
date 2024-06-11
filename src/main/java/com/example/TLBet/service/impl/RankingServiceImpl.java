package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.Bet;
import com.example.TLBet.models.entities.Round;
import com.example.TLBet.models.exeptions.NoContentException;
import com.example.TLBet.models.service.BetRankingServiceModel;
import com.example.TLBet.models.service.RankingServiceModel;
import com.example.TLBet.models.view.RankingView;
import com.example.TLBet.models.view.RoundOutView;
import com.example.TLBet.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static com.example.TLBet.utils.Constants.*;

@Service
@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService {
    private final BetService betService;
    private final RoundService roundService;
    private final UserService userService;

    @Override
    public List<RankingView> getInGeneralRanking(){
        List<Long> playedRoundIds = roundService.getRoundIdsWithPopulatedResults();
        List<RankingView> list;
        List<String> allFullNames = userService.findAllFullNames();
        if(playedRoundIds.size() > 1){
            List<Bet> currentBets = betService.getBetsByRoundIdLower(playedRoundIds.get(playedRoundIds.size()-1));
            List<Bet> lastRoundBets = betService.getBetsByRoundIdLower(playedRoundIds.get(playedRoundIds.size()-2));
            Map<String, RankingServiceModel> currentView = calculateRanking(currentBets);
            Map<String, RankingServiceModel> lastRoundView = calculateRanking(lastRoundBets);
            list = calculateDifferenceRanking(currentView, lastRoundView);
        }else if (playedRoundIds.size() == 1){
            List<Bet> currentBets = betService.getBetsByRoundIdLower(playedRoundIds.get(0));
            Map<String, RankingServiceModel> currentView = calculateRanking(currentBets);
            list = calculateDifferenceRanking(currentView, currentView);
        }else {

           list = allFullNames
                   .stream()
                   .map(u -> RankingView.builder()
                           .rankingDifferences(0)
                           .points(0)
                           .username(u)
                           .build()).toList();
            int place = 0;
            for (RankingView rankingView : list) {
                rankingView.setPlace(++place);
            }
        }


        return list;
    }

//    @Override
//    public List<RankingView> getLastRoundRanking() {
//        Round lastRound = roundService.getLastRound();
//
//        List<BetRankingServiceModel> currentBets = betService.getAllBetsForRankingByRound(roundService.getById(lastRound.getId()));
//        List<BetRankingServiceModel> lastRoundBets = betService.getAllBetsForRankingByRound(roundService.getById(lastRound.getId() - 1));
//
//
//        Map<String, RankingServiceModel> currentView = calculateRanking(currentBets);
//        Map<String, RankingServiceModel> lastRoundView = calculateRanking(lastRoundBets);
//
//        return calculateDifferenceRanking(currentView, lastRoundView);
//    }
//
//    @Override
//    public List<RankingView> getCurrentYearRanking() {
//
//        Round lastRound = roundService.getLastRound();
//
//        List<BetRankingServiceModel> currentBets = betService.getAllBetsForCurrentYearRanking();
//        List<BetRankingServiceModel> lastRoundBets = betService.getAllBetsForRankingByRound(roundService.getById(lastRound.getId() - 1));
//
//        Map<String, RankingServiceModel> currentView = calculateRanking(currentBets);
//        Map<String, RankingServiceModel> lastRoundView = calculateRanking(lastRoundBets);
//
//        return calculateDifferenceRanking(currentView, lastRoundView);
//    }

    private List<RankingView> calculateDifferenceRanking(Map<String, RankingServiceModel> currentView, Map<String, RankingServiceModel> lastRoundView) {

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

            if (lastRoundModel == null) {
                view.setRankingDifferences(0);
            } else {
                view.setRankingDifferences((currentPlace - lastRoundModel.getPlace()) * -1);
            }
            list.add(view);

        }
         list = list
                .stream()
                .sorted((e1, e2) -> Long.compare(e2.getPoints(), e1.getPoints()))
                .collect(Collectors.toList());
        int place = 0;
        for (RankingView rankingView : list) {
            rankingView.setPlace(++place);
        }
        return list;
    }


    private Map<String, RankingServiceModel> calculateRanking(List<Bet> bets) {

        Map<String, Integer> map = new TreeMap<>();
        for (Bet bet : bets) {
            String username = bet.getUser().getUsername();
            map.putIfAbsent(username, 0);
            Integer matchHomeTeamGoals = bet.getMatch().getHomeTeamGoals();
            Integer matchAwayTeamGoals = bet.getMatch().getAwayTeamGoals();

            if(matchHomeTeamGoals == null || matchAwayTeamGoals == null) {
                continue;
            }

            int betHomeTeamGoals = bet.getHomeTeamGoals();
            int betAwayTeamGoals = bet.getAwayTeamGoals();

            //check for exact result
            if (matchHomeTeamGoals == betHomeTeamGoals && matchAwayTeamGoals == betAwayTeamGoals) {
                map.put(username, map.get(username) + POINTS_FOR_MATCH_RESULT);
                continue;
            }

            //check for sign of the match
            if ((matchHomeTeamGoals > matchAwayTeamGoals && betHomeTeamGoals > betAwayTeamGoals)
                    || (matchHomeTeamGoals < matchAwayTeamGoals && betHomeTeamGoals < betAwayTeamGoals)
                    || (matchHomeTeamGoals.equals(matchAwayTeamGoals) && betHomeTeamGoals == betAwayTeamGoals)) {
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
        list = list
                .stream()
                .sorted((e1, e2) -> Long.compare(e2.getPoints(), e1.getPoints()))
                .collect(Collectors.toList());

        Map<String, RankingServiceModel> rankingMap = new HashMap<>();

        for (int i = 0; i < list.size(); i++) {
            RankingServiceModel model = list.get(i);
            model.setPlace(i + 1);
            rankingMap.put(model.getUsername(), model);
        }

        return rankingMap;

    }
}
