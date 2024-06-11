package com.example.TLBet.web;

import com.example.TLBet.models.service.TeamServiceModel;
import com.example.TLBet.models.view.TeamInsertUpdateOutView;
import com.example.TLBet.models.view.TeamView;
import com.example.TLBet.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController {

    private final ModelMapper mapper;
    private final TeamService teamService;

    @PostMapping("/new-team")
    public ResponseEntity<TeamInsertUpdateOutView> createTeam(@RequestBody TeamInsertUpdateOutView teamView) {
        TeamServiceModel team = teamService.createTeam(teamView);
        return ResponseEntity.ok(mapper.map(team, TeamInsertUpdateOutView.class));
    }

    @GetMapping("/all-teams")
    public ResponseEntity<List<TeamView>> getAllTeams() {
        List<TeamView> result = teamService.getAllTeams().stream().map(team -> mapper.map(team, TeamView.class)).toList();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/all-teams-by-league")
    public ResponseEntity<List<TeamView>> getAllTeamsByLeague(@RequestParam("id") Long leagueId) {
        List<TeamView> result = teamService.getAllTeamsByLeague(leagueId);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/edit")
    public ResponseEntity<Long> editTeam(@RequestBody TeamInsertUpdateOutView teamView) {
        return ResponseEntity.ok(this.teamService.editTeam(teamView).getId());
    }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public void deleteTeam(@RequestParam Long id) {
        this.teamService.deleteByTeamId(id);
    }
}
