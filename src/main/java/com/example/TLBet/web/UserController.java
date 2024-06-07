package com.example.TLBet.web;

import com.example.TLBet.models.exeptions.UserErrorException;
import com.example.TLBet.models.view.UserInView;
import com.example.TLBet.models.view.UserOutView;
import com.example.TLBet.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/all")
    public List<UserOutView> getMany() {
        log.info("started getMany()");
        List<UserOutView> users = userService.getMany();
        log.info("finished getMany()");
        return users;
    }

    @PutMapping("/edit/{id}")
    public UserOutView updateOne(@PathVariable("id") Long id,
                                 @RequestBody UserInView inView) throws UserErrorException {
        log.info("started updateOne()");
        UserOutView user = userService.updateOne(id, inView);
        log.info("finished updateOne()");
        return user;
    }

    @DeleteMapping("/delete/{id}")
    public UserOutView deleteOne(@PathVariable("id") Long id) throws UserErrorException {
        log.info("started deleteOne()");
        UserOutView user = userService.deleteOne(id);
        log.info("finished deleteOne()");
        return user;
    }
}
