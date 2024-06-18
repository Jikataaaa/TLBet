package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.Team;
import com.example.TLBet.models.entities.Tournament;
import com.example.TLBet.models.entities.TournamentBetWinner;
import com.example.TLBet.models.exeptions.UserErrorException;
import com.example.TLBet.models.view.*;
import com.example.TLBet.repository.TournamentBetWinnerRepository;
import com.example.TLBet.service.TeamService;
import com.example.TLBet.service.TournamentBetWinnerService;
import com.example.TLBet.service.TournamentService;
import com.example.TLBet.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

import static com.example.TLBet.models.enums.ExceptionEnum.*;

@Slf4j
@Service
public class TournamentBetWinnerServiceImpl implements TournamentBetWinnerService {

    @Autowired
    private TournamentBetWinnerRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private TournamentService tournamentService;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public TournamentBetWinnerOutView createTournamentBetWinner(TournamentBetWinnerInView inView, String username) throws UserErrorException {

        UserProfileOutView user = userService.getUserProfile(username);

        TournamentBetWinner check = repository.findByUserIdAndTournament_IsActiveIsTrue(user.getId()).orElse(null);

        if (check != null) {
            throw new UserErrorException(EXCEPTION_TOURNAMENT_BET_WINNER_ALREADY_EXISTS,
                    new Throwable("Вече сте направили прогноза за победител на този турнир"));
        }

        TournamentBetWinner tournamentBetWinner = new TournamentBetWinner();
        tournamentBetWinner.setUserId(user.getId());

        if (inView.getTeamId() == null) {
            throw new UserErrorException(EXCEPTION_TEAM_REQUIRED,
                    new Throwable("Отборът е задължителен"));
        }

        tournamentBetWinner.setTeamId(inView.getTeamId());

        if (inView.getTournamentId() == null) {
            throw new UserErrorException(EXCEPTION_TOURNAMENT_REQUIRED,
                    new Throwable("Турнира е задължителен"));
        }
        tournamentBetWinner.setTournamentId(inView.getTournamentId());

        tournamentBetWinner = repository.save(tournamentBetWinner);

        return getTournamentBetWinnerOutView(tournamentBetWinner);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public TournamentBetWinnerOutView getTournamentWinner(String username) throws UserErrorException {

        UserProfileOutView user = userService.getUserProfile(username);

        TournamentBetWinner tournamentBetWinner = repository.findByUserIdAndTournament_IsActiveIsTrue(user.getId()).orElse(null);

        return getTournamentBetWinnerOutView(tournamentBetWinner);
    }


    private TournamentBetWinnerOutView getTournamentBetWinnerOutView(TournamentBetWinner tournamentBetWinner) throws UserErrorException {
        TournamentBetWinnerOutView tournamentBetWinnerOutView = new TournamentBetWinnerOutView();

        if (tournamentBetWinner == null) {
            Tournament tournament = tournamentService.getActiveTournament();
            tournamentBetWinnerOutView.setTournament(modelMapper.map(tournament, TournamentView.class));

            if (tournament.getWinnerPickExpirationDate() != null) {
                tournamentBetWinnerOutView.setIsExpired(Instant.now().isAfter(tournament.getWinnerPickExpirationDate()));
            }
            return tournamentBetWinnerOutView;
        }
        tournamentBetWinnerOutView.setId(tournamentBetWinner.getId());

        Team team = teamService.getTeamById(tournamentBetWinner.getTeamId()).orElse(null);

        if (team == null) {
            throw new UserErrorException(EXCEPTION_TEAM_NOT_FOUND,
                    new Throwable("Отборът не беше намерен"));
        }
        TeamView teamView = modelMapper.map(team, TeamView.class);
        tournamentBetWinnerOutView.setTeam(teamView);

        Tournament tournament = tournamentService.getTournamentById(tournamentBetWinner.getTournamentId());

        if (tournament == null || !tournament.isActive()) {
            throw new UserErrorException(EXCEPTION_TOURNAMENT_NOT_FOUND,
                    new Throwable("Турнира не беше намерен"));
        }
        TournamentView tournamentView = modelMapper.map(tournament, TournamentView.class);
        tournamentBetWinnerOutView.setTournament(tournamentView);

        return tournamentBetWinnerOutView;
    }

    @Override
    public List<TeamView> getAllTeams() {

        return teamService.getAllTeams()
                .stream()
                .map(t -> modelMapper.map(t, TeamView.class))
                .toList();
    }

    @Override
    public List<TournamentBetWinner> findAllByTeamIdAndTournament_IsActiveIsTrue(Long winnerTeamId) {
        return repository.findAllByTeamIdAndTournament_IsActiveIsTrue(winnerTeamId);
    }
}
