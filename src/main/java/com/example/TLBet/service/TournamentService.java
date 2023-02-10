package com.example.TLBet.service;

import com.example.TLBet.models.entities.Tournament;
import com.example.TLBet.models.view.TournamentView;

import java.util.List;

public interface TournamentService {
   Tournament getTournamentById(long id);

   TournamentView createTournament(TournamentView tournamentView);
   List<TournamentView> getAllTournaments();
}
