package com.example.TLBet.web;

import com.example.TLBet.models.entities.Bet;
import com.example.TLBet.models.entities.Round;
import com.example.TLBet.models.exeptions.NoContentException;
import com.example.TLBet.models.view.MatchInView;
import com.example.TLBet.models.view.MatchResultView;
import com.example.TLBet.models.view.MatchView;
import com.example.TLBet.service.BetService;
import com.example.TLBet.service.MatchService;
import com.example.TLBet.service.RoundService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/match")
@RequiredArgsConstructor
public class MatchController extends BaseController {

    private final MatchService service;
    private final RoundService roundService;
    private final BetService betService;

    ///matches/getAll?round={roundId} //
//
///matches/add -> request: id(always null on add) , homeTeamGoals(always null on add) ,awayTeamGoals(always null on add), startTime, homeTeamId, awayTeamId, roundId; | response: id
///matches/delete ->request:i
    @PostMapping("/new-match")
    public ResponseEntity<MatchView> createMatch(@RequestBody MatchView match) {
        return ResponseEntity.ok(service.createMatch(match));
    }

    @GetMapping("/all-matches")
    public ResponseEntity<List<MatchResultView>> getAllMatches() throws NoContentException {
        String username = super.getCurrentUserUsername();
        Round round = roundService.getLastRound();
        List<Bet> createdBets = betService.findBetsByUserUsernameAndMatchRound(username, round);
        return ResponseEntity.ok(service.getLastRoundMatches(username, round, createdBets));
    }

    @PutMapping("/edit-match")
    public ResponseEntity<MatchResultView> editMatch(@RequestBody MatchResultView match, @RequestParam("time") LocalTime time) {
        return ResponseEntity.ok(service.editMatch(match, time));
    }

    @GetMapping("/all")
    public ResponseEntity<List<MatchResultView>> getAll(@RequestParam("roundId") Long roundId) {

        return ResponseEntity.ok(service.getAll(roundId));
    }

    @PostMapping("/add")
    public ResponseEntity<Long> add(@RequestBody MatchInView inView) {
        return ResponseEntity.ok(service.add(inView));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<MatchResultView> deleteOne(@RequestParam("id") Long id) {
        return ResponseEntity.ok(service.deleteOne(id));
    }

    @PostMapping("/edit")
    public ResponseEntity<MatchResultView> updateOne(@RequestBody MatchInView inView) {
        return ResponseEntity.ok(service.updateOne(inView));
    }
}
