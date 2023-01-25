package com.example.TLBet.service;

import com.example.TLBet.models.entities.Team;
import com.example.TLBet.models.service.TeamServiceModel;
import com.example.TLBet.models.view.TeamView;

public interface TeamService {

   TeamServiceModel createTeam(TeamView team);
}
