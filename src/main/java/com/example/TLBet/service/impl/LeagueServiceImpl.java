package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.League;
import com.example.TLBet.models.view.LeagueView;
import com.example.TLBet.repository.LeagueRepository;
import com.example.TLBet.repository.RoundRepository;
import com.example.TLBet.service.LeagueService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeagueServiceImpl implements LeagueService {

    private final LeagueRepository repository;
    private final ModelMapper mapper;

    @Override
    public List<LeagueView> getAll() {
        return repository.findAll()
                .stream()
                .map(x -> mapper.map(x, LeagueView.class))
                .collect(Collectors.toList());
    }

    @Override
    public long createLeague(LeagueView leagueView) {
        return repository.save(mapper.map(leagueView, League.class)).getId();
    }

    @Override
    public long editLeague(LeagueView leagueView) {
        return repository.save(mapper.map(leagueView, League.class)).getId();
    }

    @Override
    public void deleteLeagueById(long id) {
        repository.deleteById(id);
    }
}
