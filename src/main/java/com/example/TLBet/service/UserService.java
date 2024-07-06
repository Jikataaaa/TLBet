package com.example.TLBet.service;

import com.example.TLBet.models.entities.User;
import com.example.TLBet.models.exeptions.UserErrorException;
import com.example.TLBet.models.view.*;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService {
    List<UserOutView> getMany();

    UserOutView updateOne(Long id, UserInView inView) throws UserErrorException;

    UserOutView deleteOne(Long id) throws UserErrorException;

    List<User> findAllFullNames();

    UserProfileOutView getUserProfile(String username) throws UserErrorException;

    UserProfileOutView getUserDetails(String username, UserDetails user) throws UserErrorException;

    List<UserExactResultOutView> getUsersWithMostExactResults();

    List<UserCorrectMatchWinnerOutView> getUsersWithMostCorrectMatchWinner();

    List<UserTeamPickPercentageOutView> getTeamPickPercentage();

    List<MostViewedUserView> getMostViewedUsers();
}
