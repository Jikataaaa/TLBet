package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.Team;
import com.example.TLBet.models.service.TeamServiceModel;
import com.example.TLBet.models.view.TeamView;
import com.example.TLBet.repository.TeamRepository;
import com.example.TLBet.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
    private final TeamRepository repository;
    private final ModelMapper mapper;
    @Override
    public TeamServiceModel createTeam(TeamView team) {
        Team savedTeam = repository.save(mapper.map(team, Team.class));
        return mapper.map(savedTeam, TeamServiceModel.class);
    }
}
