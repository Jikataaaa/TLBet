package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.Tournament;
import com.example.TLBet.models.view.TournamentView;
import com.example.TLBet.repository.TournamentRepository;
import com.example.TLBet.service.TournamentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TournamentServiceImpl implements TournamentService {
    private final TournamentRepository repository;
    private final ModelMapper mapper;


    @Override
    public Tournament getTournamentById(long id) {
        return repository.findById(id).get();
    }

    @Override
    public TournamentView createTournament(TournamentView tournamentView) {
        Tournament saved = repository.save(mapper.map(tournamentView, Tournament.class));
        return mapper.map(saved, TournamentView.class);
    }

    @Override
    public List<TournamentView> getAllTournaments() {
        List<Tournament> tournaments = repository.findAll();
        return tournaments.stream().map(tournament -> mapper.map(tournament, TournamentView.class)).toList();
    }

    @Override
    public Tournament getTournamentByName(String name) {
        return repository.findTournamentByName(name).get();
    }

    @Override
    public Tournament editTournament(TournamentView tournamentView) {
        Optional<Tournament> optionalTournament = repository.findById(tournamentView.getId());
        Tournament tournament = optionalTournament.orElseThrow();
        tournament.setName(tournamentView.getName());
        repository.save(tournament);
        return tournament;
    }
}
