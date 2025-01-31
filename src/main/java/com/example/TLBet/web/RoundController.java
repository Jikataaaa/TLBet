package com.example.TLBet.web;

import com.example.TLBet.models.exeptions.NoContentException;
import com.example.TLBet.models.view.AddRoundView;
import com.example.TLBet.models.view.RoundOutView;
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
    public ResponseEntity<List<RoundView>> getAllByTournamentId(@RequestParam long tournamentId) {
        return ResponseEntity.ok(roundService.getAllByTournamentId(tournamentId));
    }

    @PostMapping("/add")
    public ResponseEntity<Long> createRound(@RequestBody AddRoundView roundView) throws NoContentException {
        return ResponseEntity.ok(roundService.createRound(roundView));
    }

    @PutMapping("/edit")
    public ResponseEntity<Long> editRound(@RequestBody AddRoundView roundView) {
        return ResponseEntity.ok(roundService.editRound(roundView));
    }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public void deleteRoundById(@RequestParam long id) {
        roundService.deleteRoundById(id);
    }

    @PostMapping("/setActive")
    public ResponseEntity<Long> setRoundActiveById(@RequestBody long id) {
        return ResponseEntity.ok(roundService.setRoundActiveById(id));
    }

    @GetMapping("/activeRound")
    public ResponseEntity<RoundOutView> getActiveRound() throws NoContentException {
        return ResponseEntity.ok(roundService.getActiveRound());
    }
}
