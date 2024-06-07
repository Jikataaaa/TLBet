package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.Tournament;
import com.example.TLBet.models.view.AddTournamentView;
import com.example.TLBet.models.view.TournamentView;
import com.example.TLBet.repository.TournamentRepository;
import com.example.TLBet.service.TournamentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public List<TournamentView> getAll() {
        return (repository.findAll().stream()
                .map(t -> mapper.map(t, TournamentView.class))
                 .collect(Collectors.toList()));

    }

    @Override
    public long addTournament(AddTournamentView tournamentView) {
        return repository.save(mapper.map(tournamentView, Tournament.class)).getId();
    }

    @Override
    public long editTournament(TournamentView tournamentView) {
        return repository.save(mapper.map(tournamentView, Tournament.class)).getId();
    }

    @Override
    public void deleteTournamentById(long id) {
        repository.delete(this.getTournamentById(id));
    }
}
