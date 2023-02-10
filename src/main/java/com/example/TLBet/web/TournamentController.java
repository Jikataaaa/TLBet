package com.example.TLBet.web;

import com.example.TLBet.models.entities.Tournament;
import com.example.TLBet.models.view.TournamentView;
import com.example.TLBet.service.TournamentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tournament")
@RequiredArgsConstructor
public class TournamentController{

    private final TournamentService service;
    private final ModelMapper mapper;
    // tournament/new-tournament

    @PostMapping("/new-tournament")
    public ResponseEntity<TournamentView> createTournament(@RequestBody TournamentView tournamentView){
        TournamentView tournament = service.createTournament(tournamentView);
        return ResponseEntity.ok(tournament);
    }

    @GetMapping("/all-tournaments")
    public ResponseEntity<List<TournamentView>> getAllTournament(){
        List<TournamentView> allTournaments = service.getAllTournaments();
       return ResponseEntity.ok(allTournaments);
    }
}
