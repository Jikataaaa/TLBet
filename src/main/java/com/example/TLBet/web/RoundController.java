package com.example.TLBet.web;

import com.example.TLBet.models.view.AddRoundView;
import com.example.TLBet.models.view.RoundView;
import com.example.TLBet.service.RoundService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rounds")
@AllArgsConstructor
public class RoundController {
    private final RoundService roundService;

    @GetMapping("/getAll")
    public ResponseEntity<List<RoundView>> getAllByTournamentId(@RequestBody long tournamentId){
        return ResponseEntity.ok(roundService.getAllByTournamentId(tournamentId));
    }

    @PostMapping("/add")
    public ResponseEntity<Long> createRound(@RequestBody AddRoundView roundView){
        return ResponseEntity.ok(roundService.createRound(roundView));
    }

    @PutMapping("/edit")
    public ResponseEntity<Long> editRound(@RequestBody AddRoundView roundView){
        return ResponseEntity.ok(roundService.editRound(roundView));
    }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public void deleteRoundById(@RequestBody long id){
        roundService.deleteRoundById(id);
    }
    @PutMapping
    public ResponseEntity<Long> setRoundActiveById(@RequestBody long id){
        return ResponseEntity.ok(roundService.setRoundActiveById(id));
    }
}
