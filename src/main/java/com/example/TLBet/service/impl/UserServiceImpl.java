package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.User;
import com.example.TLBet.models.enums.ExceptionEnum;
import com.example.TLBet.models.exeptions.UserErrorException;
import com.example.TLBet.models.view.UserInView;
import com.example.TLBet.models.view.UserOutView;
import com.example.TLBet.repository.UserRepository;
import com.example.TLBet.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<UserOutView> getMany() {
        return repository.findAll()
                .stream()
                .map(x -> mapper.map(x, UserOutView.class))
                .collect(Collectors.toList());
    }

    @Override
    public UserOutView updateOne(Long id, UserInView inView) throws UserErrorException {
        User user = repository.findById(id).orElse(null);

        if (user != null) {
            validateAndSetUserDetails(inView, user);
            repository.save(user);

            return mapper.map(user, UserOutView.class);
        }
        throw new UserErrorException(ExceptionEnum.EXCEPTION_USER_NOT_FOUND,
                new Throwable("User not found"));
    }

    private static void validateAndSetUserDetails(UserInView inView, User user) {
        if (inView.getFirstName() != null) {
            user.setFirstName(inView.getFirstName());
        }

        if (inView.getLastName() != null) {
            user.setLastName(inView.getLastName());
        }
    }

    @Override
    public UserOutView deleteOne(Long id) throws UserErrorException {
        User user = repository.findById(id).orElse(null);

        if (user != null) {
            repository.delete(user);
            return mapper.map(user, UserOutView.class);
        }
        throw new UserErrorException(ExceptionEnum.EXCEPTION_USER_NOT_FOUND,
                new Throwable("User not found"));
    }
}
