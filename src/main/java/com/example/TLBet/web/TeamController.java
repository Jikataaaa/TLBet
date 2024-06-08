package com.example.TLBet.web;
import com.example.TLBet.models.service.TeamServiceModel;
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
    public ResponseEntity<TeamView> createTeam(@RequestBody TeamView teamView){
        TeamServiceModel team = teamService.createTeam(teamView);
        return ResponseEntity.ok(mapper.map(team, TeamView.class));
    }

    @GetMapping("/all-teams")
    public ResponseEntity<List<TeamView>> getAllTeams(){
        List<TeamView> result = teamService.getAllTeams().stream().map(team -> mapper.map(team, TeamView.class)).toList();
        return ResponseEntity.ok(result);
    }

    @PutMapping("/edit")
    public ResponseEntity<Long> editTeam(@RequestBody TeamView teamView){
        return ResponseEntity.ok(this.teamService.editTeam(teamView).getId());
    }
    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public void deleteTeam(@RequestParam Long id){
        this.teamService.deleteByTeamId(id);
    }
}
