import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchModel } from '../models/match.model';
import { MatchService } from '../services/match.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  matchForm!: FormGroup;
  match: MatchModel | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private matchService: MatchService,
    private snackBar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.match = history.state.match;

    this.matchForm = this.fb.group({
      id: [this.match?.id || ''],
      homeGoals: [this.match?.homeGoals || 0, Validators.required],
      awayGoals: [this.match?.awayGoals || 0, Validators.required],
      homeTeamId: [this.match?.homeTeamId || '', Validators.required],
      awayTeamId: [this.match?.awayTeamId || '', Validators.required],
      startTime: [this.match?.startTime || '', Validators.required],
      roundId: [history.state.roundId || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.matchForm.valid) {
      const updatedMatch = this.matchForm.value as MatchModel;

      if (updatedMatch.id) {
        this.matchService.edit(updatedMatch).subscribe(() => {
          this.snackBar.openSuccess('Данните са актуализирани успешно!');
          this.router.navigate(['/admin/matches'], { state: { roundId: updatedMatch.roundId } });
        });
      } else {
        this.matchService.add(updatedMatch).subscribe(() => {
          this.snackBar.openSuccess('Успешно добавен запис!');
          this.router.navigate(['/admin/matches'], { state: { roundId: updatedMatch.roundId } });
        });
      }
    }
  }
}