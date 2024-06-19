package com.example.TLBet.service;

import com.example.TLBet.models.entities.Team;
import com.example.TLBet.models.service.TeamServiceModel;
import com.example.TLBet.models.view.TeamInsertUpdateOutView;
import com.example.TLBet.models.view.TeamView;

import java.util.List;
import java.util.Optional;

public interface TeamService {

   Optional<Team> getTeamById(long id);

   TeamServiceModel createTeam(TeamInsertUpdateOutView team);

   List<TeamServiceModel> getAllTeamsOrderByNameAsc();

   Team editTeam(TeamInsertUpdateOutView team);

   void deleteByTeamId(long id);

   List<TeamView> getAllTeamsByLeague(Long leagueId);
}
