import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RoundModel } from 'src/app/components/round/models/round.model';

@Component({
    selector: 'ranking-rounds-menu',
    templateUrl: './ranking-rounds-menu.component.html',
    styleUrls: ['./ranking-rounds-menu.component.scss']
})
export class RankingRoundsMenuComponent implements OnInit {
    @Input()
    rounds: RoundModel[] = [];

    @Output()
    roundSelected:EventEmitter<RoundModel> = new EventEmitter<RoundModel>();

    constructor(private router: Router) { }

    ngOnInit() {
    }

    roundRankingNavigate(round: RoundModel): void {
        this.roundSelected.emit(round);
    }
}
