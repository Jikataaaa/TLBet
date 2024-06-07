package com.example.TLBet.service;

import com.example.TLBet.models.view.LeagueView;

import java.util.List;

public interface LeagueService {
    List<LeagueView> getAll();

    long createLeague(LeagueView leagueView);
    long editLeague(LeagueView leagueView);

    void deleteLeagueById(long id);
}
