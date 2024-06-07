package com.example.TLBet.service;

import com.example.TLBet.models.entities.Tournament;
import com.example.TLBet.models.view.AddTournamentView;
import com.example.TLBet.models.view.TournamentView;

import java.util.List;

public interface TournamentService {
   Tournament getTournamentById(long id);
   List<TournamentView> getAll();

   long addTournament(AddTournamentView tournamentView);
   long editTournament(TournamentView tournamentView);
   void deleteTournamentById(long id);

}
