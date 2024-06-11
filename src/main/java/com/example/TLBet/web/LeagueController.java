package com.example.TLBet.web;

import com.example.TLBet.models.view.LeagueView;
import com.example.TLBet.service.LeagueService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/leagues")
@AllArgsConstructor
public class LeagueController {

    private final LeagueService leagueService;


    @GetMapping("/getAll")
    public ResponseEntity<List<LeagueView>> getAll() {
        return ResponseEntity.ok(leagueService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<Long> createLeague(@RequestBody LeagueView leagueView) {
        return ResponseEntity.ok(leagueService.createLeague(leagueView));
    }

    @PutMapping("/edit")
    public ResponseEntity<Long> editLeague(@RequestBody LeagueView leagueView) {
        return ResponseEntity.ok(leagueService.editLeague(leagueView));
    }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public void editLeague(@RequestParam Long id) {
        leagueService.deleteLeagueById(id);
    }

}
