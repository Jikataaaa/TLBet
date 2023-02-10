package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.Match;
import com.example.TLBet.models.entities.Team;
import com.example.TLBet.models.entities.Tournament;
import com.example.TLBet.models.view.MatchResultView;
import com.example.TLBet.models.view.MatchView;
import com.example.TLBet.repository.MatchRepository;
import com.example.TLBet.service.MatchService;
import com.example.TLBet.service.TeamService;
import com.example.TLBet.service.TournamentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MatchServiceImpl implements MatchService {
    private final MatchRepository repository;
    private final TeamService teamService;
    private final TournamentService tournamentService;

    private final ModelMapper mapper;

    @Override
    public MatchView createMatch(@RequestBody MatchView matchView) {
        Team homeTeam = teamService.getTeamById(matchView.getHomeTeam());
        Team awayTeam = teamService.getTeamById(matchView.getAwayTeam());
        Tournament tournament = tournamentService.getTournamentById(matchView.getTournament());
        Match match = Match.builder()
                .homeTeam(homeTeam)
                .awayTeam(awayTeam)
                .tournament(tournament).build();
        Match save = repository.save(match);
        return MatchView.builder().homeTeam(save.getHomeTeam().getId())
                .awayTeam(save.getAwayTeam().getId())
                .tournament(save.getTournament().getId()).build();
    }

    @Override
    public List<MatchResultView> getAllMatches() {
       return repository.findAll().stream().map(match -> MatchResultView.builder()
                .homeTeam(match.getHomeTeam().getName())
                .homeTeamGoals(match.getHomeTeamGoals())
                .awayTeam(match.getAwayTeam().getName())
                .awayTeamGoals(match.getAwayTeamGoals())
                .tournamentName(match.getTournament().getName())
                .build()).toList();
    }

    @Override
    public MatchResultView getMatchById(long id) {
        return repository.findById(id).map(match -> MatchResultView.builder()
                .homeTeam(match.getHomeTeam().getName())
                .homeTeamGoals(match.getHomeTeamGoals())
                .awayTeam(match.getAwayTeam().getName())
                .awayTeamGoals(match.getAwayTeamGoals())
                .tournamentName(match.getTournament().getName())
                .build()).get();
    }

    @Override
    public MatchResultView editMatch(MatchResultView match) {
        return null;
    }
}
