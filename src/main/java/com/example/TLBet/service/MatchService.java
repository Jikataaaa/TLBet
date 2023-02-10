package com.example.TLBet.service;

import com.example.TLBet.models.view.MatchResultView;
import com.example.TLBet.models.view.MatchView;

import java.util.List;

public interface MatchService {
    MatchView createMatch(MatchView view);

    List<MatchResultView> getAllMatches();

    MatchResultView getMatchById(long id);

    MatchResultView editMatch(MatchResultView match);
}
