package com.example.TLBet.web;
import com.example.TLBet.models.service.TeamServiceModel;
import com.example.TLBet.models.view.TeamView;
import com.example.TLBet.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController {

    private final ModelMapper mapper;
    private final TeamService teamService;

    @PostMapping("/add")
    public ResponseEntity<TeamView> createTeam(@RequestBody TeamView teamView){

        TeamServiceModel team = teamService.createTeam(teamView);
        return ResponseEntity.ok(mapper.map(team, TeamView.class));
    }
}
