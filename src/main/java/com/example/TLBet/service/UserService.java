package com.example.TLBet.service;

import com.example.TLBet.models.exeptions.UserErrorException;
import com.example.TLBet.models.view.UserInView;
import com.example.TLBet.models.view.UserOutView;
import com.example.TLBet.models.view.UserProfileOutView;

import java.util.List;

public interface UserService {
    List<UserOutView> getMany();

    UserOutView updateOne(Long id, UserInView inView) throws UserErrorException;

    UserOutView deleteOne(Long id) throws UserErrorException;

    List<String> findAllFullNames();

    UserProfileOutView getUserProfile(String username) throws UserErrorException;
}
