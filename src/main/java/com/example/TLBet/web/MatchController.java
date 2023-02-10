package com.example.TLBet.web;

import com.example.TLBet.models.entities.Match;
import com.example.TLBet.models.view.MatchResultView;
import com.example.TLBet.models.view.MatchView;
import com.example.TLBet.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PutMapping
    public ResponseEntity<MatchResultView> editMatch(@RequestBody MatchResultView match){
        return ResponseEntity.ok(service.editMatch(match));
    }
//    @GetMapping("/get-match")
//    public ResponseEntity<MatchResultView> getMatchById(@RequestParam("id") long id){
//        return ResponseEntity.ok(service.getMatchById(id));
//    }



}
