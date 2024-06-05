package com.example.TLBet.service;

import com.example.TLBet.models.entities.Bet;
import com.example.TLBet.models.entities.Match;
import com.example.TLBet.models.entities.Round;
import com.example.TLBet.models.view.MatchResultView;
import com.example.TLBet.models.view.MatchView;

import java.time.LocalTime;
import java.util.List;

public interface MatchService {
    MatchView createMatch(MatchView view);

    List<MatchResultView> getLastRoundMatches(String username, Round round, List<Bet> createdBets);

    Match getMatchById(long id);

    MatchResultView editMatch(MatchResultView match, LocalTime time);
}
