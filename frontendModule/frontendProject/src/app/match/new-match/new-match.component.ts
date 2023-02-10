import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { MatchService } from 'src/app/services/match/match.service';
import { TeamService } from 'src/app/services/team/team.service';
import { TournamentService } from 'src/app/services/tournament/tournament.service';
import { Team } from 'src/app/shared/interfaces/Team';
import { Tournament } from 'src/app/shared/interfaces/Tournament';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.scss'],
})
export class NewMatchComponent implements OnInit {
  newMatchForm = new FormGroup({
    team1 : new FormControl(''),
    team2 : new FormControl(''),
    tournament : new FormControl('')
  })
  

  tournaments: Tournament[] | undefined;
  filteredTournaments : Tournament[] | undefined;
  teams: Team[] | undefined;

  filteredTeams1: Team[] | undefined;
  
  filteredTeams2: Team[] | undefined;

  constructor(private teamService: TeamService, private tournamentService: TournamentService, private matchService : MatchService) {
  }
 async ngOnInit() {
  await this.populateTeamOptions();
  await this.populateTournaments();
  this.filteredTeams1 = this.teams;
  
 const controls = this.newMatchForm.controls;


  controls.team1.valueChanges.subscribe((newValue)=>{
    this.filteredTeams1 = this.teams;
    this.filteredTeams1 = this.teams!.filter(option => option.name.toLowerCase().includes(newValue?.toLowerCase() || ''))
    
    this.filteredTeams2 = this.teams!.filter(option => option.name.toLowerCase() != controls.team1.value);
    
    })


    this.filteredTeams2 = this.teams;
    controls.team2.valueChanges.subscribe((newValue)=>{
      this.filteredTeams2 = this.teams;
      this.filteredTeams2 = this.teams!.filter(option => option.name.toLowerCase().includes(newValue?.toLowerCase() || ''))
      
      this.filteredTeams1 = this.teams!.filter(option => option.name.toLowerCase() != controls.team2.value);
      })

      this.filteredTournaments = this.tournaments;
      controls.tournament.valueChanges.subscribe((newValue) => {
        this.filteredTournaments = this.tournaments;
        this.filteredTournaments = this.tournaments?.filter(t => t.name.toLowerCase().includes(newValue?.toLowerCase() || ''))
      })

  }



 async  populateTeamOptions() {
  const teams = this.teamService.getAllTeams();
  const data = await lastValueFrom(teams);
  this.teams = data;
  }
  async  populateTournaments() {
    
   const tournaments = this.tournamentService.getAllTournaments();
   const data = await lastValueFrom(tournaments);
   this.tournaments = data;
    }

    addNewMatch(){
      //validate the form

      
    const {team1, team2, tournament}  = this.newMatchForm.value;
    const teamId1 = this.getTeamId(team1!);
    const teamId2 = this.getTeamId(team2!);
    const tournamentId = this.tournaments?.find(t => t.name == tournament)!.id;

      this.matchService.createMatch(teamId1!, teamId2!, tournamentId!);
      this.newMatchForm.reset();
    }

    private getTeamId(teamName: string) : BigInt | undefined{
     return this.teams?.find(team => team.name == teamName)?.id;
    }


}
