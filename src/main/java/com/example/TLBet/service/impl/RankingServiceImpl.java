package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.Bet;
import com.example.TLBet.models.entities.Tournament;
import com.example.TLBet.models.entities.TournamentBetWinner;
import com.example.TLBet.models.entities.User;
import com.example.TLBet.models.service.RankingServiceModel;
import com.example.TLBet.models.view.RankingView;
import com.example.TLBet.models.view.RoundView;
import com.example.TLBet.service.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.example.TLBet.utils.Constants.*;

@Service
@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService {
    private final BetService betService;
    private final RoundService roundService;
    private final UserService userService;
    private final TournamentService tournamentService;
    private final TournamentBetWinnerService tournamentBetWinnerService;

    @Override
    public List<RankingView> getInGeneralRanking() {
        List<Long> playedRoundIds = roundService.getRoundIdsWithPopulatedResults();
        List<RankingView> list;
        if (playedRoundIds.size() > 1) {
            List<Bet> currentBets = betService.getBetsByRoundIdLower(playedRoundIds.get(playedRoundIds.size() - 1));
            List<Bet> lastRoundBets = betService.getBetsByRoundIdLower(playedRoundIds.get(playedRoundIds.size() - 2));
            Map<User, RankingServiceModel> currentView = calculateRanking(currentBets);
            Map<User, RankingServiceModel> lastRoundView = calculateRanking(lastRoundBets);
            list = calculateDifferenceRanking(currentView, lastRoundView);
        } else if (playedRoundIds.size() == 1) {
            List<Bet> currentBets = betService.getBetsByRoundIdLower(playedRoundIds.get(0));
            Map<User, RankingServiceModel> currentView = calculateRanking(currentBets);
            list = calculateDifferenceRanking(currentView, currentView);
        } else {
            List<User> allFullNames = userService.findAllFullNames();
            list = allFullNames.stream().map(u -> RankingView.builder().rankingDifferences(0).points(0).username(u.getUsername()).firstName(u.getFirstName()).lastName(u.getLastName()).build()).toList();
            int place = 0;
            for (RankingView rankingView : list) {
                rankingView.setPlace(++place);
            }
        }
        return list;
    }

    @Override
    public List<RoundView> getRoundsWithPopulatedResults() {
        return roundService.getRoundsWithPopulatedResults();
    }

    @Override
    public List<RankingView> getRankingByRound(long roundId) {
        List<Bet> currentBets = betService.getBetsByRoundId(roundId);
        Map<User, RankingServiceModel> currentView = calculateRanking(currentBets);
        return calculateDifferenceRanking(currentView, currentView);
    }

    private void addPoints(List<RankingView> list) {
        Tournament tournament = tournamentService.getActiveTournament();
        if (tournament.getWinnerTeamId() != null) {
            List<TournamentBetWinner> tournamentBetWinners = tournamentBetWinnerService.findAllByTeamIdAndTournament_IsActiveIsTrue(tournament.getWinnerTeamId());
            List<User> users = tournamentBetWinners.stream().map(TournamentBetWinner::getUser).toList();
            for (RankingView rankingView : list) {
                for (User user : users) {
                    if (rankingView.getUsername().equals(user.getUsername())) {
                        rankingView.setPoints(rankingView.getPoints() + POINTS_FOR_TEAM_WINNER);
                    }
                }
            }
        }
    }

    private List<RankingView> calculateDifferenceRanking(Map<User, RankingServiceModel> currentView, Map<User, RankingServiceModel> lastRoundView) {

        List<RankingView> list = new ArrayList<>();

        for (Map.Entry<User, RankingServiceModel> entry : currentView.entrySet()) {

            User user = entry.getKey();
            RankingServiceModel value = entry.getValue();

            int currentPlace = entry.getValue().getPlace();
            RankingServiceModel lastRoundModel = lastRoundView.get(user);

            RankingView view = RankingView.builder().firstName(user.getFirstName()).lastName(user.getLastName()).username(user.getUsername()).points(value.getPoints()).build();

            if (lastRoundModel == null) {
                view.setRankingDifferences(0);
            } else {
                view.setRankingDifferences((currentPlace - lastRoundModel.getPlace()) * -1);
            }
            list.add(view);
        }

        addPoints(list);

        list = list.stream().sorted((e1, e2) -> Long.compare(e2.getPoints(), e1.getPoints())).collect(Collectors.toList());
        int place = 0;
        for (RankingView rankingView : list) {
            rankingView.setPlace(++place);
        }
        return list;
    }


    private Map<User, RankingServiceModel> calculateRanking(List<Bet> bets) {

        Map<User, Integer> map = new HashMap<>();
        for (Bet bet : bets) {
            User user = bet.getUser();
            map.putIfAbsent(user, 0);
            Integer matchHomeTeamGoals = bet.getMatch().getHomeTeamGoals();
            Integer matchAwayTeamGoals = bet.getMatch().getAwayTeamGoals();

            if (matchHomeTeamGoals == null || matchAwayTeamGoals == null) {
                continue;
            }

            int betHomeTeamGoals = bet.getHomeTeamGoals();
            int betAwayTeamGoals = bet.getAwayTeamGoals();

            //check for exact result
            if (matchHomeTeamGoals == betHomeTeamGoals && matchAwayTeamGoals == betAwayTeamGoals) {
                map.put(user, map.get(user) + POINTS_FOR_MATCH_RESULT);
                continue;
            }

            //check for sign of the match
            if ((matchHomeTeamGoals > matchAwayTeamGoals && betHomeTeamGoals > betAwayTeamGoals) || (matchHomeTeamGoals < matchAwayTeamGoals && betHomeTeamGoals < betAwayTeamGoals) || (matchHomeTeamGoals.equals(matchAwayTeamGoals) && betHomeTeamGoals == betAwayTeamGoals)) {
                map.put(user, map.get(user) + POINTS_FOR_MATCH_SIGN);
            }
        }
        List<RankingServiceModel> list = new ArrayList<>();

        for (Map.Entry<User, Integer> entry : map.entrySet()) {
            User key = entry.getKey();
            RankingServiceModel model = RankingServiceModel.builder().user(key).points(entry.getValue()).build();

            list.add(model);
        }
        list = list.stream().sorted((e1, e2) -> Long.compare(e2.getPoints(), e1.getPoints())).collect(Collectors.toList());

        Map<User, RankingServiceModel> rankingMap = new HashMap<>();

        for (int i = 0; i < list.size(); i++) {
            RankingServiceModel model = list.get(i);
            model.setPlace(i + 1);
            rankingMap.put(model.getUser(), model);
        }
        return rankingMap;
    }
}
