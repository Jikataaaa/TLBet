package com.example.TLBet.web;

import com.example.TLBet.models.exeptions.UserErrorException;
import com.example.TLBet.models.view.*;
import com.example.TLBet.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController extends BaseController {

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

    @GetMapping("/profile")
    public ResponseEntity<UserProfileOutView> getUserProfile() throws UserErrorException {
        String username = super.getCurrentUserUsername();
        return ResponseEntity.ok(userService.getUserProfile(username));
    }

    @GetMapping("/details")
    public ResponseEntity<UserProfileOutView> getUserDetails(@RequestParam("username") String username) throws UserErrorException {
        UserDetails user = this.getCurrentUser();
        return ResponseEntity.ok(userService.getUserDetails(username, user));
    }

    @GetMapping("/exact-result")
    public ResponseEntity<List<UserExactResultOutView>> getUsersWithMostExactResults() {
        log.info("started getUsersWithMostExactResults()");
        List<UserExactResultOutView> outView = userService.getUsersWithMostExactResults();
        log.info("finished getUsersWithMostExactResults()");
        return ResponseEntity.ok(outView);
    }

    @GetMapping("/correct-match-winner")
    public ResponseEntity<List<UserCorrectMatchWinnerOutView>> getUsersWithMostCorrectMatchWinner() {
        log.info("started getUsersWithMostCorrectMatchWinner()");
        List<UserCorrectMatchWinnerOutView> outView = userService.getUsersWithMostCorrectMatchWinner();
        log.info("finished getUsersWithMostCorrectMatchWinner()");
        return ResponseEntity.ok(outView);
    }

    @GetMapping("/team-pick-winner")
    public ResponseEntity<List<UserTeamPickPercentageOutView>> getTeamPickPercentage() {
        log.info("started getTeamPickPercentage()");
        List<UserTeamPickPercentageOutView> outView = userService.getTeamPickPercentage();
        log.info("finished getTeamPickPercentage()");
        return ResponseEntity.ok(outView);
    }
}
