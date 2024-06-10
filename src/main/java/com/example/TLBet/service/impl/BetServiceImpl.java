package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.Bet;
import com.example.TLBet.models.entities.Match;
import com.example.TLBet.models.entities.Round;
import com.example.TLBet.models.enums.MatchStatus;
import com.example.TLBet.models.exeptions.NewBetException;
import com.example.TLBet.models.service.BetRankingServiceModel;
import com.example.TLBet.models.view.BetView;
import com.example.TLBet.models.view.MatchResultView;
import com.example.TLBet.models.view.MatchTeamResultView;
import com.example.TLBet.models.view.NewBetView;
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
    public List<BetRankingServiceModel> getAllBetsForRanking() {
        return repository.findAllByOrderByIdDesc().stream().map(bet ->
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
    public List<BetRankingServiceModel> getAllBetsForRankingByRound(Round round) {
        return repository.findAllByMatchRoundOrderByIdDesc(round).stream().map(bet ->
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

    @Override
    @Transactional
    public List<NewBetView> createBets(List<NewBetView> bets, String username) {
        List<Bet> betsToSave = new ArrayList<>();

        bets
                .forEach((b) -> {
                    Match match = this.matchService.getMatchById(b.getMatchId());
                    if (Instant.now().isAfter(match.getStartTime())) {
                        throw new NewBetException("Не можете да направите залог на мач, който е започнал!");
                    }
                    if (checkExistingBetOnMatch(match, username)) {
                        throw new NewBetException("Имате вече направен залог на мач, на който искате да заложите отново!");
                    }
                    Bet bet = Bet.builder()
                            .match(match)
                            .user(this.userService.getUserByUsername(username))
                            .build();
                    bet.setHomeTeamGoals(b.getHomeTeamGoals());
                    bet.setAwayTeamGoals(b.getAwayTeamGoals());
                    betsToSave.add(bet);
                });
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
    public List<BetView> getAllEndedBetsByUsername(String username) {
        return repository.findBetsByUserUsernameAndHomeTeamGoalsNotNullAndAwayTeamGoalsNotNullOrderByIdDesc(username)
                .stream()
                .map(bet -> BetView
                        .builder()
                        .homeTeamGoals(bet.getHomeTeamGoals())
                        .homeTeamUrl(bet.getMatch().getHomeTeam().getImageUrl())
                        .awayTeamGoals(bet.getAwayTeamGoals())
                        .awayTeamUrl(bet.getMatch().getAwayTeam().getImageUrl())
                        .tournamentName(bet.getMatch().getRound().getTournament().getName())
                        .build())
                .toList();
    }
}
