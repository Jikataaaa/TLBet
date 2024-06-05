package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.*;
import com.example.TLBet.models.enums.MatchStatus;
import com.example.TLBet.models.view.*;
import com.example.TLBet.repository.MatchRepository;
import com.example.TLBet.service.*;
import com.example.TLBet.utils.DateUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.Instant;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MatchServiceImpl implements MatchService {
    private final MatchRepository matchRepository;
    private final TeamService teamService;
    private final TournamentService tournamentService;

    @Override
    public MatchView createMatch(@RequestBody MatchView matchView) {
        Team homeTeam = teamService.getTeamById(matchView.getHomeTeam());
        Team awayTeam = teamService.getTeamById(matchView.getAwayTeam());
        Tournament tournament = tournamentService.getTournamentById(matchView.getTournament());
        Match match = Match.builder()
                .homeTeam(homeTeam)
                .awayTeam(awayTeam)
                .tournament(tournament).build();
        Match save = matchRepository.save(match);
        return MatchView.builder()
                .homeTeam(save.getHomeTeam().getId())
                .awayTeam(save.getAwayTeam().getId())
                .tournament(save.getTournament().getId()).build();
    }

    @Override
    public List<MatchResultView> getLastRoundMatches(String username, Round round, List<Bet> createdBets) {

        List<Match> lastRoundMatches = matchRepository.getLastRoundMatches(round.getId());
        List<MatchResultView> result = new ArrayList<>();
        lastRoundMatches
                .forEach(match -> {
                    Bet optionalBet = createdBets.stream().filter(x -> x.getMatch().getId() == match.getId()).findFirst().orElse(null);
                    MatchStatus status = MatchStatus.PLAYABLE;
                    if(optionalBet != null){
                        if(match.getAwayTeamGoals() == null || match.getHomeTeamGoals() == null){
                            status = MatchStatus.AWAITING_RESULT;
                        }else if(match.getAwayTeamGoals().equals(optionalBet.getAwayTeamGoals()) && match.getHomeTeamGoals().equals(optionalBet.getHomeTeamGoals())){
                            status = MatchStatus.EXACT_WIN;
                        } else if((match.getHomeTeamGoals() > match.getAwayTeamGoals()  && optionalBet.getHomeTeamGoals() > optionalBet.getAwayTeamGoals() )
                                || (match.getHomeTeamGoals() < match.getAwayTeamGoals()  && optionalBet.getHomeTeamGoals() < optionalBet.getAwayTeamGoals())
                                ||(match.getHomeTeamGoals().equals(match.getAwayTeamGoals()) && Objects.equals(optionalBet.getHomeTeamGoals(), optionalBet.getAwayTeamGoals()))){
                            status = MatchStatus.WON;
                        }else {
                            status = MatchStatus.LOST;
                        }
                    }
                    else if(Instant.now().isAfter(match.getStartTime())){
                        status = MatchStatus.EXPIRED;
                    }

                    Integer awayTeamGoals = match.getAwayTeamGoals();
                    Integer homeTeamGoals = match.getHomeTeamGoals();
                    if(status == MatchStatus.PLAYABLE){
                        awayTeamGoals = 0;
                        homeTeamGoals = 0;

                    }


                    MatchResultView matchResultView = MatchResultView.builder()
                            .id(match.getId())
                            .homeTeam(MatchTeamResultView.builder()
                                    .id(match.getHomeTeam().getId())
                                    .name(match.getHomeTeam().getName())
                                    .imageUrl(match.getHomeTeam().getImageUrl())
                                    .goals(homeTeamGoals).build())
                            .awayTeam(MatchTeamResultView.builder()
                                    .id(match.getAwayTeam().getId())
                                    .name(match.getAwayTeam().getName())
                                    .imageUrl(match.getAwayTeam().getImageUrl())
                                    .goals(awayTeamGoals).build())
                            .startTime(match.getStartTime())
                            .tournamentId(match.getTournament().getId())
                            .tournamentName(match.getTournament().getName())
                            .round(match.getRound())
                            .status(status)
                            .build();

                    result.add(matchResultView);
                });
        return result;
    }

    @Override
    public Match getMatchById(long id) {
        return matchRepository.findById(id).orElseThrow();
    }

    @Override
    public MatchResultView editMatch(MatchResultView match, LocalTime time) {
        // edit teamNames
        TeamView homeTeam = TeamView
                .builder()
                .id(match.getHomeTeam().getId())
                .name(match.getHomeTeam().getName())
                .build();
        Team homeEditedTeam = teamService.editTeam(homeTeam);

        TeamView awayTeam = TeamView
                .builder()
                .id(match.getAwayTeam().getId())
                .name(match.getAwayTeam().getName())
                .build();
        Team awayEditedTeam = teamService.editTeam(awayTeam);

        // edit tournament
        TournamentView tournament = TournamentView
                .builder()
                .id(match.getTournamentId())
                .name(match.getTournamentName())
                .build();
        Tournament editTournament = tournamentService.editTournament(tournament);

        Instant instant = DateUtil.parseInstant(match.getStartTime());

        instant = DateUtil.changeTimeOfInstant(instant, time);

        Match builtMatch = Match.builder()
                .homeTeam(homeEditedTeam)
                .awayTeam(awayEditedTeam)
                .startTime(instant)
                .tournament(editTournament)
                .build();

        builtMatch.setId(match.getId());

        Match save = matchRepository.save(builtMatch);
        return MatchResultView
                .builder()
                .id(save.getId())
                .homeTeam(MatchTeamResultView.builder()
                        .id(save.getHomeTeam().getId())
                        .name(save.getHomeTeam().getName())
                        .imageUrl(save.getHomeTeam().getImageUrl())
                        .goals(save.getHomeTeamGoals())
                        .build())
                .awayTeam(MatchTeamResultView.builder()
                        .id(save.getAwayTeam().getId())
                        .name(save.getAwayTeam().getName())
                        .imageUrl(save.getAwayTeam().getImageUrl())
                        .goals(save.getAwayTeamGoals())
                        .build())
                .tournamentId(save.getTournament().getId())
                .tournamentName(save.getTournament().getName())
                .startTime(save.getStartTime())
                .round(save.getRound())
                .build();
    }
}
