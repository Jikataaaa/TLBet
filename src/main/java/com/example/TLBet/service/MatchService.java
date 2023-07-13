package com.example.TLBet.service;

import com.example.TLBet.models.entities.Match;
import com.example.TLBet.models.view.MatchBetView;
import com.example.TLBet.models.view.MatchResultView;
import com.example.TLBet.models.view.MatchView;

import java.time.LocalTime;
import java.util.List;

public interface MatchService {
    MatchView createMatch(MatchView view);

    List<MatchResultView> getAllMatches(Long id);

    Match getMatchById(long id);

    MatchResultView editMatch(MatchResultView match, LocalTime time);

    int getLastRound();
}
