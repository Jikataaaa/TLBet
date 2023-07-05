package com.example.TLBet.web;

import com.example.TLBet.models.entities.Match;
import com.example.TLBet.models.view.MatchBetView;
import com.example.TLBet.models.view.MatchResultView;
import com.example.TLBet.models.view.MatchView;
import com.example.TLBet.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/match")
@RequiredArgsConstructor
public class MatchController {

    private final MatchService service;


    @PostMapping("/new-match")
    public ResponseEntity<MatchView> createMatch(@RequestBody MatchView match){
       return ResponseEntity.ok(service.createMatch(match));
    }
    @GetMapping("/all-matches")
    public ResponseEntity<List<MatchResultView>> getAllMatches(){
       return ResponseEntity.ok(service.getAllMatches());
    }
    @PutMapping("/edit-match")
    public ResponseEntity<MatchResultView> editMatch(@RequestBody MatchResultView match, @RequestParam("time") LocalTime time){
        return ResponseEntity.ok(service.editMatch(match, time));
    }
}
