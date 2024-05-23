import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatchService } from 'src/app/services/match/match.service';
import { MatchProccessComponent } from 'src/app/shared/components/match-proccess/match-proccess.component';
import { Match } from 'src/app/shared/interfaces/Match';

@Component({
  selector: 'app-all-matches',
  templateUrl: './all-matches.component.html',
  styleUrls: ['./all-matches.component.scss'],
})
export class AllMatchesComponent implements OnInit {
  matchesCount!: Number;
  mainForm : FormGroup = this.fb.group({
    matches : this.fb.array([])
  });

  get isAdmin(): boolean {
    let role = localStorage.getItem('role');
    if (role == 'ADMIN') {
      return true;
    }
    return false;
  }
  constructor(private matchService: MatchService, private fb: FormBuilder) {}

  async ngOnInit() {
    this.mainForm = this.fb.group({
      matches: this.fb.array([])
    });
    let data = await this.matchService.getAllMatches();
    data.subscribe(data => {
      this.populateForm(data)
    })
  }
  get matches(){
    return this.mainForm.get("matches") as FormArray;
  }

  populateForm(matches: Match[]) {
    matches.forEach((m : Match) => {
      let records = this.mainForm.get("matches") as FormArray;
      records.push(new MatchProccessComponent().writeValue(m))
    })
    
  }

  onSubmit() {
    console.log(this.mainForm.value);}
}
