package com.example.TLBet.service;

import com.example.TLBet.models.entities.Round;
import com.example.TLBet.models.exeptions.NoContentException;
import com.example.TLBet.models.view.AddRoundView;
import com.example.TLBet.models.view.RoundOutView;
import com.example.TLBet.models.view.RoundView;

import java.util.List;

public interface RoundService {

    Round getLastRound();

    Round getById(long id);

    List<RoundView> getAllByTournamentId(long tournamentId);

    long createRound(AddRoundView roundView) throws NoContentException;

    long editRound(AddRoundView roundView);

    void deleteRoundById(long id);

    long setRoundActiveById(long id);

    RoundOutView getActiveRound() throws NoContentException;
}
