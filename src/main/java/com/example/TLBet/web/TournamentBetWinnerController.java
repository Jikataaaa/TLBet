package com.example.TLBet.web;

import com.example.TLBet.models.exeptions.UserErrorException;
import com.example.TLBet.models.view.TeamView;
import com.example.TLBet.models.view.TournamentBetWinnerInView;
import com.example.TLBet.models.view.TournamentBetWinnerOutView;
import com.example.TLBet.service.TournamentBetWinnerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/tournament-bet-winner")
@RequiredArgsConstructor
public class TournamentBetWinnerController extends BaseController {

    @Autowired
    private TournamentBetWinnerService service;

    @PostMapping()
    public ResponseEntity<TournamentBetWinnerOutView> createTournamentBetWinner(@RequestBody TournamentBetWinnerInView inView) throws UserErrorException {
        log.info("started createTournamentBetWinner()");

        String username = this.getCurrentUserUsername();
        TournamentBetWinnerOutView tournamentBetWinner = service.createTournamentBetWinner(inView, username);
        log.info("finished createTournamentBetWinner()");
        return ResponseEntity.ok(tournamentBetWinner);
    }

    @GetMapping()
    public ResponseEntity<TournamentBetWinnerOutView> getTournamentWinner() throws UserErrorException {
        log.info("started getTournamentWinner()");

        String username = this.getCurrentUserUsername();
        TournamentBetWinnerOutView tournamentBetWinner = service.getTournamentWinner(username);
        log.info("finished getTournamentWinner()");
        return ResponseEntity.ok(tournamentBetWinner);
    }

    @GetMapping("/all-teams")
    public ResponseEntity<List<TeamView>> getAllTeams() {
        log.info("started getAllTeams()");
        List<TeamView> result = service.getAllTeams();
        log.info("finished getAllTeams()");
        return ResponseEntity.ok(result);
    }
}
