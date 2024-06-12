package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.Bet;
import com.example.TLBet.models.entities.Match;
import com.example.TLBet.models.entities.Round;
import com.example.TLBet.models.entities.Team;
import com.example.TLBet.models.enums.MatchStatus;
import com.example.TLBet.models.exeptions.UserErrorException;
import com.example.TLBet.models.view.*;
import com.example.TLBet.repository.MatchRepository;
import com.example.TLBet.repository.RoundRepository;
import com.example.TLBet.service.MatchService;
import com.example.TLBet.service.TeamService;
import com.example.TLBet.service.TournamentService;
import com.example.TLBet.utils.DateUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.Instant;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.example.TLBet.models.enums.ExceptionEnum.*;

@Service
@RequiredArgsConstructor
public class MatchServiceImpl implements MatchService {
    private final MatchRepository matchRepository;
    private final TeamService teamService;
    private final RoundRepository roundRepository;
    private final TournamentService tournamentService;
    private final ModelMapper modelMapper;

    @Override
    public MatchView createMatch(@RequestBody MatchView matchView) throws UserErrorException {
        Team homeTeam = teamService.getTeamById(matchView.getHomeTeam()).orElse(null);
        Team awayTeam = teamService.getTeamById(matchView.getAwayTeam()).orElse(null);

        if (homeTeam == null) {
            throw new UserErrorException(EXCEPTION_TEAM_NOT_FOUND,
                    new Throwable("Home team not found"));
        }

        if (awayTeam == null) {
            throw new UserErrorException(EXCEPTION_TEAM_NOT_FOUND,
                    new Throwable("Away team not found"));
        }

        Match match = Match.builder()
                .homeTeam(homeTeam)
                .awayTeam(awayTeam).build();
        Match save = matchRepository.save(match);
        return MatchView.builder()
                .homeTeam(save.getHomeTeam().getId())
                .awayTeam(save.getAwayTeam().getId())
                .tournament(save.getRound().getTournament().getId()).build();
    }

