package com.example.TLBet.web;

import com.example.TLBet.models.view.AddTournamentView;
import com.example.TLBet.models.view.TournamentView;
import com.example.TLBet.service.TournamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tournaments")
@RequiredArgsConstructor
public class TournamentController {

    private final TournamentService service;

    @PostMapping("/add")
    public ResponseEntity<Long> createTournament(@RequestBody AddTournamentView tournamentView) {
        Long tournament = service.addTournament(tournamentView);
        return ResponseEntity.ok(tournament);
    }

    @PutMapping("/edit")
    public ResponseEntity<Long> editTournament(@RequestBody TournamentView tournamentView) {
        Long tournament = service.editTournament(tournamentView);
        return ResponseEntity.ok(tournament);
    }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public void deleteTournament(@RequestParam Long id) {
        this.service.deleteTournamentById(id);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<TournamentView>> getAllTournament() {
        List<TournamentView> allTournaments = service.getAll();
        return ResponseEntity.ok(allTournaments);
    }
}
