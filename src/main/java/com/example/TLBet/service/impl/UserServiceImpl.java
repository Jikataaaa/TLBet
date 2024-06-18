package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.Tournament;
import com.example.TLBet.models.entities.TournamentBetWinner;
import com.example.TLBet.models.entities.User;
import com.example.TLBet.models.enums.ExceptionEnum;
import com.example.TLBet.models.exeptions.UserErrorException;
import com.example.TLBet.models.view.*;
import com.example.TLBet.repository.UserRepository;
import com.example.TLBet.service.BetService;
import com.example.TLBet.service.TeamService;
import com.example.TLBet.service.TournamentService;
import com.example.TLBet.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.TLBet.models.enums.ExceptionEnum.*;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private BetService betService;

    @Autowired
    private TournamentService tournamentService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<UserOutView> getMany() {
        return repository.findAllByOrderByIdDesc()
                .stream()
                .map(x -> mapper.map(x, UserOutView.class))
                .collect(Collectors.toList());
    }

    @Override
    public UserOutView updateOne(Long id, UserInView inView) throws UserErrorException {
        User user = repository.findById(id).orElse(null);

        if (user != null) {
            if (inView.getPassword() != null && !inView.getPassword().isEmpty() && !inView.getPassword().isBlank()) {
                user.setPassword(passwordEncoder.encode(inView.getPassword()));
            }
            validateAndSetUserDetails(inView, user);
            repository.save(user);

            return mapper.map(user, UserOutView.class);
        }
        throw new UserErrorException(EXCEPTION_USER_NOT_FOUND,
                new Throwable("User not found"));
    }

    private static void validateAndSetUserDetails(UserInView inView, User user) throws UserErrorException {
        if (inView.getFirstName() != null && !inView.getFirstName().isEmpty() && !inView.getFirstName().isBlank()) {
            user.setFirstName(inView.getFirstName());
        } else {
            throw new UserErrorException(EXCEPTION_USER_FIRST_NAME_IS_REQUIRED,
                    new Throwable("First name is required"));
        }

        if (inView.getLastName() != null && !inView.getLastName().isEmpty() && !inView.getLastName().isBlank()) {
            user.setLastName(inView.getLastName());
        } else {
            throw new UserErrorException(EXCEPTION_USER_LAST_NAME_IS_REQUIRED,
                    new Throwable("Last name is required"));
        }
    }

    @Override
    public UserOutView deleteOne(Long id) throws UserErrorException {
        User user = repository.findById(id).orElse(null);

        if (user != null) {
            repository.delete(user);
            return mapper.map(user, UserOutView.class);
        }
        throw new UserErrorException(EXCEPTION_USER_NOT_FOUND,
                new Throwable("User not found"));
    }

    @Override
    public List<User> findAllFullNames() {
        return repository.findAllFullNames();
    }

    @Override
    public UserProfileOutView getUserProfile(String username) throws UserErrorException {
        User userByUsername = repository.findUserByUsername(username).orElse(null);
        UserProfileOutView userProfileOutView;

        if (userByUsername != null) {
            userProfileOutView = mapper.map(userByUsername, UserProfileOutView.class);
        } else {
            throw new UserErrorException(ExceptionEnum.EXCEPTION_USER_NOT_FOUND,
                    new Throwable("User with username " + username + " not found"));
        }
        List<MatchResultView> bets = betService.getAllBetsByUsername(username);

        userProfileOutView.setBets(bets);

        TournamentBetWinner myWinnerChoice = repository.findUserChoiceForWinner(userByUsername.getId()).orElse(null);

        if (myWinnerChoice != null) {
            TeamView myChoice = teamService.getTeamById(myWinnerChoice.getTeamId()).map(t -> this.mapper.map(t, TeamView.class)).orElse(null);
            userProfileOutView.setTournamentWinner(myChoice);
        }

        Tournament activeTournament = tournamentService.getActiveTournament();
        userProfileOutView.setIsWinnerChoicePossibilityExpired(Instant.now().isAfter(activeTournament.getWinnerPickExpirationDate()));
        return userProfileOutView;
    }

    private void setMyChoiceForTournamentWinner(User userByUsername, UserProfileOutView userProfileOutView) {
        Tournament activeTournament = tournamentService.getActiveTournament();

        if (Instant.now().isAfter(activeTournament.getWinnerPickExpirationDate()) && activeTournament.getWinnerTeamId() != null) {

            TournamentBetWinner myWinnerChoice = repository.findUserChoiceForWinner(userByUsername.getId()).orElse(null);

            if (myWinnerChoice != null) {
                TeamView myChoice = teamService.getTeamById(myWinnerChoice.getTeamId()).map(t -> this.mapper.map(t, TeamView.class)).orElse(null);
                userProfileOutView.setTournamentWinner(myChoice);
            }
        }
    }

    @Override
    public UserProfileOutView getUserDetails(String username) throws UserErrorException {
        User user = repository.findUserByUsername(username).orElse(null);
        UserProfileOutView userProfileOutView;

        if (user != null) {
            userProfileOutView = mapper.map(user, UserProfileOutView.class);
        } else {
            throw new UserErrorException(EXCEPTION_USER_NOT_FOUND,
                    new Throwable("User not found"));
        }
        List<MatchResultView> bets = betService.getAllEndedBetsByUsername(user.getUsername());

        userProfileOutView.setBets(bets);

        setMyChoiceForTournamentWinner(user, userProfileOutView);
        return userProfileOutView;
    }
}
