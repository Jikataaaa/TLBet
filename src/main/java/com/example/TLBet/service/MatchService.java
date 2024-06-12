package com.example.TLBet.service;

import com.example.TLBet.models.entities.Bet;
import com.example.TLBet.models.entities.Match;
import com.example.TLBet.models.entities.Round;
import com.example.TLBet.models.enums.MatchStatus;
import com.example.TLBet.models.exeptions.NoContentException;
import com.example.TLBet.models.exeptions.UserErrorException;
import com.example.TLBet.models.view.MatchInView;
import com.example.TLBet.models.view.MatchResultView;
import com.example.TLBet.models.view.MatchView;

import java.time.LocalTime;
import java.util.List;

public interface MatchService {
    MatchView createMatch(MatchView view) throws UserErrorException;

    List<MatchResultView> getLastRoundMatches(String username, Round round, List<Bet> createdBets) throws NoContentException;

    Match getMatchById(long id);

    MatchResultView editMatch(MatchResultView match, LocalTime time);

    MatchStatus calculateMatchStatus(Bet optionalBet, Match match);

    List<MatchResultView> getAll(Long roundId);

    Long add(MatchInView inView) throws UserErrorException;

    MatchResultView deleteOne(Long id) throws UserErrorException;

    MatchResultView updateOne(MatchInView inView) throws UserErrorException;
}
