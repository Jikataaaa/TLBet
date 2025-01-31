package com.example.TLBet.service;

import com.example.TLBet.models.entities.Bet;
import com.example.TLBet.models.entities.Match;
import com.example.TLBet.models.entities.Round;
import com.example.TLBet.models.exeptions.UserErrorException;
import com.example.TLBet.models.view.BetView;
import com.example.TLBet.models.view.MatchResultView;
import com.example.TLBet.models.view.NewBetView;

import java.util.List;

public interface BetService {

    List<BetView> getAllBetsByUser(long id);

    List<MatchResultView> createBets(List<NewBetView> bets, String username) throws UserErrorException;

    boolean checkExistingBetOnMatch(Match match, String username);

    List<Bet> findBetsByUserUsernameAndMatchRound(String username, Round round);

    List<MatchResultView> getAllUserPlayedMatches(String username);

    List<Bet> getBetsByRoundIdLower(Long roundId);

    List<MatchResultView> getAllBetsByUsername(String username);

    List<MatchResultView> getAllEndedBetsByUsername(String username);

    List<Bet> getBetsByRoundId(Long roundId);
}
