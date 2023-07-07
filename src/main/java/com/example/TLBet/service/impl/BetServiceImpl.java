package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.Bet;
import com.example.TLBet.models.entities.Match;
import com.example.TLBet.models.entities.User;
import com.example.TLBet.models.exeptions.MatchStartedException;
import com.example.TLBet.models.service.BetRankingServiceModel;
import com.example.TLBet.models.view.BetView;
import com.example.TLBet.models.view.NewBetView;
import com.example.TLBet.repository.BetRepository;
import com.example.TLBet.service.AuthenticationService;
import com.example.TLBet.service.BetService;
import com.example.TLBet.service.MatchService;
import com.example.TLBet.utils.DateUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BetServiceImpl implements BetService {

    private final AuthenticationService userService;
    private final BetRepository repository;
    private final MatchService matchService;

    @Override
    @Transactional
    public NewBetView createBet(NewBetView bet) {

        User userByUsername = userService.getUserByUsername(bet.getUsername());
        Match match = matchService.getMatchById(bet.getMatchId());



        if(Instant.now().isAfter(match.getStartTime())){
             throw new MatchStartedException();
        }

        Bet betToSave = Bet.builder()
                .user(userByUsername)
                .match(match)
                .build();
        betToSave.setHomeTeamGoals(bet.getHomeTeamGoals());
        betToSave.setAwayTeamGoals(bet.getAwayTeamGoals());

        Bet save = repository.save(betToSave);

        return NewBetView.builder()
                .username(save.getUser().getUsername())
                .matchId(save.getMatch().getId())
                .awayTeamGoals(save.getAwayTeamGoals())
                .homeTeamGoals(save.getHomeTeamGoals())
                .build();

    }

    @Override
    public List<BetView> getAllBetsByUser(long id) {
        Instant now = Instant.now();
        Instant instant = DateUtil.parseInstant(now);
       return repository.findAllByUserIdAndMatchStartTimeBefore(id, instant)
                .stream()
                .map(bet -> BetView.builder()
                        .homeTeam(bet.getMatch().getHomeTeam().getName())
                        .homeTeamGoals(bet.getHomeTeamGoals())
                        .awayTeam(bet.getMatch().getAwayTeam().getName())
                        .awayTeamGoals(bet.getAwayTeamGoals())
                        .tournamentName(bet.getMatch().getTournament().getName())
                        .build())
                .toList();
    }

    @Override
    public List<BetView> getAllBetsByUsername(String username) {
        return repository.findBetsByUserUsername(username)
                .stream()
                .map(bet -> BetView
                        .builder()
                        .homeTeam(bet.getMatch().getHomeTeam().getName())
                        .homeTeamGoals(bet.getHomeTeamGoals())
                        .awayTeam(bet.getMatch().getAwayTeam().getName())
                        .awayTeamGoals(bet.getAwayTeamGoals())
                        .tournamentName(bet.getMatch().getTournament().getName())
                        .build())
                        .toList();


    }

    @Override
    public List<BetView> getAllBets() {
        return repository.findAll().stream().map(bet -> BetView
                .builder()
                .homeTeam(bet.getMatch().getHomeTeam().getName())
                .homeTeamGoals(bet.getHomeTeamGoals())
                .awayTeam(bet.getMatch().getAwayTeam().getName())
                .awayTeamGoals(bet.getAwayTeamGoals())
                .tournamentName(bet.getMatch().getTournament().getName())
                .build())
                .toList();
    }

    @Override
    public List<BetRankingServiceModel> getAllBetsForRanking() {
        return repository.findAll().stream().map(bet ->
            BetRankingServiceModel
                    .builder()
                    .username(bet.getUser().getUsername())
                    .matchHomeTeamGoals(bet.getMatch().getHomeTeamGoals())
                    .matchAwayTeamGoals(bet.getMatch().getAwayTeamGoals())
                    .betHomeTeamGoals(bet.getHomeTeamGoals())
                    .betAwayTeamGoals(bet.getAwayTeamGoals())
                    .build()
        ).toList();
    }

    @Override
    public List<BetRankingServiceModel> getAllBetsForRankingByRound(int round) {
        return repository.findAllByMatchRound(round).stream().map(bet ->
                BetRankingServiceModel
                        .builder()
                        .username(bet.getUser().getUsername())
                        .matchHomeTeamGoals(bet.getMatch().getHomeTeamGoals())
                        .matchAwayTeamGoals(bet.getMatch().getAwayTeamGoals())
                        .betHomeTeamGoals(bet.getHomeTeamGoals())
                        .betAwayTeamGoals(bet.getAwayTeamGoals())
                        .build()
        ).toList();

    }

    @Override
    public List<BetRankingServiceModel> getAllBetsForCurrentYearRanking() {
       return repository.findBetsByMatchStartTimeFromCurrentYear().stream().map(bet ->
                BetRankingServiceModel
                        .builder()
                        .username(bet.getUser().getUsername())
                        .matchHomeTeamGoals(bet.getMatch().getHomeTeamGoals())
                        .matchAwayTeamGoals(bet.getMatch().getAwayTeamGoals())
                        .betHomeTeamGoals(bet.getHomeTeamGoals())
                        .betAwayTeamGoals(bet.getAwayTeamGoals())
                        .build()
        ).toList();
    }
}
