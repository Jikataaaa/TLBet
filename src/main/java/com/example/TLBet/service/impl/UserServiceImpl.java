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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
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

        if (Instant.now().isAfter(activeTournament.getWinnerPickExpirationDate())) {

            TournamentBetWinner myWinnerChoice = repository.findUserChoiceForWinner(userByUsername.getId()).orElse(null);

            if (myWinnerChoice != null) {
                TeamView myChoice = teamService.getTeamById(myWinnerChoice.getTeamId()).map(t -> this.mapper.map(t, TeamView.class)).orElse(null);
                userProfileOutView.setTournamentWinner(myChoice);
            }
        }
        userProfileOutView.setIsWinnerChoicePossibilityExpired(Instant.now().isAfter(activeTournament.getWinnerPickExpirationDate()));
    }

    @Override
    public UserProfileOutView getUserDetails(String username, UserDetails currentUser) throws UserErrorException {
        User loggedInUser = (User) currentUser;
        User user = repository.findUserByUsername(username).orElse(null);
        UserProfileOutView userProfileOutView;

        if (user != null) {
            if (!loggedInUser.getUsername().equals(user.getUsername())) {
                loggedInUser.setOtherProfileViews(loggedInUser.getOtherProfileViews() + 1);
                user.setProfileViewed(user.getProfileViewed() + 1);
                repository.saveAll(List.of(loggedInUser, user));
            }
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

    @Override
    public List<UserExactResultOutView> getUsersWithMostExactResults() {
        List<UserExactResultOutView> userExactResultOutViews = new ArrayList<>();
        List<Object> users = repository.findAllUsersWithMostExactResults().orElse(null);
        if (users != null && !users.isEmpty()) {

            for (Object user : users) {
                UserExactResultOutView userExactResultOutView = new UserExactResultOutView();
                Object[] userArray = (Object[]) user;
                userExactResultOutView.setId((Long) userArray[0]);
                userExactResultOutView.setUsername((String) userArray[1]);
                userExactResultOutView.setFirstName((String) userArray[2]);
                userExactResultOutView.setLastName((String) userArray[3]);
                userExactResultOutView.setCountExactResults((Long) userArray[4]);
                userExactResultOutViews.add(userExactResultOutView);
            }
        }
        return userExactResultOutViews;
    }

    @Override
    public List<UserCorrectMatchWinnerOutView> getUsersWithMostCorrectMatchWinner() {
        List<UserCorrectMatchWinnerOutView> usersCorrectMatchWinnerOutView = new ArrayList<>();
        List<Object> users = repository.findAllUsersWithMostCorrectMatchWinner().orElse(null);
        if (users != null && !users.isEmpty()) {

            for (Object user : users) {
                UserCorrectMatchWinnerOutView userCorrectMatchWinnerOutView = new UserCorrectMatchWinnerOutView();
                Object[] userArray = (Object[]) user;
                userCorrectMatchWinnerOutView.setId((Long) userArray[0]);
                userCorrectMatchWinnerOutView.setUsername((String) userArray[1]);
                userCorrectMatchWinnerOutView.setFirstName((String) userArray[2]);
                userCorrectMatchWinnerOutView.setLastName((String) userArray[3]);
                userCorrectMatchWinnerOutView.setCountCorrectMatchWinners((Long) userArray[4]);
                usersCorrectMatchWinnerOutView.add(userCorrectMatchWinnerOutView);
            }
        }
        return usersCorrectMatchWinnerOutView;
    }

    @Override
    public List<UserTeamPickPercentageOutView> getTeamPickPercentage() {
        List<UserTeamPickPercentageOutView> userTeamPickPercentageOutViews = new ArrayList<>();
        List<Object> users = repository.findAllUsersTeamPickPercentage().orElse(null);

        if (users != null && !users.isEmpty()) {
            for (Object user : users) {
                UserTeamPickPercentageOutView userTeamPickPercentageOutView = new UserTeamPickPercentageOutView();
                Object[] userArray = (Object[]) user;
                userTeamPickPercentageOutView.setTeamName((String) userArray[0]);
                userTeamPickPercentageOutView.setTeamPickPercentage((BigDecimal) userArray[1]);
                userTeamPickPercentageOutView.setTeamPickCount((Long) userArray[2]);
                userTeamPickPercentageOutViews.add(userTeamPickPercentageOutView);
            }
        }
        return userTeamPickPercentageOutViews;
    }

    @Override
    public List<MostViewedUserView> getMostViewedUsers() {
        return repository.findTop10ByProfileViewed();
    }
}
