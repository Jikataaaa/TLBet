package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.Team;
import com.example.TLBet.models.service.TeamServiceModel;
import com.example.TLBet.models.view.TeamInsertUpdateOutView;
import com.example.TLBet.models.view.TeamView;
import com.example.TLBet.repository.TeamRepository;
import com.example.TLBet.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
    private final TeamRepository repository;
    private final ModelMapper mapper;

    @Override
    public Optional<Team> getTeamById(long id) {
        return repository.findById(id);
    }

    @Override
    public TeamServiceModel createTeam(TeamInsertUpdateOutView team) {
        Team savedTeam = repository.save(mapper.map(team, Team.class));
        return mapper.map(savedTeam, TeamServiceModel.class);
    }

    @Override
    public List<TeamServiceModel> getAllTeamsOrderByNameAsc() {
        return repository.findAllByOrderByNameAsc().stream().map(team -> mapper.map(team, TeamServiceModel.class)).toList();
    }

    @Override
    public List<TeamView> getAllTeamsByLeague(Long leagueId) {
        return repository.findAllByLeague_IdOrderByIdDesc(leagueId).stream().map(team -> mapper.map(team, TeamView.class)).toList();
    }

    @Override
    public Team editTeam(TeamInsertUpdateOutView teamView) {
        Optional<Team> foundTeam = repository.findById(teamView.getId());
        Team team = foundTeam.orElseThrow();
        team.setName(teamView.getName());
        team.setImageUrl(teamView.getImageUrl());
        repository.save(team);
        return team;
    }

    @Override
    public void deleteByTeamId(long id) {
        this.repository.deleteById(id);
    }
}
