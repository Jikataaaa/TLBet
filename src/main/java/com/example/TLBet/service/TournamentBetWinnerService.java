package com.example.TLBet.service;

import com.example.TLBet.models.entities.TournamentBetWinner;
import com.example.TLBet.models.exeptions.UserErrorException;
import com.example.TLBet.models.view.TeamView;
import com.example.TLBet.models.view.TournamentBetWinnerInView;
import com.example.TLBet.models.view.TournamentBetWinnerOutView;

import java.util.List;

public interface TournamentBetWinnerService {
    TournamentBetWinnerOutView createTournamentBetWinner(TournamentBetWinnerInView inView, String username) throws UserErrorException;

    TournamentBetWinnerOutView getTournamentWinner(String username) throws UserErrorException;

    List<TeamView> getAllTeams();

    List<TournamentBetWinner> findAllByTeamIdAndTournament_IsActiveIsTrue(Long winnerTeamId);
}
