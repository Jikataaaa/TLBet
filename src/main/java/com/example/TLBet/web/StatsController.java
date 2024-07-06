package com.example.TLBet.web;

import com.example.TLBet.models.view.MostViewedUserView;
import com.example.TLBet.models.view.UserCorrectMatchWinnerOutView;
import com.example.TLBet.models.view.UserExactResultOutView;
import com.example.TLBet.models.view.UserTeamPickPercentageOutView;
import com.example.TLBet.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/stats")
public class StatsController extends BaseController {
    @Autowired
    private UserService userService;

    @GetMapping("/exact-result")
    public ResponseEntity<List<UserExactResultOutView>> getUsersWithMostExactResults() {
        List<UserExactResultOutView> outView = userService.getUsersWithMostExactResults();
        return ResponseEntity.ok(outView);
    }

    @GetMapping("/correct-match-winner")
    public ResponseEntity<List<UserCorrectMatchWinnerOutView>> getUsersWithMostCorrectMatchWinner() {
        List<UserCorrectMatchWinnerOutView> outView = userService.getUsersWithMostCorrectMatchWinner();
        return ResponseEntity.ok(outView);
    }

    @GetMapping("/team-pick-winner")
    public ResponseEntity<List<UserTeamPickPercentageOutView>> getTeamPickPercentage() {
        List<UserTeamPickPercentageOutView> outView = userService.getTeamPickPercentage();
        return ResponseEntity.ok(outView);
    }

    @GetMapping("/most-viewed-users")
    public ResponseEntity<List<MostViewedUserView>> getMostViewedUsers() {
        List<MostViewedUserView> outView = userService.getMostViewedUsers();
        return ResponseEntity.ok(outView);
    }
}