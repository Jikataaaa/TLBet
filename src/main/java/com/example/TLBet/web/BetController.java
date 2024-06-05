package com.example.TLBet.web;

import com.example.TLBet.models.view.BetView;
import com.example.TLBet.models.view.NewBetView;
import com.example.TLBet.service.BetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bet")
@RequiredArgsConstructor
public class BetController extends BaseController{

    private final BetService betService;

    @PostMapping("/new-bets")
    public ResponseEntity<List<NewBetView>> createBet(@RequestBody List<NewBetView> bets){
        return ResponseEntity.ok(betService.createBets(bets, super.getCurrentUserUsername()));
    }
    @GetMapping("all-user-bets")
    public ResponseEntity<List<BetView>> allBetsByUser(@RequestParam("id") long id){
        return ResponseEntity.ok(betService.getAllBetsByUser(id));
    }
    @GetMapping("/personal-bets")
    public ResponseEntity<List<BetView>> AllPersonalBets(@RequestParam("username") String username){
        return ResponseEntity.ok(betService.getAllBetsByUsername(username));
    }

}
