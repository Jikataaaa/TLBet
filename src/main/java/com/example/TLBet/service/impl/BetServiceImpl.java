package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.Bet;
import com.example.TLBet.models.entities.Match;
import com.example.TLBet.models.entities.Round;
import com.example.TLBet.models.enums.MatchStatus;
import com.example.TLBet.models.view.*;
import com.example.TLBet.repository.BetRepository;
import com.example.TLBet.service.AuthenticationService;
import com.example.TLBet.service.BetService;
import com.example.TLBet.service.MatchService;
import com.example.TLBet.utils.DateUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BetServiceImpl implements BetService {

    private final AuthenticationService userService;
    private final BetRepository repository;
    private final MatchService matchService;

    @Override
    public List<BetView> getAllBetsByUser(long id) {
        Instant now = Instant.now();
        Instant instant = DateUtil.parseInstant(now);
        return repository.findAllByUserIdAndMatchStartTimeBeforeOrderByIdDesc(id, instant)
                .stream()
                .map(bet -> BetView.builder()
                        .homeTeamGoals(bet.getHomeTeamGoals())
                        .awayTeamGoals(bet.getAwayTeamGoals())
                        .tournamentName(bet.getMatch().getRound().getTournament().getName())
                        .build())
                .toList();
    }

    @Override
    @Transactional
    public List<NewBetView> createBets(List<NewBetView> bets, String username) {
        List<Bet> betsToSave = new ArrayList<>();

        for (NewBetView newBetView : bets) {
            Match match = this.matchService.getMatchById(newBetView.getMatchId());
            if (Instant.now().isAfter(match.getStartTime())) {
                continue;
            }
            if (checkExistingBetOnMatch(match, username)) {
                continue;
            }
            Bet bet = Bet.builder()
                    .createdOn(Instant.now())
                    .match(match)
                    .user(this.userService.getUserByUsername(username))
                    .build();
            bet.setHomeTeamGoals(newBetView.getHomeTeamGoals());
            bet.setAwayTeamGoals(newBetView.getAwayTeamGoals());
            betsToSave.add(bet);
        }
        List<Bet> savedBets = this.repository.saveAll(betsToSave);

        return savedBets.stream().map(b -> NewBetView.builder()
                        .homeTeamGoals(b.getHomeTeamGoals())
                        .awayTeamGoals(b.getAwayTeamGoals())
                        .matchId(b.getMatch().getId())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public boolean checkExistingBetOnMatch(Match match, String username) {
        return repository.existsBetByMatchAndUserUsername(match, username);
    }

    @Override
    public List<Bet> findBetsByUserUsernameAndMatchRound(String username, Round round) {
        return repository.findBetsByUserUsernameAndMatchRoundOrderByIdDesc(username, round);
    }

    @Override
    public List<MatchResultView> getAllUserPlayedMatches(String username) {
        List<Bet> getUserBets = repository.findBetsByUser_UsernameAndMatch_StartTimeAfterOrderByIdDesc(username, DateUtil.parseInstant(Instant.now()));
        List<MatchResultView> result = new ArrayList<>();

        getUserBets.forEach(bet -> {
            Match match = matchService.getMatchById(bet.getMatch().getId());
            MatchResultView matchResultView = MatchResultView.builder()
                    .id(match.getId())
                    .homeTeam(MatchTeamResultView.builder()
                            .id(match.getHomeTeam().getId())
                            .name(match.getHomeTeam().getName())
                            .imageUrl(match.getHomeTeam().getImageUrl())
                            .goals(bet.getHomeTeamGoals()).build())
                    .awayTeam(MatchTeamResultView.builder()
                            .id(match.getAwayTeam().getId())
                            .name(match.getAwayTeam().getName())
                            .imageUrl(match.getAwayTeam().getImageUrl())
                            .goals(bet.getAwayTeamGoals()).build())
                    .startTime(match.getStartTime())
                    .tournamentId(match.getRound().getTournament().getId())
                    .tournamentName(match.getRound().getTournament().getName())
                    .round(match.getRound())
                    .status(MatchStatus.PLAYABLE)
                    .build();
            result.add(matchResultView);
        });
        return result;
    }

    @Override
    public List<Bet> getBetsByRoundIdLower(Long roundId) {
        return repository.getBetsByRoundIdLower(roundId);
    }

    @Override
    public List<BetOutView> getAllBetsByUsername(String username) {
        List<Bet> bets = repository.findBetsByUserUsernameAndHomeTeamGoalsNotNullAndAwayTeamGoalsNotNullOrderByIdDesc(username);
        return getBets(bets);
    }

    private List<BetOutView> getBets(List<Bet> bets) {
        List<BetOutView> betOutViews = new ArrayList<>();

        for (Bet bet : bets) {
            BetOutView betOutView = new BetOutView();
            betOutView.setId(bet.getId());
            betOutView.setHomeTeam(MatchTeamResultView.builder()
                    .id(bet.getMatch().getHomeTeam().getId())
                    .name(bet.getMatch().getHomeTeam().getName())
                    .imageUrl(bet.getMatch().getHomeTeam().getImageUrl())
                    .goals(bet.getHomeTeamGoals()).build());
            betOutView.setAwayTeam(MatchTeamResultView.builder()
                    .id(bet.getMatch().getAwayTeam().getId())
                    .name(bet.getMatch().getAwayTeam().getName())
                    .imageUrl(bet.getMatch().getAwayTeam().getImageUrl())
                    .goals(bet.getAwayTeamGoals()).build());
            betOutView.setStartTime(bet.getMatch().getStartTime());
            betOutView.setStatus(matchService.calculateMatchStatus(bet, bet.getMatch()));
            betOutView.setTournamentId(bet.getMatch().getRound().getTournament().getId());
            betOutView.setTournamentName(bet.getMatch().getRound().getTournament().getName());
            betOutView.setRound(bet.getMatch().getRound().getId());
            betOutViews.add(betOutView);
        }
        return betOutViews;
    }

    @Override
    public List<BetOutView> getAllEndedBetsByUsername(String username) {
        List<Bet> bets = repository.findBetsByUserUsernameAndMatch_HomeTeamGoalsNotNullAndAwayTeamGoalsNotNullOrderByIdDesc(username);
        return getBets(bets);
    }
}