    @Override
    public List<MatchResultView> getLastRoundMatches(String username, Round round, List<Bet> createdBets) {
        List<Match> lastRoundMatches = matchRepository.getLastRoundMatches(round.getId());
        List<MatchResultView> result = new ArrayList<>();
        lastRoundMatches
                .forEach(match -> {
                    Bet optionalBet = createdBets.stream().filter(x -> x.getMatch().getId().equals(match.getId())).findFirst().orElse(null);
                    MatchStatus status;

                    Integer awayTeamGoals = null;
                    Integer homeTeamGoals = null;

                    //Потребителят е направил залог
                    status = calculateMatchStatus(optionalBet, match);

                    if (status == MatchStatus.PLAYABLE) {
                        //Слагаме голове по подразбиране ако потребителя не е заложил на мача
                        awayTeamGoals = 0;
                        homeTeamGoals = 0;
                    }

                    if (optionalBet != null) {
                        awayTeamGoals = optionalBet.getAwayTeamGoals();
                        homeTeamGoals = optionalBet.getHomeTeamGoals();
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
                            .tournamentId(match.getRound().getTournament().getId())
                            .tournamentName(match.getRound().getTournament().getName())
                            .round(RoundView.builder()
                                    .id(match.getRound().getId())
                                    .name(match.getRound().getName())
                                    .isActive(match.getRound().isActive())
                                    .build())
                            .status(status)
                            .matchGoals(MatchGoalsOutView.builder()
                                    .homeTeamGoals(match.getHomeTeamGoals())
                                    .awayTeamGoals(match.getAwayTeamGoals())
                                    .build())
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
    public List<MatchResultView> getAll(Long roundId) {

        List<Match> matches = matchRepository.getAllByRoundIdOrderByIdDesc(roundId);
        List<MatchResultView> result = new ArrayList<>();
        matches.forEach(match -> {
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
                    .tournamentId(match.getRound().getTournament().getId())
                    .tournamentName(match.getRound().getTournament().getName())
                    .round(RoundView.builder()
                            .id(match.getRound().getId())
                            .name(match.getRound().getName())
                            .isActive(match.getRound().isActive())
                            .build())
                    .build();
            result.add(matchResultView);
        });
        return result;
    }

    @Override
    public Long add(MatchInView inView) throws UserErrorException {
        Match match = new Match();
        validateAndSetTeams(inView, match);

        match = matchRepository.save(match);
        return match.getId();
    }

    private void validateAndSetTeams(MatchInView inView, Match match) throws UserErrorException {
        Team homeTeam = teamService.getTeamById(inView.getHomeTeamId()).orElse(null);
        Team awayTeam = teamService.getTeamById(inView.getAwayTeamId()).orElse(null);

        if (homeTeam == null) {
            throw new UserErrorException(EXCEPTION_TEAM_NOT_FOUND,
                    new Throwable("Home team not found"));
        }

        if (awayTeam == null) {
            throw new UserErrorException(EXCEPTION_TEAM_NOT_FOUND,
                    new Throwable("Away team not found"));
        }

        match.setHomeTeam(homeTeam);
        match.setAwayTeam(awayTeam);

        match.setHomeTeamGoals(inView.getHomeTeamGoals());
        match.setAwayTeamGoals(inView.getAwayTeamGoals());
        match.setStartTime(inView.getStartTime());

        if (inView.getRoundId() == null) {
            throw new UserErrorException(EXCEPTION_ROUND_NOT_FOUND,
                    new Throwable("Round not found"));
        }
        Round round = roundRepository.findById(inView.getRoundId()).orElseThrow();
        match.setRound(round);
    }

    @Override
    public MatchResultView deleteOne(Long id) throws UserErrorException {
        Match match = matchRepository.findById(id).orElse(null);

        if (match == null) {
            throw new UserErrorException(EXCEPTION_MATCH_NOT_FOUND,
                    new Throwable("Match not found"));
        }

        matchRepository.delete(match);
        return modelMapper.map(match, MatchResultView.class);
    }

    @Override
    public MatchResultView updateOne(MatchInView inView) throws UserErrorException {
        Match match = matchRepository.findById(inView.getId()).orElse(null);

        if (match == null) {
            throw new UserErrorException(EXCEPTION_MATCH_NOT_FOUND,
                    new Throwable("Match not found"));
        }

        validateAndSetTeams(inView, match);

        Match save = matchRepository.save(match);
        return modelMapper.map(save, MatchResultView.class);
    }

    @Override
    public MatchResultView editMatch(MatchResultView match, LocalTime time) {
        // edit teamNames
        TeamInsertUpdateOutView homeTeam = TeamInsertUpdateOutView
                .builder()
                .id(match.getHomeTeam().getId())
                .name(match.getHomeTeam().getName())
                .build();
        Team homeEditedTeam = teamService.editTeam(homeTeam);

        TeamInsertUpdateOutView awayTeam = TeamInsertUpdateOutView
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
        long editTournament = tournamentService.editTournament(tournament);

        Instant instant = DateUtil.parseInstant(match.getStartTime());

        instant = DateUtil.changeTimeOfInstant(instant, time);

        Match builtMatch = Match.builder()
                .homeTeam(homeEditedTeam)
                .awayTeam(awayEditedTeam)
                .startTime(instant)
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
                .tournamentId(save.getRound().getTournament().getId())
                .tournamentName(save.getRound().getTournament().getName())
                .startTime(save.getStartTime())
                .round(RoundView.builder()
                        .id(match.getRound().getId())
                        .name(match.getRound().getName())
                        .isActive(match.getRound().isActive())
                        .build())
                .build();
    }

    @Override
    public MatchStatus calculateMatchStatus(Bet optionalBet, Match match) {
        MatchStatus status = MatchStatus.PLAYABLE;
        if (optionalBet != null) {
            //Попълваме голововете от залога

            if (match.getAwayTeamGoals() == null || match.getHomeTeamGoals() == null) {
                //Резултатът от мача все още не е попълнен в системата(мачът не е завършил)
                status = MatchStatus.AWAITING_RESULT;
            } else if (match.getAwayTeamGoals().equals(optionalBet.getAwayTeamGoals()) && match.getHomeTeamGoals().equals(optionalBet.getHomeTeamGoals())) {
                //Точен резултат
                status = MatchStatus.EXACT_WIN;
            } else if ((match.getHomeTeamGoals() > match.getAwayTeamGoals() && optionalBet.getHomeTeamGoals() > optionalBet.getAwayTeamGoals())
                    || (match.getHomeTeamGoals() < match.getAwayTeamGoals() && optionalBet.getHomeTeamGoals() < optionalBet.getAwayTeamGoals())
                    || (match.getHomeTeamGoals().equals(match.getAwayTeamGoals()) && Objects.equals(optionalBet.getHomeTeamGoals(), optionalBet.getAwayTeamGoals()))) {
                //Потребителят е познал знака 1/X/2
                status = MatchStatus.WON;
            } else {
                //Грешна прогноза
                status = MatchStatus.LOST;
            }
        } else if (Instant.now().isAfter(match.getStartTime())) {
            //Изтекло време за игра
            status = MatchStatus.EXPIRED;
        }
        return status;
    }
}
