package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.Match;
import com.example.TLBet.models.entities.Team;
import com.example.TLBet.models.entities.Tournament;
import com.example.TLBet.models.view.*;
import com.example.TLBet.repository.BetRepository;
import com.example.TLBet.repository.MatchRepository;
import com.example.TLBet.service.MatchService;
import com.example.TLBet.service.TeamService;
import com.example.TLBet.service.TournamentService;
import com.example.TLBet.utils.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import java.time.*;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MatchServiceImpl implements MatchService {
    private final MatchRepository matchRepository;
    private final TeamService teamService;
    private final TournamentService tournamentService;
    private final BetRepository betRepository;

   // private final ModelMapper mapper;

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
    public List<MatchResultView> getAllMatches(Long id) {
        List<Long> matchIds = betRepository.getAllMatchIdsBetByUserId(id);

        //TODO да се направи по-красиво
        if(matchIds.size() == 0){
            matchIds.add(-1L);
        }

        return matchRepository.findAllByStartTimeAfterAndIdNotIn(DateUtil.parseInstant(Instant.now()), matchIds).stream().map(match -> MatchResultView.builder()
                        .id(match.getId())
                        .homeTeamId(match.getHomeTeam().getId())
                        .homeTeam(match.getHomeTeam().getName())
                        .homeTeamGoals(match.getHomeTeamGoals())
                        .homeTeamImageUrl(match.getHomeTeam().getImageUrl())
                        .awayTeamId(match.getAwayTeam().getId())
                        .awayTeam(match.getAwayTeam().getName())
                        .awayTeamImageUrl(match.getAwayTeam().getImageUrl())
                        .awayTeamGoals(match.getAwayTeamGoals())
                        .tournamentId(match.getTournament().getId())
                        .tournamentName(match.getTournament().getName())
                        .startTime(match.getStartTime())
                        .round(match.getRound())
                        .build()
       ).toList();
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
                .id(match.getHomeTeamId())
                .name(match.getHomeTeam())
                .build();
        Team homeEditedTeam = teamService.editTeam(homeTeam);

        TeamView awayTeam = TeamView
                .builder()
                .id(match.getAwayTeamId())
                .name(match.getAwayTeam())
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
                .homeTeamId(save.getHomeTeam().getId())
                .homeTeam(save.getHomeTeam().getName())
                .homeTeamGoals(save.getHomeTeamGoals())
                .awayTeamId(save.getAwayTeam().getId())
                .awayTeam(save.getAwayTeam().getName())
                .awayTeamGoals(save.getAwayTeamGoals())
                .tournamentId(save.getTournament().getId())
                .tournamentName(save.getTournament().getName())
                .startTime(save.getStartTime())
                .round(save.getRound())
                .build();
    }

    @Override
    public int getLastRound() {

        Optional<Integer> lastRound = matchRepository.getLastRound();

        return lastRound.orElse(0);

    }
}
