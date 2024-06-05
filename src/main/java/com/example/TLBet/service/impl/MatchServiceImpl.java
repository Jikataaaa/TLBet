package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.Match;
import com.example.TLBet.models.entities.Round;
import com.example.TLBet.models.entities.Team;
import com.example.TLBet.models.entities.Tournament;
import com.example.TLBet.models.view.*;
import com.example.TLBet.repository.MatchRepository;
import com.example.TLBet.repository.RoundRepository;
import com.example.TLBet.service.*;
import com.example.TLBet.utils.DateUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.Instant;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MatchServiceImpl implements MatchService {
    private final MatchRepository matchRepository;
    private final TeamService teamService;
    private final TournamentService tournamentService;
    private final AuthenticationService authenticationService;
    private final RoundService roundService;


    @Autowired
    private ModelMapper mapper;

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
    public List<MatchResultView> getLastRoundMatches() {

        Round round = roundService.getLastRound();

        List<Match> lastRoundMatches = matchRepository.getLastRoundMatches(round.getId());

        List<MatchResultView> result = new ArrayList<>();

        lastRoundMatches.forEach(match -> {
            MatchResultView matchResultView = MatchResultView.builder()
                    .id(match.getId())
                    .homeTeam(MatchTeamResultView.builder()
                            .id(match.getHomeTeam().getId())
                            .name(match.getHomeTeam().getName())
                            .imageUrl(match.getHomeTeam().getImageUrl())
                            .goals(match.getHomeTeamGoals()).build())
                    .awayTeam(MatchTeamResultView.builder()
                            .id(match.getAwayTeam().getId())
                            .name(match.getAwayTeam().getName())
                            .imageUrl(match.getAwayTeam().getImageUrl())
                            .goals(match.getAwayTeamGoals()).build())
                    .startTime(match.getStartTime())
                    .tournamentId(match.getTournament().getId())
                    .tournamentName(match.getTournament().getName())
                    .round(match.getRound()).build();

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
