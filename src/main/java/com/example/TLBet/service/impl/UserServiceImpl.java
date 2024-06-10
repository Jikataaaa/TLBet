package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.User;
import com.example.TLBet.models.enums.ExceptionEnum;
import com.example.TLBet.models.exeptions.UserErrorException;
import com.example.TLBet.models.view.BetView;
import com.example.TLBet.models.view.UserInView;
import com.example.TLBet.models.view.UserOutView;
import com.example.TLBet.models.view.UserProfileOutView;
import com.example.TLBet.repository.UserRepository;
import com.example.TLBet.service.BetService;
import com.example.TLBet.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
    public UserProfileOutView getUserProfile(String username) throws UserErrorException {
        User userByUsername = repository.findUserByUsername(username).orElse(null);
        UserProfileOutView userProfileOutView;

        if (userByUsername != null) {
            userProfileOutView = mapper.map(userByUsername, UserProfileOutView.class);
        } else {
            throw new UserErrorException(ExceptionEnum.EXCEPTION_USER_NOT_FOUND,
                    new Throwable("User with username " + username + " not found"));
        }
        List<BetView> bets = betService.getAllEndedBetsByUsername(username);

        userProfileOutView.setBets(bets);
        return userProfileOutView;
    }
}
