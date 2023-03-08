package com.example.TLBet.web;

import com.example.TLBet.models.view.BetView;
import com.example.TLBet.models.view.NewBetView;
import com.example.TLBet.service.AuthenticationService;
import com.example.TLBet.service.BetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bet")
@RequiredArgsConstructor
public class BetController {

    private final BetService betService;

    @PostMapping("/new-bet")
    public ResponseEntity<NewBetView> createBet(@RequestBody NewBetView bet){
        return ResponseEntity.ok(betService.createBet(bet));
    }
    @GetMapping("all-user-bets")
    public ResponseEntity<List<BetView>> allBetsByUser(@RequestParam("id") long id){
        return ResponseEntity.ok(betService.getAllBetsByUser(id));
    }

}
