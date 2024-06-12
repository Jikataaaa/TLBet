import { Component, Input, OnInit } from '@angular/core';
import { BetMatchModel } from '../../models/bet-match.model';

@Component({
    selector: 'match-tooltip',
    templateUrl: './match-tooltip.component.html',
    styleUrls: ['./match-tooltip.component.scss']
})
export class MatchTooltipComponent implements OnInit {
    @Input()
    public match!: any;

    constructor() { }

    ngOnInit() {
    }
}
